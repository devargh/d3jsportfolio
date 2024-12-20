from flask import Blueprint, jsonify

# Define the Blueprint
home_api = Blueprint('home_api', __name__)

# Define routes within the Blueprint
@home_api.route('/', methods=['GET'])
def home_index():
    return jsonify({"message": "Welcome to the Home API!"})

@home_api.route('/details', methods=['GET'])
def home_details():
    # return jsonify({"message": "This is the Home Details Endpoint!"})
    data = [
        { "date": "2023-07-01", "value": 19.1 },
        { "date": "2023-07-02", "value": 15.3 },
        { "date": "2023-07-03", "value": 16.4 },
        { "date": "2023-07-04", "value": 16.0 },
        { "date": "2023-07-05", "value": 17.9 },
        { "date": "2023-07-06", "value": 15.8 },
        { "date": "2023-07-07", "value": 21.1 },
        { "date": "2023-07-08", "value": 23.3 },
        { "date": "2023-07-09", "value": 24.8 },
        { "date": "2023-07-10", "value": 25.1 },
        { "date": "2023-07-11", "value": 18.2 },
        { "date": "2023-07-12", "value": 14.4 },
        { "date": "2023-07-13", "value": 19.3 },
        { "date": "2023-07-14", "value": 20.2 },
        { "date": "2023-07-15", "value": 15.8 },
        { "date": "2023-07-16", "value": 16.1 },
        { "date": "2023-07-17", "value": 15.7 },
        { "date": "2023-07-18", "value": 19.2 },
        { "date": "2023-07-19", "value": 18.6 },
        { "date": "2023-07-20", "value": 18.3 },
        { "date": "2023-07-21", "value": 15.0 },
        { "date": "2023-07-22", "value": 14.7 },
        { "date": "2023-07-23", "value": 18.8 },
        { "date": "2023-07-24", "value": 17.7 },
        { "date": "2023-07-25", "value": 17.4 },
        { "date": "2023-07-26", "value": 17.0 },
        { "date": "2023-07-27", "value": 18.1 },
        { "date": "2023-07-28", "value": 18.2 },
        { "date": "2023-07-29", "value": 20.3 },
        { "date": "2023-07-30", "value": 16.4 },
        { "date": "2023-07-31", "value": 17.0 }
    ];
    return jsonify(data)

