from datetime import datetime

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from api.db import Base


class Counter(Base):
    __tablename__ = "counters"

    id: Mapped[int] = mapped_column(primary_key=True)

    sentence_id: Mapped[int] = mapped_column(ForeignKey("sentences.id"))
    sentence: Mapped["Sentence"] = relationship("Sentence", back_populates="counters")
    created_at: Mapped[datetime]

    def __repr__(self) -> str:
        return f"<Counter (id, sentence, created_at) = ({self.id}, {self.sentence_id}, {self.created_at})>"
