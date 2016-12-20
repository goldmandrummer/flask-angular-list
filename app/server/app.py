from __init__ import os, app, db
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

from models import Person


@app.route('/', methods=['GET', 'POST'])
def index():
    data = Person.query.order_by(Person.name).all()
    return render_template('index.html', people=data)


@app.route('/add', methods=['POST'])
def addPerson():
    # TODO: ADD name TO people TABLE (Person class)
    name = None
    if request.method == 'POST':
        name = request.form['name']
        # Check that name does not already exist (not a great query, but works)
        # if not db.session.query(Person).filter(Person.name == name).count():
        new = Person(name)
        db.session.add(new)
        db.session.commit()
    return index()


if __name__ == '__main__':
    app.run()
