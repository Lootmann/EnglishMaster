from typing import List

from sqlalchemy.future import select
from sqlalchemy.orm import Session

from api.models.users import User as UserModel
from api.schemas import users as user_schema


def get_all_users(db: Session) -> List[UserModel]:
    return db.scalars(select(UserModel)).all()


def create_user(db: Session, user_body: user_schema.UserCreate) -> UserModel:
    user = UserModel(**user_body.dict())
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
