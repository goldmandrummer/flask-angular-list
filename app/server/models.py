from __init__ import app, db
from sqlalchemy.dialects.postgresql import JSON


# class Object(db.Model):
#     __tablename__ = 'objects'
#
#     id = db.Column(db.Integer, primary_key=True)
#     text = db.Column(db.String())
#
#     def __init__(self, text):
#         self.text = text
#
#     def __repr__(self):
#         return '<text {}>'.format(self.text)
