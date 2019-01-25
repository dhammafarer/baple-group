import * as React from "react";
import { Layout, LayoutData } from "./Layout";
import { StaticQuery, graphql } from "gatsby";

const LayoutEnergy: React.SFC<{}> = ({ children }) => (
  <StaticQuery
    query={graphql`
      query LayoutEnergyQuery {
        settings: settingsYamlX(fields: { slug: { eq: "/energy" } }) {
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

export { LayoutEnergy };
