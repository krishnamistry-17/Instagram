/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

type SiteTitleQuery = {
  site: {
    siteMetadata?: {
      title?: string | null
    } | null
  } | null
}

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const data = useStaticQuery<SiteTitleQuery>(graphql`
    query SiteTitleQueryTS {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const siteTitle = data.site?.siteMetadata?.title ?? "Title"

  return (
    <>
      <Header siteTitle={siteTitle} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: `var(--size-content)`,
          padding: `var(--size-gutter)`,
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `var(--space-5)`,
            fontSize: `var(--font-sm)`,
          }}
        >
          © {new Date().getFullYear()} &middot; Built with{" "}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

export default Layout
