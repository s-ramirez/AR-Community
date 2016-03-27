from community.core import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(32), unique = True)
    name = db.Column(db.String(32))
    groups = db.relationship('Group', backref='users', lazy='dynamic')

    def __init__(self, username, name):
        self.username = username
        self.name = name

    def __repr__(self):
        return '<User %r>' % self.username
