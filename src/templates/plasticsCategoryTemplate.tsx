import * as React from "react";
import { LayoutPlastics } from "../components/Layout/LayoutPlastics";
import { graphql } from "gatsby";
import { styled, Box } from "primithemes";

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  & th,
  td {
    padding: ${props => props.theme.sizes[2]};
    background: transparent;
    text-align: left;
  }
  & tr {
    border: 1px solid;
    border-left: none;
    border-right: none;
    border-color: ${props => props.theme.colors.divider.main};
  }
  & tr:nth-child(even) {
    background: ${props => props.theme.colors.divider.light};
  }
`;

interface ProductNode {
  node: {
    title: string;
    image: any;
    spec: { key: string; value: string }[];
  };
}

interface Props {
  data: {
    category: {
      title: string;
    };
    products: {
      edges: ProductNode[];
    };
  };
}

const PlasticsProductCategoryTemplate: React.SFC<Props> = ({
  data: { category, products },
}) => (
  <LayoutPlastics>
    <div>{category.title}</div>
    <div>
      {products.edges.map(({ node }) => (
        <div key={node.title}>
          <div>{node.title}</div>
          <Box p={3}>
            <Table>
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {node.spec.map((sp, i) => (
                  <tr key={i}>
                    <td>{sp.key}</td>
                    <td>{sp.value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Box>
        </div>
      ))}
    </div>
  </LayoutPlastics>
);

export default PlasticsProductCategoryTemplate;

export const query = graphql`
  query PlasticsProductCategoryQuery($slug: String!, $title: String!) {
    category: plasticsCategoriesYamlX(fields: { slug: { eq: $slug } }) {
      title
    }
    products: allPlasticsProductsYamlX(filter: { category: { eq: $title } }) {
      edges {
        node {
          title
          spec {
            key
            value
          }
          image {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
