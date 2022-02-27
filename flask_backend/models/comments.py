from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)

    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    post = db.relationship("Post", back_populates="comments")


    subcomments = db.relationship("SubComment", back_populates="comment", cascade="all, delete")


    def to_dict(self):
        return {
            'id': self.id,
            'post_id': self.post_id,
            'content': self.content,
            'subcomments': [s.to_dict() for s in self.subcomments]
        }
