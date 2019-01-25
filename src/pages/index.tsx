import * as React from "react";
import { graphql } from "gatsby";
import { LayoutGroup } from "../components/Layout";
import { Box, Flex, Text, Card } from "primithemes";
import { Link } from "../components/Link";

interface DivisionNode {
  node: {
    title: string;
    fields: {
      slug: string;
    };
  };
}
interface Props {
  data: {
    content: {
      title: string;
    };
    divisions: {
      edges: DivisionNode[];
    };
  };
}

const IndexPage: React.SFC<Props> = ({ data: { content, divisions } }) => {
  return (
    <LayoutGroup>
      <Flex
        style={{ flexGrow: 1, height: "100%" }}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text m={3} is="h1" fontSize={[6, 6, 7]} color="secondary.main">
          {content.title}
        </Text>
        <Text is="h2" color="text.main">
          Not Found
        </Text>
        <Flex>
          {divisions.edges.map(({ node }) => (
            <Box p={2} key={node.fields.slug}>
              <Link to={node.fields.slug}>
                <Card p={2} shadow={2} radius={2}>
                  <div>{node.title}</div>
                </Card>
              </Link>
            </Box>
          ))}
        </Flex>
      </Flex>
    </LayoutGroup>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    content: groupContentYamlX(fields: { slug: { eq: "/" } }) {
      title
    }
    divisions: allSettingsYamlX(filter: { fields: { slug: { ne: "/" } } }) {
      edges {
        node {
          title
          fields {
            slug
          }
        }
      }
    }
  }
`;
