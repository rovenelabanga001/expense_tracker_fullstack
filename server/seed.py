from app import app, db
from models import User, Transaction, Tag, Budget, UserBudget
from datetime import datetime

# Use the application context
with app.app_context():
    # Drop all tables and recreate them
    db.drop_all()
    db.create_all()

    # Sample Users
    users = [
        User(username="JohnDoe1234", password="Password123!"),
        User(username="JaneSmith5678", password="SecurePass!2024"),
        User(username="MikeBrown9012", password="Mike@Brown2025"),
        User(username="SarahConnor88", password="Terminator#2024"),
    ]

    # Sample Tags
    tags = [
        Tag(name="Food"),
        Tag(name="Entertainment"),
        Tag(name="Transport"),
        Tag(name="Utilities"),
    ]

    # Sample Budgets
    budgets = [
        Budget(name="January Budget", amount=5000, start_date=datetime(2025, 1, 1), end_date=datetime(2025, 1, 31)),
        Budget(name="February Budget", amount=4000, start_date=datetime(2025, 2, 1), end_date=datetime(2025, 2, 28)),
        Budget(name="March Budget", amount=4500, start_date=datetime(2025, 3, 1), end_date=datetime(2025, 3, 31)),
        Budget(name="April Budget", amount=4800, start_date=datetime(2025, 4, 1), end_date=datetime(2025, 4, 30)),
    ]

    # Sample Transactions
    transactions = [
        Transaction(
            transaction_type="Expense",
            category="Food",
            date=datetime(2025, 1, 15),
            description="Grocery shopping",
            amount=500,
            user_id=1,
            tag_id=1,
        ),
        Transaction(
            transaction_type="Income",
            category="Salary",
            date=datetime(2025, 1, 31),
            description="Monthly Salary",
            amount=3000,
            user_id=1,
            tag_id=3,
        ),
        Transaction(
            transaction_type="Expense",
            category="Transport",
            date=datetime(2025, 2, 5),
            description="Gas refill",
            amount=200,
            user_id=2,
            tag_id=3,
        ),
        Transaction(
            transaction_type="Expense",
            category="Utilities",
            date=datetime(2025, 3, 10),
            description="Electricity bill",
            amount=800,
            user_id=3,
            tag_id=4,
        ),
    ]

    # Sample UserBudgets
    user_budgets = [
        UserBudget(contribution_amount=2500, user_id=1, budget_id=1),
        UserBudget(contribution_amount=1500, user_id=2, budget_id=2),
        UserBudget(contribution_amount=2000, user_id=3, budget_id=3),
        UserBudget(contribution_amount=1800, user_id=4, budget_id=4),
    ]

    # Add data to the session
    db.session.add_all(users)
    db.session.add_all(tags)
    db.session.add_all(budgets)
    db.session.add_all(transactions)
    db.session.add_all(user_budgets)

    # Commit the session
    db.session.commit()

    print("Database seeded successfully!")
