import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import "./layout.css"
import { ToastContainer } from "react-toastify"

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
      <Header />
      <div>
        <ToastContainer />
        <main>{children}</main>
        {/* <footer>
          © {new Date().getFullYear()} &middot; Built with{" "}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer> */}
      </div>
    </>
  )
}

export default Layout
