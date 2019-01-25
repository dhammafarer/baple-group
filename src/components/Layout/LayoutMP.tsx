import * as React from "react";
import { Layout, LayoutData } from "./Layout";
import { StaticQuery, graphql } from "gatsby";

const LayoutMP: React.SFC<{}> = ({ children }) => (
  <StaticQuery
    query={graphql`
      query LayoutMpQuery {
        settings: settingsYamlX(fields: { slug: { eq: "/metal-packaging" } }) {
          ...LayoutFragment
        }
      }
    `}
    render={(data: LayoutData) => {
      const { fields, nav, logo, email, phone, title } = data.settings;
      return (
        <Layout
          navItems={nav}
          title={title}
          phone={phone}
          email={email}
          logo={logo}
          home={fields.slug}
        >
          {children}
        </Layout>
      );
    }}
  />
);

export { LayoutMP };
