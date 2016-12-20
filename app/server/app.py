from __init__ import os, app, db
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

from models import Person


@app.route('/', methods=['GET', 'POST'])
def getPeople():
    data = Person.query.order_by(Person.name).all()
    return render_template('index.html', people=data)


@app.route('/add', methods=['POST'])
def addPerson():
    name = None
    if request.method == 'POST':
        name = request.form['name']
        new = Person(name)
        db.session.add(new)
        db.session.commit()
    return getPeople()


if __name__ == '__main__':
    app.run()
