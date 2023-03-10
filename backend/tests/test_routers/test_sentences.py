from fastapi import status

from tests.factory import SentenceFactory


class TestGetAllSentences:
    def test_get_all_sentences_with_empty(self, client):
        resp = client.get("/sentences")
        assert resp.status_code == status.HTTP_200_OK
        assert resp.json() == []

    def test_get_all_sentences(self, client):
        sentences_data = {"text": "hello", "translation": ":^)"}
        resp = client.post("/sentences", json=sentences_data)
        assert resp.status_code == status.HTTP_201_CREATED

        resp = client.get("/sentences")
        assert resp.status_code == status.HTTP_200_OK
        assert len(resp.json()) == 1


class TestGetAllSentencesWithPagination:
    def test_get_all_sentences_pagination(self, client):
        for _ in range(130):
            SentenceFactory.create_sentence(client)

        resp = client.get("/sentences?limit=100&offset=0")
        assert resp.status_code == status.HTTP_200_OK

        obj = resp.json()
        assert len(obj) == 100
        assert obj[0]["id"] == 1
        assert obj[-1]["id"] == 100

        resp = client.get("/sentences?limit=10&offset=50")
        assert resp.status_code == status.HTTP_200_OK

        obj = resp.json()
        assert len(obj) == 10
        assert obj[0]["id"] == 51
        assert obj[-1]["id"] == 60

        resp = client.get("/sentences?limit=0&offset=0")
        assert resp.status_code == status.HTTP_200_OK
        obj = resp.json()
        assert len(obj) == 0

    def test_get_all_sentences_with_wrong_limit(self, client):
        resp = client.get("/sentences?limit=1000&offset=0")
        assert resp.status_code == status.HTTP_400_BAD_REQUEST
        assert resp.json() == {"detail": "limit should be range between 0 and 100"}

        resp = client.get("/sentences?limit=-10&offset=0")
        assert resp.status_code == status.HTTP_400_BAD_REQUEST
        assert resp.json() == {"detail": "limit should be range between 0 and 100"}


class TestGetSentence:
    def test_get_sentence_by_id(self, client):
        sentence = SentenceFactory.create_sentence(client)
        resp = client.get(f"/sentences/{sentence.id}")
        assert resp.status_code == status.HTTP_200_OK

    def test_get_sentence_with_wrong_id(self, client):
        resp = client.get("/sentences/123")
        assert resp.status_code == status.HTTP_404_NOT_FOUND


class TestPostSentences:
    def test_create_sentences(self, client):
        sentence_data = {"text": "hoge", "translation": "ほげ"}
        resp = client.post("/sentences", json=sentence_data)
        assert resp.status_code == status.HTTP_201_CREATED

    def test_sentence_factory(self, client):
        SentenceFactory.create_sentence(client)
        resp = client.get("/sentences")
        assert len(resp.json()) == 1
