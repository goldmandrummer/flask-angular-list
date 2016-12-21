import sys
from __init__ import os, app, db
from flask import Flask, render_template, redirect, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from pprint import pprint
import json

from models import Person


@app.route('/', methods=['GET', 'POST'])
def index():
    # data = Person.query.order_by(Person.name).all()
    return render_template('index.html')


@app.route('/get', methods=['GET'])
def getPeople():
    data = Person.query.all()
    data = [{'id': d.id, 'name': d.name} for d in data]
    print(data, file=sys.stderr)
    return jsonify(data)


@app.route('/add', methods=['POST'])
def addPerson():
    name = None
    if request.method == 'POST':
        name = request.form['name']
        new = Person(str(name))
        db.session.add(new)
        db.session.commit()
    return redirect('/')


# @app.route('/save', methods=['POST'])
# def addPerson():
#     name = None
#     if request.method == 'POST':
#         name = request.form['name']
#         new = Person(str(name))
#         db.session.add(new)
#         db.session.commit()
#     return redirect('/')


@app.route('/edit-view/<person_id>', methods=['GET'])
def editView(person_id):
    return render_template('edit-view.html', person_id=person_id)


@app.route('/edit/<person_id>', methods=['PUT', 'POST'])
def updatePerson(person_id):
    name = json.loads(request.data.decode())['new_name']
    target = Person.query.get(int(person_id))
    target.name = str(name)
    db.session.commit()
    return redirect('/')


@app.route('/delete/<person_id>', methods=['DELETE', 'POST'])
def deletePerson(person_id):
    target = Person.query.get(int(person_id))
    db.session.delete(target)
    db.session.commit()
    return redirect('/')


if __name__ == '__main__':
    app.run()
