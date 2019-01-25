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

interface DivisionNode {
  node: {
    title: string;
    fields: {
      slug: string;
    };
  };
}

interface LayoutData {
  settings: {
    title: string;
    phone: string;
    email: string;
    logo: any;
    nav: { to: string; label: string }[];
    fields: {
      slug: string;
    };
  };
  divisions: {
    edges: DivisionNode[];
  };
}

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
  data: LayoutData;
}

export const Layout: React.SFC<Props> = ({
  children,
  data: { settings, divisions },
}) => (
  <ThemeProvider theme={theme}>
    <Root>
      <Normalize />
      <GlobalStyle />
      <Head title={settings.title} />
      <Content bg="background.main">
        <Header
          home={settings.fields.slug}
          title={settings.title}
          navItems={settings.nav}
          logo={settings.logo}
        />
        <Main>{children}</Main>
        <Footer
          divisions={divisions.edges.map(({ node }) => ({
            to: node.fields.slug,
            label: node.title,
          }))}
          email={settings.email}
          phone={settings.phone}
          title={settings.title}
        />
      </Content>
    </Root>
  </ThemeProvider>
);

export const query = graphql`
  fragment LayoutSettingsFragment on SettingsYamlX {
    fields {
      slug
    }
    title
    nav {
      to
      label
    }
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

  fragment LayoutDivisionsFragment on SettingsYamlX {
    fields {
      slug
    }
    title
  }
`;

export { LayoutData };
