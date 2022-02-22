from flask import Blueprint
# from react-redux-eod-series.


main_route = Blueprint('main', __name__)


index = 0


@main_route.route('/get-index', methods=['GET'])
def get_index():
    print('in the getIndex route')

    global index
    if index > 61:
        index = 0

    return f'in the getIndex route, index is {index}'


# @main_route.route('/load-reducer', methods=['GET'])
# def load_reducer():
