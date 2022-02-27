from flask import Blueprint
# from react-redux-eod-series.


posts_route = Blueprint('posts', __name__)


index = -1


@posts_route.route('/post', methods=['GET'])
def get_index():

    pass


@posts_route.route('/load-reducer', methods=['GET'])
def load_reducer():
    pass
