import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { navigate } from "gatsby";

export type WithLangsProps = {
  handleClick(code: string): void;
  locale: string;
} & InjectedIntlProps;

export const withLangs = <P extends WithLangsProps>(Component: React.ComponentType<P>) =>
  injectIntl(class WithLangs extends React.Component<P> {
    handleClick = (code: string) => {
      localStorage.setItem("language", code);
      const path = window.location.pathname
        .split("/")
        .map((x,i) => (i===1) ? code : x)
        .join("/");
        console.log(path);
      return navigate(path);
    }
    render() {
      return (
        <Component
          locale={this.props.intl.locale}
          handleClick={this.handleClick}
          {...this.props}
        />
      );
    }
  });
