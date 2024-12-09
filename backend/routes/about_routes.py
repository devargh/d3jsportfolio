from flask import Blueprint, jsonify

# Define the Blueprint
about_api = Blueprint('about_api', __name__)

# Define routes within the Blueprint
@about_api.route('/', methods=['GET'])
def about_index():
    return jsonify({"message": "Welcome to the About API!"})

@about_api.route('/info', methods=['GET'])
def about_info():
    return jsonify({"message": "This is the About Info Endpoint!"})