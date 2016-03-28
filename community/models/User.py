from community.core import db
from community.models.Group import Group
groups = db.Table('group_user', db.Column('group', db.Integer, db.ForeignKey('group.id')), db.Column('user', db.Integer, db.ForeignKey('user.id')))
friends = db.Table('user_friend', db.Column('user', db.Integer, db.ForeignKey('user.id')), db.Column('user', db.Integer, db.ForeignKey('user.id')))

class User(db.Model):
	id = db.Column(db.Integer, primary_key = True)
	username = db.Column(db.String(32), unique = True)
	name = db.Column(db.String(32))
	image_url = db.Column(db.String(60))
	groups = db.relationship(Group, secondary=groups, backref=db.backref('group_user', lazy='dynamic'))
	friends = db.relationship('User', secondary=friends, backref=db.backref('user_friend', lazy='dynamic'))

	def __init__(self, username, name, image_url):
		self.username = username
		self.name = name
		self.image_url = image_url

	def __repr__(self):
		return '<User %r>' % self.username
