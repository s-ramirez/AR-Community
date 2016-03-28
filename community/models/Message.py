from datetime import datetime
from community.core import db

class Message(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	content = db.Column(db.String(140))
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
	post_date = db.Column(db.DateTime)
	group_id = db.Column(db.Integer, db.ForeignKey('group.id'))
	rec_user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

	def __init__(self, content, user_id, post_date=None, group_id = None, rec_user_id = None):
		self.content = content
		self.user_id = user_id
		self.group_id = group_id
		self.rec_user_id = rec_user_id
		self.post_date = post_date
		if post_date is None:
			post_date = datetime.utcnow()
