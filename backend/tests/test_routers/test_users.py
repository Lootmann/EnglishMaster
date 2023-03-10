from fastapi import status

from api.models.users import User as UserModel
from api.schemas import users as user_schema
from tests.init_client import client


class TestGetAllWords:
    def test_get_all_users_with_empty(self, client):
        resp = client.get("/users")
        assert resp.status_code == status.HTTP_200_OK
        assert resp.json() == []

    def test_get_all_words(self, client):
        user_data = {"name": "hoge"}
        resp = client.post("/users", json=user_data)
        assert resp.status_code == status.HTTP_201_CREATED

        resp = client.get("/users")
        assert resp.status_code == status.HTTP_200_OK
        assert len(resp.json()) == 1


class TestPostUsers:
    def test_create_user(self, client):
        user_data = {"name": "hoge"}
        resp = client.post("/users", json=user_data)
        assert resp.status_code == status.HTTP_201_CREATED
