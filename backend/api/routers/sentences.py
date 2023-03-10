from typing import List

from fastapi import APIRouter, Depends, status
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session

from api.cruds import sentences as sentence_api
from api.db import get_db
from api.schemas import sentences as sentence_schema

router = APIRouter(
    tags=["sentences"],
    prefix="/sentences",
)


@router.get(
    "/",
    response_model=List[sentence_schema.Sentence],
    status_code=status.HTTP_200_OK,
)
def get_all_sentences(
    limit: int | None = None,
    offset: int | None = None,
    random: bool | None = None,
    db: Session = Depends(get_db),
):
    if random:
        return [sentence_api.get_random(db)]

    if limit is None and offset is None:
        pass

    elif not 0 <= int(limit) <= 100:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"limit should be range between 0 and 100",
        )
    return sentence_api.get_all_sentences(db, limit, offset)


@router.get(
    "/{sentence_id}",
    response_model=sentence_schema.Sentence,
    status_code=status.HTTP_200_OK,
)
def find_by_id(sentence_id: int, db: Session = Depends(get_db)):
    res = sentence_api.find_by_id(db, sentence_id)
    if not res:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sentence: {sentence_id} Not Found",
        )
    return res


@router.post(
    "/",
    response_model=sentence_schema.SentenceCreateResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_sentence(
    sentence_body: sentence_schema.SentenceCreate,
    db: Session = Depends(get_db),
):
    return sentence_api.create_sentence(db, sentence_body)


@router.patch(
    "/{sentence_id}",
    response_model=sentence_schema.Sentence,
    status_code=status.HTTP_200_OK,
)
def update_sentence(
    sentence_id: int,
    sentence_body: sentence_schema.SentenceUpdate,
    db: Session = Depends(get_db),
):
    sentence = sentence_api.find_by_id(db, sentence_id)
    if not sentence:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sentence: {sentence_id} Not Found",
        )
    return sentence_api.update_sentence(db, sentence, sentence_body)


@router.delete(
    "/{sentence_id}",
    response_model=None,
    status_code=status.HTTP_200_OK,
)
def delete_sentence(sentence_id: int, db: Session = Depends(get_db)):
    sentence = sentence_api.find_by_id(db, sentence_id)
    if not sentence:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sentence: {sentence_id} Not Found",
        )
    return sentence_api.delete_sentence(db, sentence)
