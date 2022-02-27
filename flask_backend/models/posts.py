from .db import db


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)

    comments = db.relationship("Comment", back_populates="post", cascade="all, delete")


    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'comments': [c.to_dict() for c in self.comments]
        }
