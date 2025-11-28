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
            resolve: "gatsby-remark-images", //image support in mdx
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },

    {
      resolve: "gatsby-source-supabase",
      options: {
        supabaseUrl: process.env.GATSBY_SUPABASE_URL,
        supabaseKey: process.env.GATSBY_SUPABASE_ANON_KEY,
        types: [
          {
            type: "Story",
            query: (client: any) =>
              client.from("stories").select(`id,created_at,user_id`),
          },
        ],
      },
    },
  ],
}
