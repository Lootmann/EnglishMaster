# EnglishMaster


## Models

```python
class Sentence:
  id: int
  content: str
  translation: str
```


## Backend

### Endpoint

```
GET   /sentences?limit=<int>&offset=<int>
GET   /sentences/:sentence_id
POST  /sentences
PATCH /sentences/:sentence_id
DELET /sentences/:sentence_id
```


## Frontend
