from sqlalchemy.orm import Mapped, mapped_column

from api.db import Base


class Sentence(Base):
    __tablename__ = "sentences"

    id: Mapped[int] = mapped_column(primary_key=True)
    text: Mapped[str]
    translation: Mapped[str]

    def __repr__(self) -> str:
        return f"<Sentence (id, text, translation) = ({self.id}, {self.text}, {self.translation})>"
