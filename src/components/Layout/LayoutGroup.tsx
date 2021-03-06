import * as React from "react";
import { Layout, LayoutData } from "./Layout";
import { StaticQuery, graphql } from "gatsby";

const LayoutGroup: React.SFC<{}> = ({ children }) => (
  <StaticQuery
    query={graphql`
      query LayoutGroupQuery {
        settings: settingsYamlX(fields: { slug: { eq: "/" } }) {
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

export { LayoutGroup };
