import * as React from "react"
import { Link } from "gatsby"

type HeaderProps = {
  siteTitle?: string
}

const Header: React.FC<HeaderProps> = ({ siteTitle = "Title" }) => {
  return (
    <header className="bg-gray-900 text-white">
      <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">
          <Link to="/" className="text-white no-underline hover:opacity-80">
            {siteTitle}
          </Link>
        </h1>
      </div>
    </header>
  )
}

export default Header
