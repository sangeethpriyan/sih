from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)
jsonify
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if email == 'test@test.com' and password == 'password123':
        return jsonify({'message': 'Login successful', 'status': 'success'})
    else:
        return jsonify({'message': 'Invalid email or password', 'status': 'error'})

@app.route('/contact', methods=['POST'])
def contact():
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')
    
    # Process the form submission, save to database, etc.
    
    return jsonify({'message': 'Message received successfully. Thank you!', 'status': 'success'})

if __name__ == '__main__':
    app.run(debug=True)
