from flask import Flask, jsonify
from flask_cors import CORS
from routes.home_routes import home_api  # Import the home_api Blueprint
from routes.about_routes import about_api  # Import the about_api Blueprint

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Register Blueprints
app.register_blueprint(home_api, url_prefix='/home')
app.register_blueprint(about_api, url_prefix='/about')

@app.route('/')
def index():
    return "Welcome to the Main App!"

if __name__ == '__main__':
    app.run(debug=True)

if __name__ == '__main__':
    app.run(debug=True)
