from pydantic import BaseModel, Field


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

    class Config:
        orm_mode = True
