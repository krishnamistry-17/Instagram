import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage: React.FC = () => (
  <Layout>
    <div className="py-16">
      <h1 className="text-2xl font-semibold text-red-700">404: Not Found</h1>
     
    </div>
  </Layout>
)

export const Head: HeadFC = () => <Seo title="404: Not Found" />

export default NotFoundPage
