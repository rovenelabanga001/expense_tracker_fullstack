from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from sqlalchemy import inspect

#import models
from models import db, User, Transaction, Tag, Budget, UserBudget

app = Flask(__name__)
#db config
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)

@app.route("/", methods=['GET'])
def index():
    return """<h1>This is the transactions API</h1>"""

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

if __name__ == '__main__':
    app.run(port=555)

