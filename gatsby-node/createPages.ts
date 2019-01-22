import path from "path";
import { GatsbyCreatePages } from "./types";
import languages from "../src/i18n/locales/languages";

export const createPages: GatsbyCreatePages = ({ actions, graphql }) => {
  const { createPage } = actions;

  ["/", "/about", "/services", "/contact"].map(pagePath => {
    const redirect = path.resolve("src/i18n/redirect.tsx");

    const redirectPage = {
      path: pagePath,
      component: redirect,
      context: {
        languages,
        locale: "",
        routed: false,
        redirectPage: pagePath,
      },
    };
    createPage(redirectPage);
  });

  return graphql(`
    {
      allContent {
        edges {
          node {
            lang
            fields {
              slug
              template
            }
          }
        }
      }
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            fields {
              type
              template
              slug
            }
            frontmatter {
              lang
            }
          }
        }
      }
    }
  `)
    .then((result: any) => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }

      result.data.allMarkdownRemark.edges
        .filter(({ node }: any) => node.fields.slug)
        .forEach(({ node }: any) => {
          createPage({
            path: `/${node.frontmatter.lang}${node.fields.slug}`,
            component: path.resolve(`src/templates/${node.fields.template}`),
            context: {
              languages,
              locale: node.frontmatter.lang,
              slug: node.fields.slug,
            },
          });
        });
      return result;
    })
    .then((result: any) => {
      result.data.allContent.edges.forEach(({ node }: any) => {
        createPage({
          path: `/${node.lang}${node.fields.slug}`,
          component: path.resolve(`src/templates/${node.fields.template}`),
          context: {
            languages,
            locale: node.lang,
            slug: node.fields.slug,
          },
        });
      });
      return result;
    });
};
