# Google Books Search

Проект test-book-search представляет собой веб-приложение, позволяющее выполнять поиск книг с использованием Google Books API и отображать результаты поиска в виде карточек. Пользователи могут также просматривать подробную информацию о выбранной книге и возвращаться к результатам поиска.

## Установка

1. Клонируйте репозиторий с помощью следующей команды:

    ```
    git clone https://github.com/ivan-nor/test-book-search-app.git
    ```

2. Перейдите в директорию проекта:
   ```bash
   cd test-book-search-app
   ```

3. Установите зависимости с помощью npm:

   ```bash
   npm install
   ```

## Запуск

1. Для запуска проекта выполните следующую команду:

   ```bash
   npm start
   ```

2. После запуска, откройте веб-браузер и перейдите по адресу [http://localhost:3000](http://localhost:3000) для доступа к приложению.

## Попробовать сейчас

Перейдите по ссылке https://test-book-search-app.vercel.app/ 

## Использование

1. На главной странице приложения вы можете ввести свой запрос, выбрать категорию и параметр сортировки, затем нажать кнопку "Искать", чтобы выполнить поиск.

2. Результаты поиска будут отображены в виде карточек с информацией о каждой книге.

3. Чтобы просмотреть подробную информацию о книге, нажмите на кнопку "Подробнее" на соответствующей карточке. Вы будете перенаправлены на страницу книги.

4. На странице с подробной информацией о книге, вы найдете информацию о названии, авторах, категориях, изображении обложки, описании и других данных.

5. Для возврата к результатам поиска, нажмите кнопку "Назад к результатам поиска".

## Зависимости

Проект использует следующие библиотеки и инструменты:

- [React](https://reactjs.org/) - библиотека для разработки пользовательского интерфейса
- [React Router](https://reactrouter.com/) - для маршрутизации в приложении
- [React Bootstrap](https://react-bootstrap.github.io/) - для создания стильных компонентов
- [Redux](https://redux.js.org/) - для управления состоянием приложения
- [Axios](https://axios-http.com/) - для выполнения HTTP-запросов к Google Books API

## Дополнительная информация

Проект создан в рамках обучения и предоставляется как демонстрация навыков разработки веб-приложений с использованием React и связанных технологий.
