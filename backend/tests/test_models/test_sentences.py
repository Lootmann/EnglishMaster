from api.models.sentences import Sentence as SentenceModel
from api.schemas import sentences as sentence_schema


def test_sentence_model_repr():
    sentence_body = sentence_schema.SentenceCreate(text="hello", translation="こんにちは")
    sentence = SentenceModel(**sentence_body.dict())
    sentence.id = 1

    assert str(sentence) == f"<Sentence (id, text, translation) = (1, hello, こんにちは)>"
