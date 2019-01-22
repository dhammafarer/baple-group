import * as React from "react";
import { IntlProvider, addLocaleData } from "react-intl";
import { Language } from "./locales/index";
import { localeData } from "./locales";

addLocaleData(localeData);

interface WithLocaleProps {
  pageContext: {
    languages: Language[],
    locale: string,
  };
}

export const withIntl = <P extends object>(Component: React.ComponentType<P>) =>
  class WithIntl extends React.Component<P & WithLocaleProps> {
    render() {
    const locale = this.props.pageContext.locale || "en";
    const messages = require(`./translations/${locale}.json`);

    return (
      <IntlProvider locale={locale} messages={messages}>
        <Component {...this.props} />
      </IntlProvider>
    ); }
  };
