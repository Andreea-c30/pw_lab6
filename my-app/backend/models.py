# models.py

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Vacation(db.Model):
    __tablename__ = 'vacation_table'
    id = db.Column(db.Integer, primary_key=True)
    departure_date = db.Column(db.String(10), nullable=False)
    departure_time = db.Column(db.String(8), nullable=False)
    return_date = db.Column(db.String(10), nullable=False)
    return_time = db.Column(db.String(8), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    accommodation_address = db.Column(db.String(100), nullable=False)
    number_of_persons = db.Column(db.Integer, nullable=False)
    holiday_type = db.Column(db.String(50), nullable=False)
