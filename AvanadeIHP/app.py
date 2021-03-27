

from flask import Flask, render_template,redirect,url_for

app = Flask(__name__)
@app.route('/')
def menu():
    return redirect(url_for('index'))

@app.route('/menu')
def index():
    return render_template('index.html')

@app.route('/menu/train')
def train():
    return render_template('train.html')

@app.route('/menu/generate')
def generate():
    return render_template('generate.html')