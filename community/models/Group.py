from datetime import datetime
from angular_flask.core import db

class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(140))
    created_date = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'))


    def __init__(self, name, user_id, created_date=None):
        self.name = name
        self.user_id = user_id
        if created_date is None:
            created_date = datetime.utcnow()
        self.created_date = created_date
