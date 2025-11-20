import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"

const Suggestions: React.FC = () => {
  const suggestions = React.useMemo(
    () => [
      { id: 1, name: "Lisa", detail: "Followed by alice" },
      { id: 2, name: "Code", detail: "New to Instagram" },
      { id: 3, name: "erin", detail: "Followed by bob" },
      { id: 4, name: "frank", detail: "Suggested for you" },
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
                <div className="w-10 h-10 rounded-full bg-linear-to-tr from-pink-500 to-yellow-500 p-[2px]">
                  <div className="w-full h-full rounded-full bg-white p-[3px]">
                    <StaticImage
                      src="../images/image.png"
                      className="w-8 h-8 rounded-full object-cover"
                      alt="suggestion 1"
                    />
                  </div>
                </div>

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
