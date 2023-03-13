from typing import List

from pydantic import BaseModel, Field

from api.schemas.counters import Counter


class SentenceBase(BaseModel):
    text: str = Field("")
    translation: str = Field("")

    class Config:
        orm_mode = True
        extra_schema = {
            "example": {
                "text": "hello world :^)",
                "translation": "こんにちは、せかい :^)",
            },
        }


class SentenceCreate(SentenceBase):
    pass


class SentenceUpdate(SentenceBase):
    pass


class SentenceCreateResponse(SentenceCreate):
    id: int


class Sentence(BaseModel):
    id: int
    text: str
    translation: str
    counter: List[Counter]

    class Config:
        orm_mode = True


class SentenceNeighbors(BaseModel):
    previous_id: int | None
    next_id: int | None

    class Config:
        orm_mode = True
