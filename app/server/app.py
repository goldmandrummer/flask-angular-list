from __init__ import os, app, db
from flask import Flask, render_template, request
# from flask_sqlalchemy import SQLAlchemy

# from models import ???


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
