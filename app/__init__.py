from flask import Flask, request
from .api import gif_route, posts_route

app = Flask(__name__)

app.register_blueprint(gif_route, url_prefix='/api/gif')
app.register_blueprint(posts_route, url_prefix='/api/posts')

# log entry into app
# @app.before_request
# def log():
#     print("\n<<<<< ENTERED FLASK >>>>>")
