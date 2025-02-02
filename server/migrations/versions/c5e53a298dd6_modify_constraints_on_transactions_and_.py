"""Modify constraints on transactions and userbudgets table

Revision ID: c5e53a298dd6
Revises: cc0ae7f7e732
Create Date: 2025-02-02 22:36:29.912036

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c5e53a298dd6'
down_revision = 'cc0ae7f7e732'
branch_labels = None
depends_on = None


def upgrade():
    # Enable batch mode for userbudgets table
    with op.batch_alter_table('userbudgets', recreate='always') as batch_op:
        batch_op.alter_column('user_id', existing_type=sa.INTEGER(), nullable=False)
        batch_op.alter_column('budget_id', existing_type=sa.INTEGER(), nullable=False)
        batch_op.drop_constraint('fk_userbudgets_user_id_users', type_='foreignkey')
        batch_op.drop_constraint('fk_userbudgets_budget_id_budgets', type_='foreignkey')
        batch_op.create_foreign_key('fk_userbudgets_user_id_users', 'users', ['user_id'], ['id'], ondelete='CASCADE')
        batch_op.create_foreign_key('fk_userbudgets_budget_id_budgets', 'budgets', ['budget_id'], ['id'], ondelete='CASCADE')

    # Enable batch mode for transactions table
    with op.batch_alter_table('transactions', recreate='always') as batch_op:
        batch_op.alter_column('user_id', existing_type=sa.INTEGER(), nullable=False)
        batch_op.alter_column('tag_id', existing_type=sa.INTEGER(), nullable=False)


def downgrade():
    # Reverse changes for userbudgets table
    with op.batch_alter_table('userbudgets', recreate='always') as batch_op:
        batch_op.drop_constraint('fk_userbudgets_user_id_users', type_='foreignkey')
        batch_op.drop_constraint('fk_userbudgets_budget_id_budgets', type_='foreignkey')
        batch_op.alter_column('user_id', existing_type=sa.INTEGER(), nullable=True)
        batch_op.alter_column('budget_id', existing_type=sa.INTEGER(), nullable=True)
        batch_op.create_foreign_key('fk_userbudgets_user_id_users', 'users', ['user_id'], ['id'])
        batch_op.create_foreign_key('fk_userbudgets_budget_id_budgets', 'budgets', ['budget_id'], ['id'])

    # Reverse changes for transactions table
    with op.batch_alter_table('transactions', recreate='always') as batch_op:
        batch_op.alter_column('user_id', existing_type=sa.INTEGER(), nullable=True)
        batch_op.alter_column('tag_id', existing_type=sa.INTEGER(), nullable=True)
