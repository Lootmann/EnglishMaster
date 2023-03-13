from datetime import datetime

from pydantic import BaseModel


class CounterBase(BaseModel):
    sentence_id: int
    created_at: datetime

    class Config:
        orm_mode = True
        schema_extra = {
            "examples": {
                "sentence_id": "1",
                "created_at": datetime.now(),
            }
        }


class CounterCreate(CounterBase):
    pass


class CounterCreateResponse(CounterCreate):
    id: int


class Counter(BaseModel):
    id: int
    sentence_id: int
    created_at: datetime

    class Config:
        orm_mode = True
