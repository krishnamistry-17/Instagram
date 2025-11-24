import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage: React.FC = () => (
  <Layout>
    <div className="py-16 flex items-center justify-center">
      <div className="bg-white border border-gray-200 rounded-md md:rounded-xl shadow-sm px-6 py-8 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          404 - Page not found
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          The page you’re looking for doesn’t exist.
        </p>
        <a
          href="/"
          className="inline-block mt-4 px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
        >
          Go back home
        </a>
      </div>
    </div>
  </Layout>
)

export const Head: HeadFC = () => <Seo title="404: Not Found" />

export default NotFoundPage
