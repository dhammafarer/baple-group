const manageTranslations = require("react-intl-translations-manager").default;

manageTranslations({
  messagesDirectory: 'dist/messages',
  translationsDirectory: 'src/i18n/translations/',
  languages: ['en', 'zh']
});
