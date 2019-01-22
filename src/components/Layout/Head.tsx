import * as React from "react";
import Helmet from "react-helmet";

interface Props {
  title: string;
}

const Head: React.SFC<Props> = ({ title }) => (
  <Helmet
    title={title}
    htmlAttributes={{ lang: "es" }}
    meta={[{ name: "description", content: "Control International" }]}
    link={[
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Muli:300,400,700",
      },
    ]}
  />
);

export { Head };
