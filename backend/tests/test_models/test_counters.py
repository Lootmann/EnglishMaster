from datetime import datetime

from api.models.counters import Counter as CounterModel
from api.models.sentences import Sentence as SentenceModel


def test_counter_model_repr():
    sentence = SentenceModel(id=1, text="hoge", translation="hage")
    current = datetime.now()
    counter = CounterModel(id=1, sentence_id=sentence.id, created_at=current)

    assert (
        str(counter) == "<Counter (id, sentence, created_at)" + f" = (1, 1, {current})>"
    )
