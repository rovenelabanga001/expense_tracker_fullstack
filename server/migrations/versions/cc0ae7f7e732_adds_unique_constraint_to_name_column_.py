from alembic import op
import sqlalchemy as sa
from sqlalchemy import engine


# revision identifiers, used by Alembic.
revision = 'cc0ae7f7e732'
down_revision = '26072378e73c'
branch_labels = None
depends_on = None


def upgrade():
    # Use batch_alter_table for SQLite to handle the unique constraint addition
    bind = op.get_bind()
    if isinstance(bind, engine.base.Connection):
        # batch_alter_table allows making changes that are not natively supported by SQLite
        with op.batch_alter_table('tags') as batch_op:
            batch_op.create_unique_constraint('uq_tags_name', ['name'])


def downgrade():
    # Revert the unique constraint in downgrade
    bind = op.get_bind()
    if isinstance(bind, engine.base.Connection):
        with op.batch_alter_table('tags') as batch_op:
            batch_op.drop_constraint('uq_tags_name', type_='unique')
