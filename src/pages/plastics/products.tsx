import * as React from "react";
import { graphql } from "gatsby";
import { LayoutPlastics } from "../../components/Layout";
import { Flex, Text } from "primithemes";
import { Image } from "../../components/Image";
import { Link } from "../../components/Link";

interface CategoryNode {
  node: {
    title: string;
    image: any;
    fields: {
      slug: string;
    };
  };
}

interface Props {
  data: {
    content: {
      title: string;
      subtitle: string;
    };
    categories: {
      edges: CategoryNode[];
    };
  };
}

const ProductsPage: React.SFC<Props> = ({ data: { content, categories } }) => {
  return (
    <LayoutPlastics>
      <Flex
        style={{ flexGrow: 1, height: "100%" }}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text m={3} is="h1" fontSize={[6, 6, 7]} color="secondary.main">
          {content.title}
        </Text>
        <Text m={3} is="h4" fontSize={[4, 4, 5]} color="text.dark">
          {content.subtitle}
        </Text>
        <div>
          {categories.edges.map(({ node }) => (
            <div>
              <Link to={node.fields.slug}>
                <div>{node.title}</div>
                <div>
                  <Image fluid={node.image} />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Flex>
    </LayoutPlastics>
  );
};

export default ProductsPage;

export const query = graphql`
  query {
    content: plasticsContentYamlX(fields: { slug: { eq: "/products" } }) {
      title
      subtitle
    }
    categories: allPlasticsCategoriesYamlX {
      edges {
        node {
          fields {
            slug
          }
          title
          image {
            childImageSharp {
              fluid(maxWidth: 250) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
