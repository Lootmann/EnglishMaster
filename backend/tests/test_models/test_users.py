from api.models.users import User as UserModel
from api.schemas import users as user_schema


def test_user_model_repr():
    user_body = user_schema.UserCreate(name="hoge")
    user = UserModel(**user_body.dict())
    user.id = 1

    assert str(user) == f"<User (id, name) = (1, hoge)>"
