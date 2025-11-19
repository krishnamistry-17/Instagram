/**
 * SEO component that queries site metadata
 */
import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

type SeoProps = {
  title: string
  description?: string
  children?: React.ReactNode
}

type SiteQuery = {
  site: {
    siteMetadata?: {
      title?: string | null
      description?: string | null
      author?: string | null
    } | null
  } | null
}

function Seo({ description, title, children }: SeoProps) {
  const { site } = useStaticQuery<SiteQuery>(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `)

  const metaDescription = description || site?.siteMetadata?.description || ""
  const defaultTitle = site?.siteMetadata?.title || ""

  return (
    <>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site?.siteMetadata?.author || ``} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </>
  )
}

export default Seo
