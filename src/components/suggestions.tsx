import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"
import ProfileButton from "./profilebutton"

const Suggestions: React.FC = () => {
  const suggestions = React.useMemo(
    () => [
      { id: 1, name: "alice", detail: "Followed by alice" },
      { id: 2, name: "carol", detail: "New to Instagram" },
      { id: 3, name: "bob", detail: "Followed by bob" },
      { id: 4, name: "carol", detail: "Suggested for you" },
      { id: 5, name: "dave", detail: "Suggested for you" },
      { id: 6, name: "eve", detail: "Suggested for you" },
    ],
    []
  )

  return (
    <section className="sticky top-2">
      <div>
        <div className="px-4 py-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-500">
            Suggestions for you
          </p>
          <button className="text-sm font-semibold">See all</button>
        </div>
        <ul className="px-2 py-1">
          {suggestions.map(s => (
            <div
              key={s.id}
              className="px-2 py-2 flex items-center justify-between hover:bg-gray-50 rounded"
            >
              <div className="flex items-center gap-3">
                <ProfileButton name={s.name} />

                <div className="leading-tight">
                  <p className="text-sm font-semibold">{s.name}</p>
                  <p className="text-xs text-gray-500">{s.detail}</p>
                </div>
              </div>
              <button className="text-xs font-semibold text-blue-500">
                Follow
              </button>
            </div>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Suggestions
