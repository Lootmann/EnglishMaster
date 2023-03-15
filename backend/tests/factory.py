from random import choice, randint
from string import ascii_letters
from typing import Optional

from api.schemas import sentences as sentence_schema


def random_string(min_: int = 5, max_: int = 10) -> str:
    return " ".join([choice(ascii_letters) for _ in range(randint(min_, max_) + 1)])


class SentenceFactory:
    @staticmethod
    def create_sentence(
        client, text: Optional[str] = None, translation: Optional[str] = None
    ):
        if text is None:
            text = random_string()

        if translation is None:
            translation = random_string()

        resp = client.post(
            "/sentences", json={"text": text, "translation": translation}
        )
        return sentence_schema.SentenceCreateResponse(**resp.json())
