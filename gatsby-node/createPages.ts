import path from "path";
import { GatsbyCreatePages } from "./types";

export const createPages: GatsbyCreatePages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      plasticCategories: allPlasticsCategoriesYamlX {
        edges {
          node {
            fields {
              slug
            }
            title
          }
        }
      }
      metalCategories: allMetalPackagingCategoriesYamlX {
        edges {
          node {
            fields {
              slug
            }
            title
          }
        }
      }
      plasticsSettings: settingsYamlX(fields: { slug: { eq: "/plastics" } }) {
        fields {
          slug
        }
      }
      metalSettings: settingsYamlX(
        fields: { slug: { eq: "/metal-packaging" } }
      ) {
        fields {
          slug
        }
      }
    }
  `)
    .then((result: any) => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }

      const plasticsPath = result.data.plasticsSettings.fields.slug;
      result.data.plasticCategories.edges
        .filter(({ node }: any) => node.fields.slug)
        .forEach(({ node }: any) => {
          createPage({
            path: `${plasticsPath}${node.fields.slug}`,
            component: path.resolve(
              `src/templates/plasticsCategoryTemplate.tsx`
            ),
            context: {
              slug: node.fields.slug,
              title: node.title,
            },
          });
        });
      return result;
    })
    .then((result: any) => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }

      const metalPath = result.data.metalSettings.fields.slug;
      result.data.metalCategories.edges
        .filter(({ node }: any) => node.fields.slug)
        .forEach(({ node }: any) => {
          createPage({
            path: `${metalPath}${node.fields.slug}`,
            component: path.resolve(`src/templates/metalCategoryTemplate.tsx`),
            context: {
              slug: node.fields.slug,
              title: node.title,
            },
          });
        });
      return result;
    });
};
