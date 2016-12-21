from __init__ import app, db
from sqlalchemy.dialects.postgresql import JSON


class Person(db.Model):
    __tablename__ = 'people'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())

    def __init__(self, name):
        self.name = name

    # def __repr__(self):
    #     return '<id {}>'.format(self.id)
