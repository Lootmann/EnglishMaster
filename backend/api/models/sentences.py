from typing import List

from sqlalchemy.orm import Mapped, mapped_column, relationship

from api.db import Base
from api.models.counters import Counter


class Sentence(Base):
    __tablename__ = "sentences"

    id: Mapped[int] = mapped_column(primary_key=True)
    text: Mapped[str]
    num_of_words: Mapped[int]
    translation: Mapped[str]
    counters: Mapped[List["Counter"]] = relationship(
        "Counter", back_populates="sentence"
    )

    def __repr__(self) -> str:
        return (
            "<Sentence (id, counters, text, num_of_words, translation)"
            + f" = ({self.id}, {len(self.counters)}, {self.text}, {self.num_of_words}, {self.translation})>"
        )
