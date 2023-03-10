# EnglishMaster

さくっと使えるやつ<br>

- ランダムに英文/和文を表示
- ボタンを押すとFlipして裏側を表示
- そのうちTagをつけて質問文だけを集中的に表示する
- 特定のGenreの質問を表示するなどを実装する
- Genreをディレクトリに分けて入力していくと微妙な気もする?
- 各文章にタグを付ける形のほうが色々便利な気がする
- さくっと入力出来るように


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
GET   /sentences?limit=<int>&offset=<int>
GET   /sentences/:sentence_id
POST  /sentences
PATCH /sentences/:sentence_id
DELET /sentences/:sentence_id
```


## Frontend
