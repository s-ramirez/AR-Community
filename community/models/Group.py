from datetime import datetime
from community.core import db

class Group(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(140))
	created_date = db.Column(db.DateTime)
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
	messages = db.relationship('Message', lazy='dynamic')
	#users = db.relationship('User', backref='groups', lazy='dynamic')

	def __init__(self, name, user_id, created_date=None):
		self.name = name
		self.user_id = user_id
		if created_date is None:
			created_date = datetime.utcnow()
		self.created_date = created_date

	def __repr__(self):
		return '<Group %r>' % self.name
