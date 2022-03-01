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


@posts_routes.route('/delete/post/<id>', methods=['DELETE'])
def delete_post(id):
    post = Post.query.filter(Post.id == id).first()
    db.session.delete(post)
    db.session.commit()
    return f"Deleted post id {id}"


#comments route handlers
@posts_routes.route('/comments', methods=['POST'])
def create_comment():

    if request.method == 'POST':
        data = request.get_json(force=True)

        comment = Comment(content=data["content"], post_id=data["post_id"])
        db.session.add(comment)
        db.session.flush()
        comment.content = f"{comment.content}: {comment.id}"
        db.session.commit()

        return comment.to_dict()

    comments = Comment.query.all()

    return { "comments": sorted([c.to_dict() for c in comments], key=lambda c: c["id"], reverse=True) }


@posts_routes.route('/delete/comment/<id>', methods=['DELETE'])
def delete_comment(id):
    comment = Comment.query.filter(Comment.id == id).first()
    db.session.delete(comment)
    db.session.commit()
    return f"Deleted comment by id {id}"


#subcomments route handlers
@posts_routes.route('/subcomments', methods=['GET','POST'])
def create_subcomment():

    if request.method == 'subcomment':
        data = request.get_json(force=True)

        subcomment = SubComment(content=data["content"], comment_id=data["comment_id"])
        db.session.add(subcomment)
        db.session.flush()
        subcomment.content = f"{subcomment.content}: {subcomment.id}"
        db.session.commit()

        return subcomment.to_dict()

    subcomments = SubComment.query.all()

    return { "subcomments": sorted([s.to_dict() for s in subcomments], key=lambda s: s["id"], reverse=True) }


@posts_routes.route('/delete/subcomment/<id>', methods=['DELETE'])
def delete_subcomment(id):
    SubComment.query.filter(SubComment.id == id).delete()
    db.session.commit()
    return f"Deleted subcomment id {id}"
