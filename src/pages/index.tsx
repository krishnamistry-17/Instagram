import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage: React.FC = () => {
  return (
    <Layout>
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold tracking-tight text-red-500">
          Welcome to Gatsby + Tailwind
        </h1>
        <p className="mt-4 text-gray-600">
          Edit <code>src/pages/index.tsx</code> to get started.
        </p>
        <div className="mt-8">
          <a
            className="inline-block rounded-md bg-gray-900 text-white px-5 py-2 hover:opacity-90"
            href="https://www.gatsbyjs.com/docs/"
          >
            Gatsby Docs
          </a>
        </div>
      </section>
    </Layout>
  )
}

export const Head: HeadFC = () => <Seo title="Home" />

export default IndexPage
