const siteMetadata = require("./siteMetadata");

module.exports = {
  siteMetadata,
  //pathPrefix: "connet",
  plugins: [
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-favicon",
      options: {
        logo: "./src/images/logos/logo-square.jpg",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "controlnet-international",
        short_name: "ctn",
        start_url: "/",
        background_color: "#336699",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "./src/images/logos/logo.png", // This path is relative to the root of the site.
      },
    },
    "gatsby-plugin-offline",
    {
      resolve: `gatsby-plugin-polyfill-io`,
      options: {
        features: [
          "Number.isInteger",
          "Object.entries",
          "Set",
          "String.prototype.startsWith",
          "Array.prototype.findIndex",
          "Array.prototype.includes",
        ],
      },
    },
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/images/`,
        name: "images",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/assets/`,
        name: "assets",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/data/content`,
        name: "content",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/data/products`,
        name: "products",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/data/productCategories`,
        name: "productCategories",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/data/settings`,
        name: "settings",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-root-import",
    "gatsby-transformer-sharp",
    "gatsby-transformer-yaml",
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          "gatsby-remark-relative-images",
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1400,
            },
          },
        ],
      },
    },
  ],
};
