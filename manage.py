"""
Docker Compose UI, flask based application
"""

from flask.ext.script import Manager
from flask.ext.migrate import Migrate, MigrateCommand
from scripts import app, db
from scripts.models import User

migrate = Migrate(app, db)
manager = Manager(app)

# migrations
manager.add_command('db', MigrateCommand)


@manager.command
def create_db():
    """Creates the db tables."""
    db.create_all()


@manager.command
def drop_db():
    """Drops the db tables."""
    db.drop_all()


@manager.command
def create_admin():
    """Creates the admin user."""
    db.session.add(User(email='ad@min.com', password='admin', admin=True))
    db.session.commit()


@manager.command
def create_data():
    """Creates sample data."""
    pass


# run app
if __name__ == "__main__":
    manager.run()
