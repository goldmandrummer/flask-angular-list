# flask-angular-list
Simple list app with Flask (Python) and AngularJS Material

## Technology Stack
* Flask (Python) REST API
* AngularJS front-end
* Bootstrap
* PostgreSQL database

## Setup Instructions

### Get the Code
Clone or download this repo

```sh
$ git clone https://github.com/goldmandrummer/flask-angular-list.git
```

### Python3 and Pip Setup
If you don't already have it, get Python3 (currently v3.5.2) installed -- https://www.python.org/downloads/

Pip (package installer) should come with your Python install, but it's a good idea to [upgrade pip](https://pip.pypa.io/en/stable/installing/#upgrading-pip)

### Virtual Environment
Install **Virtualenv** -- http://www.virtualenv.org/en/latest/

```sh
$ [sudo] pip install virtualenv
```

Then run the following commands **from the root of this project** ("flask-angular-list/")

```sh
$ pyvenv-3.5 env
$ source env/bin/activate
$ pip install -r requirements.txt
```

### PostgreSQL Setup
* Install PostgreSQL -- https://www.postgresql.org/download/

Start PostgreSQL

```sh
$ postgres -D /usr/local/var/postgres
```

In a new Terminal tab/window, create the database for this app.

```sh
$ psql
# create database flaskangularlist;
CREATE DATABASE
# \q
```

If you choose to name the database something else, you will need to change the path in ```flask-angular-list/.env```

### Set up Migrations

```sh
$ cd server/
$ python manage.py db init
$ python manage.py db migrate
$ python manage.py db upgrade
```

This should have added the table called "people" to your database. Use the following commands to check that it's there.

```sh
$ psql
# \c flaskangularlist;
# \d
```

### Run

Run the app from the ```flask-angular-list/server/``` directory.

```sh
$ python3 app.py
```
