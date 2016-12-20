import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(
    __name__,
    template_folder='../client/templates',
    static_folder='../client/static'
)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
