import languages from "./languages";

export const localeData = [
  ...require("react-intl/locale-data/en"),
  ...require("react-intl/locale-data/zh"),
];

export interface Language {
  code: string, name: string
};

export {
  languages
};
