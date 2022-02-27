from flask import Blueprint, request
from ..models import db, Post, Comment, SubComment

posts_routes = Blueprint('posts', __name__)

incretment = 0

@posts_routes.route('/', methods=['GET','POST'])
def create_post():

    global increment

    if request.method == 'POST':
        increment += 1
        content = f'post number {increment}'

        post = Post(content=content)

        db.session.add(post)
        db.session.commit()

        return post.to_dict()

    posts = Post.query.all()

    return { "posts": [p.to_dict() for p in posts]}
