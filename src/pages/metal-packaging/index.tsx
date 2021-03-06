import * as React from "react";
import { graphql } from "gatsby";
import { LayoutMP } from "../../components/Layout";
import { Flex, Text } from "primithemes";

interface Props {
  data: {
    content: {
      title: string;
    };
  };
}

const IndexPage: React.SFC<Props> = ({ data: { content } }) => {
  return (
    <LayoutMP>
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
      </Flex>
    </LayoutMP>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    content: metalPackagingContentYamlX(fields: { slug: { eq: "/" } }) {
      title
    }
  }
`;
