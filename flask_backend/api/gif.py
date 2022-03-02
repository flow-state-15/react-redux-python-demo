from flask import Blueprint

gif_routes = Blueprint('gif', __name__)


index = -1


@gif_routes.route('/get-index', methods=['GET'])
def get_index():

    global index

    if index > 60:
        index = -1

    index += 1

    # convert = str(index)
    # padded = convert.zfill(5) # --> '00001'

    return {"frame_index": index}
