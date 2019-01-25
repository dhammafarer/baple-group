import path from "path";
import { GatsbyCreatePages } from "./types";

export const createPages: GatsbyCreatePages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allPlasticsCategoriesYamlX {
        edges {
          node {
            fields {
              slug
            }
            title
          }
        }
      }
      settingsYamlX(fields: { slug: { eq: "/plastics" } }) {
        fields {
          slug
        }
      }
    }
  `).then((result: any) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const plasticsPath = result.data.settingsYamlX.fields.slug;
    result.data.allPlasticsCategoriesYamlX.edges
      .filter(({ node }: any) => node.fields.slug)
      .forEach(({ node }: any) => {
        createPage({
          path: `${plasticsPath}${node.fields.slug}`,
          component: path.resolve(`src/templates/plasticsCategoryTemplate.tsx`),
          context: {
            slug: node.fields.slug,
            title: node.title,
          },
        });
      });
    return result;
  });
};
