from datetime import datetime
from random import choice
from typing import List, Optional

from sqlalchemy import func
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import select

from api.models.counters import Counter as CounterModel
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
    return stmt.first()


def get_num_of_words(db: Session, low: int, high: int) -> List[SentenceModel]:
    # FIXME: re-write much sqlalchemize query!
    # this query can be slow for large datasets.
    records = db.execute(select(SentenceModel)).scalars().all()
    results = []
    for record in records:
        if low <= len(record.text) <= high:
            results.append(record)
    return [choice(results)]


def create_sentence(
    db: Session, sentence_body: sentence_schema.SentenceCreate
) -> SentenceModel:
    sentence = SentenceModel(**sentence_body.dict())
    db.add(sentence)
    db.commit()
    db.refresh(sentence)
    return sentence


def increase_count(db: Session, original: SentenceModel) -> SentenceModel:
    counter = CounterModel(sentence_id=original.id, created_at=datetime.now())
    original.counters.append(counter)
    db.add(original)
    db.commit()
    db.refresh(original)
    return original


def find_neighbors(
    db: Session,
    current_sentence_id: int,
) -> sentence_schema.SentenceNeighbors:
    stmt = (
        select(SentenceModel.id)
        .order_by(SentenceModel.id.desc())
        .where(SentenceModel.id < current_sentence_id)
    )
    previous_id = db.execute(stmt).scalar()

    stmt = (
        select(SentenceModel.id)
        .order_by(SentenceModel.id.asc())
        .where(SentenceModel.id > current_sentence_id)
    )
    next_id = db.execute(stmt).scalar()

    return sentence_schema.SentenceNeighbors(
        previous_id=previous_id,
        next_id=next_id,
    )


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
