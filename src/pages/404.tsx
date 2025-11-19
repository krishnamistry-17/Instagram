import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage: React.FC = () => (
  <Layout>
    <div className="py-16">
      <h1 className="text-2xl font-semibold">404: Not Found</h1>
      <p className="mt-2 text-gray-600">
        You just hit a route that doesn&apos;t exist... the sadness.
      </p>
    </div>
  </Layout>
)

export const Head: HeadFC = () => <Seo title="404: Not Found" />

export default NotFoundPage
