from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from sqlalchemy import inspect
from datetime import datetime

#import models
from models import db, User, Transaction, Tag, Budget, UserBudget

app = Flask(__name__)
#db config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)

@app.route("/", methods=['GET'])
def index():
    return """<h1>This is the transactions API</h1>"""
#user endpoints
@app.route("/users", methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        users = []
        for user in User.query.all():
            user_dict = user.to_dict()
            users.append(user_dict)

        response = make_response(
            users,
            200
        )
        return response

    elif request.method == 'POST':
        data = request.get_json()

        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            abort(400, description="Missing required fields: username and password")

        user = User(username=username, password=password)
        db.session.add(user)
        db.session.commit()

        user_dict = user.to_dict()
        response = make_response(
            user_dict,
            201
        )

        return response

    else:
        return make_response(
            {"error": f'Method {request.method} not allowed for this route'},
            405
        )


@app.route('/users/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def user_by_id(id):
    user = User.query.filter(User.id == id).first()

    if user is None:
        response_body = {
            "error": "User not found"
        }

        response = make_response(
            response_body,
            404
        )

        return response

    else:
        if request.method == 'GET':
            user_dict = user.to_dict()
            response = make_response(user_dict, 200)
            return response

        elif request.method == 'PATCH':
            data = request.get_json()

            username = data.get('username')
            password = data.get('password')

            if username:
                user.username = username
            if password:
                user.password = password

            db.session.commit()

            user_dict = user.to_dict()
            response = make_response(user_dict,200)
            return response

        elif request.method == 'DELETE':
            db.session.delete(user)
            db.session.commit()

            response_body = {
                "message": "User deleted successfully"
            }
            
            response = make_response(
                response_body, 200
            )

            return response

#transaction endpoints
@app.route("/transactions", methods=['GET', 'POST'])
def transactions():
    if request.method == 'GET':
        transactions = []

        for transaction in Transaction.query.all():
            transaction_dict = transaction.to_dict()
            transactions.append(transaction_dict)

        response = make_response(
            transactions,
            200
        )

        return response

    elif request.method == 'POST':
        data = request.get_json()

        data['date'] = datetime.strptime(data['date'], "%Y-%m-%d").date()

        new_transaction = Transaction(
            transaction_type = data['transaction_type'],
            category = data['category'],
            date = data['date'],
            description = data['description'],
            amount = data['amount']
        )

        db.session.add(new_transaction)
        db.session.commit()

        return make_response(
            new_transaction.to_dict(),
            201
        )

    else:
        return make_response(
            {"error": f'Method {request.method} not allowed for this route'},
            405
        )

@app.route('/transactions/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def transaction_by_id(id):
    transaction = Transaction.query.filter(Transaction.id == id).first()

    if transaction is None:
        return make_response(
            {"error": "Transaction not found"},
            404,
        )

    else:
        if request.method == 'GET':
            return make_response(
                transaction.to_dict(),
                200
            )
        elif request.method == 'PATCH':
            data = request.get_json()

            if 'date' in data:
                try:
                    data['date'] = datetime.strptime(data['date'], "%Y-%m-%d").date()
                except ValueError:
                    return jsonify({"error": "Invalid date format, Use YYYY-MM-DD"}), 400
                
            for key, value in data.items():
                setattr(transaction, key, value)

            db.session.commit()
            return make_response(transaction.to_dict(), 200)

        elif request.method == 'DELETE':
            db.session.delete(transaction)
            db.session.commit()

            return make_response(
                {"message": "Transaction deleted"},
                200
            )
    
if __name__ == '__main__':
    app.run(port=555)

