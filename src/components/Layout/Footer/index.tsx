import * as React from "react";
import { styled, Box, Card, Text, Flex } from "primithemes";
import { Link } from "../../Link";
import { Image } from "../../Image";

const Main = styled(Card)`
  position: relative;
  overflow: hidden;
`;

const MainInner = styled(Flex)`
  ${props => props.theme.devices[2]} {
    flex-direction: row;
  }
`;

interface Props {
  logo?: any;
  title: React.ReactNode;
  phone?: React.ReactNode;
  email?: React.ReactNode;
  address?: React.ReactNode[];
  divisions: { to: string; label: string }[];
}

const Footer: React.SFC<Props> = ({
  divisions,
  logo,
  title,
  phone,
  email,
  address,
}) => (
  <Box is="footer">
    <Main
      bg="text.dark"
      color="white.light"
      py={4}
      px={3}
      bt={4}
      borderColor="secondary.main"
    >
      <MainInner
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        {logo && (
          <Flex style={{ opacity: 0.9 }} w={["120px"]}>
            <Image
              critical
              style={{ width: "100%", height: "100%" }}
              fluid={logo}
            />
          </Flex>
        )}
        <Flex justifyContent="center" flexDirection="column">
          <Text mb={3} color="primary.light" fontSize={3} fontWeight={5}>
            {title}
          </Text>
          {
            <Text
              lineHeight={2}
              color="white.main"
              fontSize={2}
              textAlign="center"
            >
              {phone}
            </Text>
          }
          {email && (
            <Text
              lineHeight={2}
              color="white.main"
              fontSize={2}
              textAlign="center"
            >
              {email}
            </Text>
          )}
        </Flex>
      </MainInner>
    </Main>
    <Flex flexWrap="wrap" justifyContent="center" w={1} bg="black.dark">
      {divisions.map(x => (
        <Box p={2}>
          <Link to={x.to} key={x.to}>
            <Box p={2}>
              <Text color="text.contrast">{x.label}</Text>
            </Box>
          </Link>
        </Box>
      ))}
    </Flex>
    <Flex bg="black.main" p={3} justifyContent="center">
      <Text color="grey.600" fontSize={1}>
        © 2018 Copyright:{" "}
        <Text as="span" color="primary.contrast">
          {title}
        </Text>
      </Text>
    </Flex>
  </Box>
);

export { Footer };
