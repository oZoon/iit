# Создание интерфейса для отслеживания заявок клиент/перевозчик

## Зависимости

* node.js
* webpack
* react
* redux

## Установка

```
git clone https://github.com/oZoon/iit.git
npm i
```

## Запуск
```
npm run devserv (development)
npm run prd (production)
```

## Структура приложения
- components (содержит элементарные компоненты)
- containers (один контейнер, в данном случае)
- core (приложение, экшены и редьюсеры)
- lib (библиотеки, константы, генерация содержимого)

## настройка Webpack
- все настройки в каталоге config

---

## ChangeLog

### version 1.0.1

> сделано:
- сортировка по каждой колонке
- фильтрация данных по каждой колонке
- пагинация с выбором количества строк на странице

> не сделано:
- создание/редактирование/удаление заявок
- трансформация кодовой базы в typescript


> в планах (если руки дойдут):
- создание/редактирование/удаление заявок
- вынесение фильтров в отдельную колонку

---
