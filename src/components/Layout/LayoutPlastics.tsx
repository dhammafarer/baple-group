import * as React from "react";
import { Layout } from "./Layout";
import { StaticQuery, graphql } from "gatsby";
import { NavItem } from "./Header";

interface Data {
  logo: any;
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
        settings: settingsYaml(fields: { division: { eq: "plastics" } }) {
          title
          phone
          email
        }
        logo: file(relativePath: { eq: "logos/logo.png" }) {
          childImageSharp {
            fixed(width: 100, quality: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={(data: Data) => {
      const { email, phone, title } = data.settings;
      return (
        <Layout
          navItems={navItems}
          title={title}
          phone={phone}
          email={email}
          logo={data.logo}
        >
          {children}
        </Layout>
      );
    }}
  />
);

export { LayoutPlastics };
