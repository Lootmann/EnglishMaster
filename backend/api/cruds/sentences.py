from typing import List, Optional

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


def create_sentence(
    db: Session, sentence_body: sentence_schema.SentenceCreate
) -> SentenceModel:
    sentence = SentenceModel(**sentence_body.dict())
    db.add(sentence)
    db.commit()
    db.refresh(sentence)
    return sentence
