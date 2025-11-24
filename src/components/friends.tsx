import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"
import ProfileButton from "./profilebutton"

const Friends: React.FC = () => {
  const friends = React.useMemo(
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
    <section className="">
      <div className="bg-white border border-gray-200 rounded-md md:rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-transparent bg-clip-text bg-linear-to-r from-fuchsia-600 to-amber-600">
            Your Friends
          </p>
          <button className="text-xs font-semibold text-blue-600 hover:underline">
            See all
          </button>
        </div>
        <ul className="px-2 py-1 divide-y divide-gray-100">
          {friends.map(s => (
            <li key={s.id} className="first:pt-0 last:pb-0">
              <div className="px-2 py-2 flex items-center justify-between hover:bg-gray-50 rounded-md">
                <div className="flex items-center gap-3">
                  <ProfileButton name={s.name} />
                  <div className="leading-tight">
                    <p className="text-sm font-semibold">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.detail}</p>
                  </div>
                </div>
                <button className="text-xs font-semibold rounded-full px-3 py-1 bg-linear-to-r from-fuchsia-600 to-amber-500 text-white hover:opacity-90 shadow-sm">
                  Follow
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Friends
