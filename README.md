# MosQA CTF

Код страшный, написано за один вечер =)

## dev

Сервер запускается на порту 8080

```bash
$ npm ci
$ MONGODB_URL='...' MONGODB_NAME='...' npm start
```

Для запуска надо передать перменные окружения `MONGODB_URL` и `MONGODB_NAME`  для подключения с mongodb.

Кейсы в `src/ctf/cases`. Каждый кейс -  функция от `req`, должна вернуть true или false.


## usage

* `/comments/` - live comments
* `/rating/` - live rating
* `/whoami/` - показать всю куку
