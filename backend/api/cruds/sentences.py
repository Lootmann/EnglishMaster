from typing import List, Optional

from sqlalchemy import func
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import select

from api.models.sentences import Sentence as SentenceModel
from api.schemas import sentences as sentence_schema


def get_all_sentences(
    db: Session, limit: Optional[int], offset: Optional[int]
) -> List[SentenceModel]:
    stmt = select(SentenceModel)

    if limit is not None:
        stmt = stmt.limit(limit)

    if offset is not None:
        stmt = stmt.offset(offset)

    return db.execute(stmt).scalars().all()


def find_by_id(db: Session, sentence_id: int) -> SentenceModel | None:
    stmt = select(SentenceModel).where(SentenceModel.id == sentence_id)
    return db.execute(stmt).scalar()


def get_random(db: Session) -> SentenceModel | None:
    stmt = db.query(SentenceModel).order_by(func.random())
    return stmt.all()


def create_sentence(
    db: Session, sentence_body: sentence_schema.SentenceCreate
) -> SentenceModel:
    sentence = SentenceModel(**sentence_body.dict())
    db.add(sentence)
    db.commit()
    db.refresh(sentence)
    return sentence


def update_sentence(
    db: Session,
    original: SentenceModel,
    update_body: sentence_schema.SentenceUpdate,
) -> SentenceModel:
    if update_body.text != "":
        original.text = update_body.text

    if update_body.translation != "":
        original.translation = update_body.translation

    db.add(original)
    db.commit()
    db.refresh(original)
    return original


def delete_sentence(db: Session, original) -> None:
    db.delete(original)
    db.commit()
    return
