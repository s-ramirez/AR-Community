from community import app
from Group import Group
from Message import Message
from User import User

# models for which we want to create API endpoints
app.config['API_MODELS'] = { 'Group': Group, 'Message': Message, 'User': User }

# models for which we want to create CRUD-style URL endpoints,
# and pass the routing onto our AngularJS application
app.config['CRUD_URL_MODELS'] = { 'Group': Group, 'Message': Message, 'User': User }
