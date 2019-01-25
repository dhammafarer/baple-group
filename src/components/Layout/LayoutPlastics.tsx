import * as React from "react";
import { Layout } from "./Layout";
import { StaticQuery, graphql } from "gatsby";
import { NavItem } from "./Header";

interface Data {
  settings: {
    title: string;
    phone: string;
    email: string;
    logo: any;
  };
}

const navItems: NavItem[] = [{ to: "/home", label: "Home" }];

const LayoutPlastics: React.SFC<{}> = ({ children }) => (
  <StaticQuery
    query={graphql`
      query LayoutPlasticsQuery {
        settings: settingsYamlX(fields: { slug: { eq: "/plastics" } }) {
          ...LayoutFragment
        }
      }
    `}
    render={(data: Data) => {
      const { logo, email, phone, title } = data.settings;
      return (
        <Layout
          navItems={navItems}
          title={title}
          phone={phone}
          email={email}
          logo={logo}
        >
          {children}
        </Layout>
      );
    }}
  />
);

export { LayoutPlastics };
