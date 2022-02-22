from flask import Flask
from .api import main_route

app = Flask(__name__)

app.register_blueprint(main_route, url_prefix='/api/main')

