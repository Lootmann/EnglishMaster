# EnglishMaster

さくっと使えるやつ<br>
英語をさっさとマスターすべくお勉強<br>


## Features

- Tags
  - 各Sentence に Tagをつけて質問文だけを集中的に表示する
  - 特定のGenreの質問を表示するなどを実装する
  - Genre ではなく ディレクトリに分けて入力していくと微妙な気もする
  - 各文章にタグを付ける形のほうが色々便利な気がする


```
- Genre
  - sentence
  - sentence
  - ...
```


```
sentence tag1 tag2
sentence tag1
sentence tag2
sentence tag2 tag4
...
```

一つのSentenceにはいろいろな要素が入っているはずなので<br>
Directoryで分けるよりは タグで分けたほうがいろいろなタグに引っかかるので良い感じかも<br>

- 文字数Filter
  - Random に出力するときなどに文字数でFilterをかけて
  - 長文たくさん読みたいとき 短文ばっかり見たい時にこれを利用する
  - Tag で代替出来る? そもそも必要か? というわけで実装はしない
  - API 側で 専用のEndpoint & Filter設定して 文字数で引っこ抜くほうが良さそうかも

- 文字を流れるように表示する
  - これはTypescript的に実装がしたい
  - 文章をまるごとバンッと見せるのではなく１単語づつ見せていく感じにしたい
  - 文章を聞いているように文字を表示させていくイメージ 100ms, 300, 500, 1000 などの間隔で
  - これはReactというよりはJS/TSの話 しかも簡単に実装が出来る


## Todo

- [x] 英文表示
  - ランダムに英文/和文を表示
  - ボタンを押すとFlipして裏側を表示

- [x] React Dir Structures
  - Dir Structures, name conventions を学んで<br>
  - 見た目最悪 すでによくわからなくなっている<br>
  - 適当に修正


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
