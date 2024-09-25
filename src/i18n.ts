// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) // подключаем backend для загрузки переводов
  .use(initReactI18next) // подключаем react-i18next
  .init({
    lng: 'en', // язык по умолчанию
    fallbackLng: 'en', // язык по умолчанию если перевод не найден
    supportedLngs: ['en', 'ru'], // поддерживаемые языки
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // путь к файлам переводов
    },
    interpolation: {
      escapeValue: false, // экранирование не требуется для React
    },
  });

export default i18n;
