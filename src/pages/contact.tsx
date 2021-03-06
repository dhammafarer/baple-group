import * as React from "react";
import { graphql } from "gatsby";
import { LayoutGroup } from "../components/Layout";
import { Flex, Text } from "primithemes";

interface Props {
  data: {
    content: {
      title: string;
    };
  };
}

const ContactPage: React.SFC<Props> = ({ data: { content } }) => {
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
      </Flex>
    </LayoutGroup>
  );
};

export default ContactPage;

export const query = graphql`
  query {
    content: groupContentYamlX(fields: { slug: { eq: "/contact" } }) {
      title
    }
  }
`;
