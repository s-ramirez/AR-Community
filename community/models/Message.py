from datetime import datetime
from community.core import db

class Message(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	content = db.Column(db.String(140))
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
	post_date = db.Column(db.DateTime)
	group_id = db.Column(db.Integer, db.ForeignKey('group.id'))

	def __init__(self, content, user_id, post_date=None):
		self.content = content
		self.user_id = user_id
		if post_date is None:
			post_date = datetime.utcnow()
		self.post_date = post_date
