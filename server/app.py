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

if __name__ == '__main__':
    app.run(port=555)

