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
    }
  `).then((result: any) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allPlasticsCategoriesYamlX.edges
      .filter(({ node }: any) => node.fields.slug)
      .forEach(({ node }: any) => {
        createPage({
          path: `${node.fields.slug}`,
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
