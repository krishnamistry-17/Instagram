import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Stories from "../components/stories"
import Content from "../components/content"
import Suggestions from "../components/suggestions"
import Friends from "../components/friends"
import BottomMenu from "../components/bottomMenu"

const IndexPage: React.FC = () => {
  return (
    <Layout>
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-b from-fuchsia-50 via-rose-50 to-amber-50"
        />
        <div className="max-w-6xl mx-auto sm:px-4 md:px-6 lg:px-8 sm:py-6 pb-20 ">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-8">
            <div className="flex flex-col gap-6">
              <Stories />
              <Content />
            </div>
            <aside className=" flex flex-col gap-6 ">
              <Suggestions />
              <Friends />
            </aside>
          </div>
          <div className="sm:hidden block">
            <BottomMenu />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const Head: HeadFC = () => <Seo title="Home" />

export default IndexPage
