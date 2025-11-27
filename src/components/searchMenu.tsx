import * as React from "react"
import { IoSearch } from "react-icons/io5"
import { RxCross2 } from "react-icons/rx"
import { storiesData, renderAvatar } from "./storiesData"

type Props = {
  isOpen: boolean
    onClose: () => void
  }

  const SearchMenu: React.FC<Props> = ({ isOpen, onClose }) => {
  const [query, setQuery] = React.useState("")
  const [recent, setRecent] = React.useState<string[]>([])

  React.useEffect(() => {
    if (!isOpen) return
    const raw =
      typeof window !== "undefined" && localStorage.getItem("recent_searches")
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as string[]
        if (Array.isArray(parsed)) setRecent(parsed.slice(0, 10))
      } catch {}
    }
  }, [isOpen])

  const users = React.useMemo(
    () =>
      [...new Set(storiesData.map(s => s.user))].map(name => ({
        name,
      })),
    []
  )

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return users
    return users.filter(u => u.name.toLowerCase().includes(q))
  }, [users, query])

  const addRecent = (name: string) => {
    setRecent(prev => {
      const next = [name, ...prev.filter(r => r !== name)].slice(0, 10)
      if (typeof window !== "undefined") {
        localStorage.setItem("recent_searches", JSON.stringify(next))
      }
      return next
    })
  }

  React.useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-999 bg-black/40"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-y-0 right-0 w-full sm:w-[420px] bg-white shadow-xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 p-3 border-b">
          <div className="flex items-center gap-2 flex-1 rounded-full bg-gray-100 px-3 py-2">
            <IoSearch className="w-4 h-4 text-gray-500" />
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
          <button
            className="p-2 rounded hover:bg-gray-100"
            aria-label="Close search"
            onClick={onClose}
          >
            <RxCross2 className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          {!query && recent.length > 0 && (
            <>
              <p className="text-xs font-semibold text-gray-500 px-3 pt-3 pb-1">
                Recent
              </p>
              <ul className="px-1">
                {recent.map(name => (
                  <li
                    key={name}
                    className="flex items-center gap-2 px-2 py-2 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      addRecent(name)
                      setQuery(name)
                    }}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      {renderAvatar(name)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{name}</p>
                      <p className="text-xs text-gray-500">Account</p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          <p className="text-xs font-semibold text-gray-500 px-3 pt-3 pb-1">
            {query ? "Results" : "Suggested"}
          </p>
          {results.length === 0 && (
            <p className="text-xs font-semibold text-gray-500 px-3 pt-3 pb-1 text-center">
              No result found
            </p>
          )}
          <ul className="px-1 pb-6">
            {results.map(({ name }) => (
              <li
                key={name}
                className="flex items-center gap-2 px-2 py-2 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  addRecent(name)
                }}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  {renderAvatar(name)}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{name}</p>
                  <p className="text-xs text-gray-500">Account</p>
                </div>
                <button
                  className="text-xs px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200"
                  onClick={e => {
                    e.stopPropagation()
                    addRecent(name)
                  }}
                >
                  Follow
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
export default SearchMenu
