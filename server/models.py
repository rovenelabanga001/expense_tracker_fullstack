from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime
from sqlalchemy import inspect
from sqlalchemy.orm import validates

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)

    transactions = db.relationship('Transaction', back_populates='user', cascade="all, delete-orphan", passive_deletes=True)
    userbudgets = db.relationship('UserBudget', back_populates='user',cascade="all, delete-orphan", passive_deletes=True)

    budgets = association_proxy('userbudgets', 'budget')
    serialize_rules = ("-transactions.user", "-userbudgets.user")

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
           'password': self.password
        }

    @validates('username')
    def validates_username(self, key, value):
        if len(value) < 10 or len(value) > 30:
            raise ValueError("Username must be between 10 and 30 characters")
        if not value.isalnum():
            raise ValueError("Username can only contain letters, numbers and underscores")
        return value

    @validates('password')
    def validate_password(self, key, password):
        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters long.")
        if not any(char.islower() for char in password):
            raise ValueError("Password must contain at least one lowercase letter.")
        if not any(char.isupper() for char in password):
            raise ValueError("Password must contain at least one uppercase letter.")
        if not any(char.isdigit() for char in password):
            raise ValueError("Password must contain at least one digit.")
        if not any(char in "!@#$%^&*()-_+=<>?/|{}~" for char in password):
            raise ValueError("Password must contain at least one special character.")
        return password

    def __repr__(self):
        return f'<User: {self.id}, {self.username}>'


class Transaction(db.Model, SerializerMixin):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    transaction_type = db.Column(db.String, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    date = db.Column(db.Date, nullable=False)
    description = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Integer, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'))

    user = db.relationship('User', uselist=False, back_populates='transactions')
    tag = db.relationship('Tag', uselist=False, back_populates='transactions', passive_deletes=True)
    
    serialize_rules = ("-user.transactions", "-tag.transactions")
    @validates('transaction_type')
    def validates_transaction_type(self, key, value):
        if value not in ["Income", "Expense"]:
            raise ValueError(f"Invalid transaction type: {value} must be 'Income' or 'Expense'")
        return value

    def __repr__(self):
        return f'<Transaction: {self.id}, type:{self.transaction_type}, category: {self.category}, date: {self.date}, amount: {self.amount}, description: {self.description}>'

class Tag(db.Model, SerializerMixin):
    __tablename__ = 'tags'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False, unique=True)

    transactions = db.relationship('Transaction', back_populates='tag', cascade="all, delete-orphan", passive_deletes=True)
    #passive deletes ensures ensures that when you delete a User or Tag, it will not throw errors due to the foreign key constraint

    serialize_rules = ("-transactions.tag",)
    def __repr__(self):
        return f'<Tag: {self.id}, {self.name}>'

class Budget(db.Model, SerializerMixin):
    __tablename__ = 'budgets'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)

    userbudgets = db.relationship('UserBudget', back_populates='budget', cascade ="all, delete-orphan", passive_deletes=True)

    users = association_proxy('userbudgets', 'user')
    serialize_rules = ("-userbudgets.budget",)
    def __repr__(self):
        return f'<Budget: {self.id}, name: {self.name}, amount: {self.amount}, start_date: {self.start_date}, end_date: {self.end_date}>'

class UserBudget(db.Model, SerializerMixin):
    __tablename__ = 'userbudgets'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    contribution_amount = db.Column(db.Integer, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))
    budget_id = db.Column(db.Integer, db.ForeignKey('budgets.id', ondelete='CASCADE'))

    user = db.relationship('User', back_populates='userbudgets')
    budget = db.relationship('Budget', back_populates='userbudgets')

    serialize_rules = ("-user.userbudgets", "-budget.userbudgets")

    def __repr__(self):
        return f'<UserBudget: {self.id}, amount: {self.contribution_amount}>'
