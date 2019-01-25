import * as React from "react";
import { Layout, LayoutData } from "./Layout";
import { StaticQuery, graphql } from "gatsby";

const LayoutPlastics: React.SFC<{}> = ({ children }) => (
  <StaticQuery
    query={graphql`
      query LayoutPlasticsQuery {
        settings: settingsYamlX(fields: { slug: { eq: "/plastics" } }) {
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

export { LayoutPlastics };
