import * as React from "react";
import { LayoutPlastics } from "../components/Layout/LayoutPlastics";
import { graphql } from "gatsby";
import { Image } from "../components/Image";

interface ProductNode {
  node: {
    title: string;
    image: any;
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
          <Image fluid={node.image} />
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
