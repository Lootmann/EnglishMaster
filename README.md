# EnglishMaster

さくっと使えるやつ<br>
英語をさっさとマスターすべくお勉強<br>


## Models

```python
class Sentence:
  id: int
  text: str
  translation: str
```


## Backend


### Endpoint

```
GET   /sentences?limit=<int>&offset=<int>&random=true
GET   /sentences/:sentence_id
POST  /sentences
POST  /sentences/:sentence_id/counter
PATCH /sentences/:sentence_id
DELET /sentences/:sentence_id
```


## Frontend
