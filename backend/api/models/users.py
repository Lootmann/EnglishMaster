from sqlalchemy.orm import Mapped, mapped_column

from api.db import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]

    def __repr__(self) -> str:
        return f"<User (id, name) = ({self.id}, {self.name})>"
