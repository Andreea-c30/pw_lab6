import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flasgger import Swagger, swag_from
from flask_jwt_extended import JWTManager
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required, get_jwt
from datetime import datetime, timedelta
from models import Vacation, db  # Import Vacation model and db instance

app = Flask(__name__)
CORS(app)  # Enable CORS for handling requests from React frontend
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///vacations.db'  # Change the database path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

swagger = Swagger(app, template_file='swagger.yaml')
app.config['SECRET_KEY'] = 'dasEEEDADASDASD@E#@DASD'
app.config["JWT_SECRET_KEY"] = "DASsds2e#@e23eSDAD.ED2D2/3!@QWQ"
app.config['JWT_TOKEN_LOCATION'] = ['headers']

def create_db(app):
    if not os.path.exists("./instance/vacations.db"):  # Create database if it doesn't exist
        with app.app_context():
            db.create_all()

            # Add initial data
            if db.session.query(Vacation).count() == 0:
                vacation = Vacation(departure_date="01/06/2024",
                                    departure_time="09:00 AM",
                                    return_date="20/06/2024",
                                    return_time="09:00 AM",
                                    location="Italy",
                                    accommodation_address="STR X",
                                    number_of_persons=5,
                                    holiday_type="city break")
                db.session.add(vacation)
                db.session.commit()
            print("DB was created!")

jwt = JWTManager(app)
    
create_db(app)
migrate = Migrate(app, db)

# API Endpoints

@app.route('/token', methods=['GET'])
def get_token():
    if request.method == 'GET':
        role = request.args.get("role", type=str)
        access_token = create_access_token(
            identity="admin", 
            expires_delta=timedelta(minutes=100),
            additional_claims={'role': role},
        )
        return jsonify({"jwt": access_token, "role": role}), 200


@app.route('/vacations', methods=['POST'])
@swag_from('swagger.yaml', endpoint='createVacation', methods=['POST'])
@jwt_required()
def create_vacation():
    if 'admin' == get_jwt()['role']:
        vacation_data = request.json
        vacation = Vacation(**vacation_data)
        db.session.add(vacation)
        db.session.commit()
        return jsonify({"message": "Vacation created successfully", "vacation": vacation_data}), 201
    return jsonify({"message": "No permissions!"}), 403

@app.route('/vacations', methods=['GET'])
@swag_from('swagger.yaml', endpoint='getVacations', methods=['GET'])
@jwt_required()
def get_vacations():
    if get_jwt()['role'] in ['admin', 'visitor']:
        vacations = Vacation.query.all()
        vacation_list = [{"id": vacation.id, "departure_date": vacation.departure_date,
                        "departure_time": vacation.departure_time, "return_date": vacation.return_date,
                        "return_time": vacation.return_time, "location": vacation.location,
                        "accommodation_address": vacation.accommodation_address,
                        "number_of_persons": vacation.number_of_persons, "holiday_type": vacation.holiday_type}
                        for vacation in vacations]
        return jsonify(vacation_list)
    return jsonify({"message": "No permissions!"}), 403

@app.route('/vacations/<int:vacation_id>', methods=['GET'])
@swag_from('swagger.yaml', endpoint='getVacation', methods=['GET'])
def get_vacation(vacation_id):
    vacation = Vacation.query.get(vacation_id)
    if vacation:
        vacation_data = {"id": vacation.id, "departure_date": vacation.departure_date,
                         "departure_time": vacation.departure_time, "return_date": vacation.return_date,
                         "return_time": vacation.return_time, "location": vacation.location,
                         "accommodation_address": vacation.accommodation_address,
                         "number_of_persons": vacation.number_of_persons, "holiday_type": vacation.holiday_type}
        return jsonify(vacation_data)
    return jsonify({"message": "Vacation not found"}), 404

@app.route('/vacations/<int:vacation_id>', methods=['PUT'])
@swag_from('swagger.yaml', endpoint='updateVacation', methods=['PUT'])
@jwt_required()
def update_vacation(vacation_id):
    if 'admin' == get_jwt()['role']:
        updated_vacation_data = request.json
        vacation = Vacation.query.get(vacation_id)
        if vacation:
            for key, value in updated_vacation_data.items():
                setattr(vacation, key, value)
            db.session.commit()
            return jsonify({"message": "Vacation updated successfully", "vacation": updated_vacation_data})
        return jsonify({"message": "Vacation not found"}), 404
    return jsonify({"message": "No permissions!"}), 403

@app.route('/vacations/<int:vacation_id>', methods=['DELETE'])
@jwt_required()
@swag_from('swagger.yaml', endpoint='deleteVacation', methods=['DELETE'])
def delete_vacation(vacation_id):
    if get_jwt()['role'] == 'admin':
        vacation = Vacation.query.get(vacation_id)
        if vacation:
            db.session.delete(vacation)
            db.session.commit()
            return jsonify({"message": "Vacation deleted successfully"}), 200
        return jsonify({"message": "Vacation not found"}), 404
    return jsonify({"message": "No permissions!"}), 403

if __name__ == '__main__':
    app.run()
