import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Stories from "../components/stories"
import Content from "../components/content"
import Suggestions from "../components/suggestions"

const IndexPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto sm:px-4 md:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-8">
          <div className="flex flex-col gap-6">
            <Stories />
            <Content />
          </div>
          <aside>
            <Suggestions />
          </aside>
        </div>
      </div>
    </Layout>
  )
}

export const Head: HeadFC = () => <Seo title="Home" />

export default IndexPage
