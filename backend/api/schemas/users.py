from pydantic import BaseModel


class UserBase(BaseModel):
    class Config:
        orm_mode = True


class UserCreate(UserBase):
    name: str

    class Config:
        schema_extra = {
            "example": {
                "name": "your-name",
            }
        }


class UserCreateResponse(UserCreate):
    id: int


class User(UserBase):
    id: int
    name: str
