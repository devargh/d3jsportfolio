from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

@app.route('/api/tabs', methods=['GET'])
def get_tabs():
    data = [
        {
            "name": "Tab 1",
            "panels": [
                {"title": "Panel 1.1", "content": "This is content for panel 1.1."},
                {"title": "Panel 1.2", "content": "This is content for panel 1.2."}
            ]
        },
        {
            "name": "Tab 2",
            "panels": [
                {"title": "Panel 2.1", "content": "This is content for panel 2.1."},
                {"title": "Panel 2.2", "content": "This is content for panel 2.2."}
            ]
        }
    ]
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
