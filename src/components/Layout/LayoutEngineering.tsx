import * as React from "react";
import { Layout, LayoutData } from "./Layout";
import { StaticQuery, graphql } from "gatsby";

const LayoutEngineering: React.SFC<{}> = ({ children }) => (
  <StaticQuery
    query={graphql`
      query LayoutEngineeringQuery {
        settings: settingsYamlX(fields: { slug: { eq: "/engineering" } }) {
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

export { LayoutEngineering };
