from datetime import datetime

from api.models.counters import Counter as CounterModel
from api.models.sentences import Sentence as SentenceModel
from api.schemas import sentences as sentence_schema


def test_sentence_model_repr():
    sentence_body = sentence_schema.SentenceCreate(text="hello", translation="こんにちは")
    sentence = SentenceModel(**sentence_body.dict())
    sentence.id = 1

    assert (
        str(sentence)
        == f"<Sentence (id, counters, text, translation) = (1, 0, hello, こんにちは)>"
    )


def test_sentence_model_repr_with_counters():
    sentence_body = sentence_schema.SentenceCreate(text="hello", translation="こんにちは")
    sentence = SentenceModel(**sentence_body.dict())
    sentence.id = 1

    # add counters
    CounterModel(id=1, sentence=sentence, created_at=datetime.now())
    CounterModel(id=2, sentence=sentence, created_at=datetime.now())
    CounterModel(id=3, sentence=sentence, created_at=datetime.now())

    assert (
        str(sentence)
        == f"<Sentence (id, counters, text, translation) = (1, 3, hello, こんにちは)>"
    )
