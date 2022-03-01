from flask import Blueprint, request
from ..models import db, Post, Comment, SubComment

posts_routes = Blueprint('posts', __name__)



@posts_routes.route('/', methods=['GET','POST'])
def create_post():

    if request.method == 'POST':
        data = request.get_json(force=True)

        post = Post(content=data["content"])
        db.session.add(post)
        db.session.flush()
        post.content = f"{post.content}: {post.id}"
        db.session.commit()

        return post.to_dict()

    posts = Post.query.all()
    
    return { "posts": sorted([p.to_dict() for p in posts], key=lambda p: p["id"], reverse=True) }


@posts_routes.route('/delete/<id>', methods=['DELETE'])
def delete_post(id):
    Post.query.filter(Post.id == id).delete()
    db.session.commit()
    return f"Deleted post id {id}"
