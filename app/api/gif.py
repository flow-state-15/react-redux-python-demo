from flask import Blueprint
# from react-redux-eod-series.


gif_route = Blueprint('gif', __name__)


index = -1


@gif_route.route('/get-index', methods=['GET'])
def get_index():

    global index

    if index > 60:
        index = -1

    index += 1

    convert = str(index)
    padded = convert.zfill(5)

    return {"frame_index": padded}
