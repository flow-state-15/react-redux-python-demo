from .db import db


class SubComment(db.Model):
    __tablename__ = 'subcomments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)

    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'), nullable=False)
    comment = db.relationship("Comment", back_populates="subcomments")


    def to_dict(self):
        return {
            'id': self.id,
            'comment_id': self.comment_id,
            'content': self.content
        }
