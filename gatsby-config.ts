//gatsby-config.ts
export default {
  siteMetadata: {
    //define the site metadata
    title: "Instagram",
    description: "A simple Gatsby site",
    author: "John Doe",
  },
  plugins: [
    "gatsby-plugin-typescript", //ts support
    "gatsby-plugin-image", //image support
    "gatsby-plugin-sharp", //image optimization
    "gatsby-transformer-sharp", //image transformation
    "gatsby-plugin-postcss", //tailwind/postcss
    {
      resolve: "gatsby-plugin-mdx", //mdx support
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images", //image support in markdown/mdx
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
  ],
}
