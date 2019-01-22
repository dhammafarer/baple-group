import * as React from "react";
import { LayoutPlastics } from "../../components/Layout";
import { Flex, Text } from "primithemes";

const IndexPage: React.SFC<{}> = () => {
  return (
    <LayoutPlastics>
      <Flex
        style={{ flexGrow: 1, height: "100%" }}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text m={3} is="h1" fontSize={[6, 6, 7]} color="secondary.main">
          Index
        </Text>
        <Text is="h2" color="text.main">
          Not Found
        </Text>
      </Flex>
    </LayoutPlastics>
  );
};

export default IndexPage;
