import { contains } from "ramda";
import {
  processStringProperties,
  replaceAssetPath,
  replaceAssetPaths,
} from "./helpers";
import { GatsbyOnCreateNode } from "./types";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

const { createFilePath } = require("gatsby-source-filesystem");

export const onCreateNode: GatsbyOnCreateNode = ({
  node,
  getNode,
  createNodeId,
  createContentDigest,
  actions,
}) => {
  const { createNode, createNodeField, createParentChildLink } = actions;

  if (node.internal.owner === "gatsby-transformer-remark") {
    node.frontmatter = replaceAssetPaths(
      node.frontmatter,
      node.fileAbsolutePath
    );
  }

  // Create Content nodes
  if (node.internal.owner === "gatsby-transformer-yaml") {
    const { id, parent, children, internal, ...nodeContent } = Object.assign(
      {},
      node
    );

    const fn = (v: string, k: string) => {
      return k === "markdown" ? md.render(v) : v;
    };

    const { absolutePath, name } = getNode(parent);
    const [division, pageName] = name.split(".");

    const content = Object.assign(
      processStringProperties(
        [fn, replaceAssetPath(absolutePath)],
        nodeContent
      ),
      { pageName, division }
    );

    const nodeMeta = {
      id: createNodeId(`${node.id}-content`),
      parent: node.parent,
      children: [],
      internal: {
        type: node.internal.type + "X",
        content: JSON.stringify(content),
        contentDigest: createContentDigest(content),
      },
    };
    const contentNode = Object.assign({}, content, nodeMeta);
    createNode(contentNode);
    createParentChildLink({ parent: node, child: contentNode });
  }

  // prepare pages from markdown
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: "src/data" });
    const instanceName = getNode(node.parent).sourceInstanceName;
    createNodeField({ node, name: "type", value: instanceName });

    if (contains(instanceName, ["services"])) {
      createNodeField({ node, name: "slug", value: `/${instanceName}${slug}` });
      createNodeField({
        node,
        name: "template",
        value: node.frontmatter.template || `/${instanceName}Template.tsx`,
      });
    }
  }

  if (node.internal.type.match(/YamlX$/)) {
    const { sourceInstanceName, name } = getNode(node.parent);

    if (contains(sourceInstanceName, ["content", "settings"])) {
      const pageName = name
        .split(".")
        .map((s: string) => (s === "index" ? "" : s))
        .join("/");
      const slug = `/${pageName}`;
      createNodeField({ node, name: "slug", value: slug });
    }

    if (sourceInstanceName === "productCategories") {
      const slug = `${node.path}`;
      createNodeField({ node, name: "slug", value: slug });
    }

    if (sourceInstanceName === "products") {
      const slug = `/${node.category}/${name}`;
      createNodeField({ node, name: "slug", value: slug });
    }
  }
};
