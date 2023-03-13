from fastapi import status

from tests.factory import SentenceFactory, random_string


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


class TestGetRandomSentence:
    def test_get_random_sentence(self, client):
        SentenceFactory.create_sentence(client)
        SentenceFactory.create_sentence(client)
        SentenceFactory.create_sentence(client)
        resp = client.get("/sentences?random=true")
        assert resp.status_code == status.HTTP_200_OK
        assert len(resp.json()) == 1


class TestGetSentenceNeighbors:
    def test_get_neighbors(self, client):
        """
        ids: [1, 3, 5, 7, 9]
        """
        for _ in range(10):
            SentenceFactory.create_sentence(client)

        for sentence_id in range(2, 10 + 1, 2):
            resp = client.delete(f"/sentences/{sentence_id}")
            assert resp.status_code == status.HTTP_200_OK

        # get 1's neighbors
        resp = client.get("/sentences/1/neighbors")
        assert resp.status_code == status.HTTP_200_OK
        assert resp.json() == {"previous_id": None, "next_id": 3}

        # get 2's neighbors
        resp = client.get("/sentences/2/neighbors")
        assert resp.status_code == status.HTTP_404_NOT_FOUND

        # get 7's neighbors
        resp = client.get("/sentences/7/neighbors")
        assert resp.status_code == status.HTTP_200_OK
        assert resp.json() == {"previous_id": 5, "next_id": 9}

        # get 9's neighbors
        resp = client.get("/sentences/9/neighbors")
        assert resp.status_code == status.HTTP_200_OK
        assert resp.json() == {"previous_id": 7, "next_id": None}


class TestGetRandomSentenceByNumOfWords:
    def test_get_random_sentence(self, client):
        for _ in range(5):
            SentenceFactory.create_sentence(
                client, text=random_string(min_=20, max_=30)
            )

        for _ in range(8):
            SentenceFactory.create_sentence(
                client, text=random_string(min_=50, max_=60)
            )

        for _ in range(12):
            SentenceFactory.create_sentence(
                client, text=random_string(min_=100, max_=110)
            )

        resp = client.get("/sentences?random=true&low=0&high=30")
        assert resp.status_code == status.HTTP_200_OK
        assert 0 <= len(resp.json()[0]["text"]) <= 30

        resp = client.get("/sentences?random=true&low=50&high=60")
        assert resp.status_code == status.HTTP_200_OK
        assert 50 <= len(resp.json()[0]["text"]) <= 60

        resp = client.get("/sentences?random=true&low=100&high=110")
        assert resp.status_code == status.HTTP_200_OK
        assert 100 <= len(resp.json()[0]["text"]) <= 110

        resp = client.get("/sentences?random=true&low=20&high=60")
        assert resp.status_code == status.HTTP_200_OK
        assert 20 <= len(resp.json()[0]["text"]) <= 60

        resp = client.get("/sentences?random=true&low=50&high=110")
        assert resp.status_code == status.HTTP_200_OK
        assert 50 <= len(resp.json()[0]["text"]) <= 110


class TestPostSentences:
    def test_create_sentence(self, client):
        sentence_data = {"text": "hoge", "translation": "ほげ"}
        resp = client.post("/sentences", json=sentence_data)
        assert resp.status_code == status.HTTP_201_CREATED

    def test_sentence_factory(self, client):
        SentenceFactory.create_sentence(client)
        resp = client.get("/sentences")
        assert len(resp.json()) == 1


class TestPostSentenceIncreaseCounter:
    def test_increase_sentence_counter(self, client):
        sentence_resp = SentenceFactory.create_sentence(client)

        resp = client.post(f"/sentences/{sentence_resp.id}/counter")
        obj = resp.json()
        assert obj["id"] == sentence_resp.id
        assert obj["text"] == sentence_resp.text
        assert obj["translation"] == sentence_resp.translation

        resp = client.post(f"/sentences/{sentence_resp.id}/counter")
        obj = resp.json()
        assert len(obj["counters"]) == 2


class TestUpdateSentences:
    def test_update_sentence(self, client):
        sentence_resp = SentenceFactory.create_sentence(client)

        sentence_json = {"text": "updated", "translation": "updated"}
        resp = client.patch(f"/sentences/{sentence_resp.id}", json=sentence_json)
        assert resp.status_code == status.HTTP_200_OK

        resp_obj = resp.json()
        assert resp_obj["text"] != sentence_resp.text
        assert resp_obj["text"] == "updated"
        assert resp_obj["translation"] != sentence_resp.translation
        assert resp_obj["translation"] == "updated"

    def test_update_sentence_with_wrong_id(self, client):
        SentenceFactory.create_sentence(client)
        sentence_json = {"text": "updated", "translation": "updated"}
        resp = client.patch(f"/sentences/123", json=sentence_json)
        assert resp.status_code == status.HTTP_404_NOT_FOUND
        assert resp.json() == {"detail": f"Sentence: 123 Not Found"}

    def test_update_sentence_with_lack_postdata(self, client):
        sentence_resp = SentenceFactory.create_sentence(client)
        sentence_json = {"text": "updated"}
        resp = client.patch(f"/sentences/{sentence_resp.id}", json=sentence_json)
        assert resp.status_code == status.HTTP_200_OK

        resp_obj = resp.json()
        assert resp_obj["text"] != sentence_resp.text
        assert resp_obj["text"] == "updated"
        assert resp_obj["translation"] == sentence_resp.translation

        sentence_json = {"translation": "updated"}
        resp = client.patch(f"/sentences/{sentence_resp.id}", json=sentence_json)
        assert resp.status_code == status.HTTP_200_OK

        resp_obj = resp.json()
        assert resp_obj["text"] == "updated"
        assert resp_obj["translation"] == "updated"


class TestDeleteSentence:
    def test_delete_sentence(self, client):
        sentence_resp = SentenceFactory.create_sentence(client)

        resp = client.get("/sentences")
        assert resp.status_code == status.HTTP_200_OK
        assert len(resp.json()) == 1

        resp = client.delete(f"/sentences/{sentence_resp.id}")
        assert resp.status_code == status.HTTP_200_OK

        resp = client.get("/sentences")
        assert resp.status_code == status.HTTP_200_OK
        assert len(resp.json()) == 0

    def test_delete_sentence_with_wrong_id(self, client):
        resp = client.delete("/sentences/123")
        assert resp.status_code == status.HTTP_404_NOT_FOUND
