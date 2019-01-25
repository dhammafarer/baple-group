import * as React from "react";
import { Layout, LayoutData } from "./Layout";
import { StaticQuery, graphql } from "gatsby";

const LayoutMP: React.SFC<{}> = ({ children }) => (
  <StaticQuery
    query={graphql`
      query LayoutMPQuery {
        settings: settingsYamlX(fields: { slug: { eq: "/metal-packaging" } }) {
          ...LayoutSettingsFragment
        }
        divisions: allSettingsYamlX {
          edges {
            node {
              ...LayoutDivisionsFragment
            }
          }
        }
      }
    `}
    render={(data: LayoutData) => {
      return <Layout data={data}>{children}</Layout>;
    }}
  />
);

export { LayoutMP };
