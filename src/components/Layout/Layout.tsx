import * as React from "react";
import { graphql } from "gatsby";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import { styled, Flex } from "primithemes";
import { createGlobalStyle } from "styled-components";

import { Normalize } from "styled-normalize";
import { Head } from "./Head";
import { Header } from "./Header";
import { Footer } from "./Footer";

const GlobalStyle = createGlobalStyle`
  body {
    overflow-y: scroll;
    width: 100%;
    height: 100%;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Root = styled.div`
  position: relative;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

const Content = styled(Flex)`
  flex-direction: column;
  overflow-x: hidden;
  min-height: 100vh;
`;

const Main = styled(Flex)`
  width: 100%;
  margin: 0 auto;
  flex-grow: 1;
  flex-direction: column;
`;

interface Props {
  logo: any;
  title: string;
  email: string;
  phone: string;
  navItems: any[];
}

export const Layout: React.SFC<Props> = ({
  children,
  title,
  logo,
  email,
  phone,
  navItems,
}) => (
  <ThemeProvider theme={theme}>
    <Root>
      <Normalize />
      <GlobalStyle />
      <Head title={title} />
      <Content bg="background.main">
        <Header title={title} navItems={navItems} logo={logo} />
        <Main>{children}</Main>
        <Footer email={email} phone={phone} title={title} />
      </Content>
    </Root>
  </ThemeProvider>
);

export const query = graphql`
  fragment LayoutFragment on SettingsYamlX {
    title
    phone
    email
    logo {
      childImageSharp {
        fixed(width: 100, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
