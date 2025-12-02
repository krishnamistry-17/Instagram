import * as React from "react"
import { supabase } from "../lib/supabse"

type DbStory = {
  id?: string
  file_path?: string | null
  url?: string | null
  created_at?: string | null
  expires_at?: string | null
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000

function isExpired(story: DbStory, now = Date.now()): boolean {
  const expiresAt = story.expires_at
    ? new Date(story.expires_at).getTime()
    : story.created_at
    ? new Date(story.created_at).getTime() + ONE_DAY_MS
    : 0
  return expiresAt > 0 && now >= expiresAt
}

function dayLabel(expiresAtMs: number, now = Date.now()): string {
  const midnight = (ms: number) => {
    const d = new Date(ms)
    d.setHours(0, 0, 0, 0)
    return d.getTime()
  }
  const today0 = midnight(now)
  const yest0 = today0 - ONE_DAY_MS
  const exp0 = midnight(expiresAtMs)
  if (exp0 === today0) return "Today"
  if (exp0 === yest0) return "Yesterday"
  const diffDays = Math.round((exp0 - today0) / ONE_DAY_MS)
  if (diffDays > 0) return `In ${diffDays} day${diffDays === 1 ? "" : "s"}`
  return `${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? "" : "s"} ago`
}

export const StoryExpiry: React.FC = () => {
  const [active, setActive] = React.useState<DbStory[]>([])
  const [archive, setArchive] = React.useState<DbStory[]>([])
  console.log("archive", archive)
  console.log("active", active)
  const [loading, setLoading] = React.useState(false)

  const load = React.useCallback(async () => {
    setLoading(true)
    const since = new Date(Date.now() - ONE_DAY_MS).toISOString()

    const { data, error } = await supabase
      .from<DbStory>("stories" as any)
      .select("id,file_path,url,created_at,expires_at")
      .gt("created_at", since)
      .order("created_at", { ascending: false })

    const { data: oldData } = await supabase
      .from<DbStory>("stories" as any)
      .select("id,file_path,url,created_at,expires_at")
      .lt("created_at", since)
      .order("created_at", { ascending: false })

    if (error) {
      setLoading(false)
      return
    }
    const now = Date.now()
    const all: DbStory[] = [...(data || []), ...(oldData || [])]
    const activeStories: DbStory[] = []
    const expiredStories: DbStory[] = []
    for (const s of all) {
      if (isExpired(s, now)) expiredStories.push(s)
      else activeStories.push(s)
    }
    console.log("activeStories", activeStories)
    console.log("expiredStories", expiredStories)
    setActive(activeStories)
    setArchive(expiredStories)
    setLoading(false)
  }, [])

  React.useEffect(() => {
    load()
  }, [load])

  const renderItem = (s: DbStory) => {
    const expMs = s.expires_at
      ? new Date(s.expires_at).getTime()
      : s.created_at
      ? new Date(s.created_at).getTime() + ONE_DAY_MS
      : 0
    const label = expMs ? dayLabel(expMs) : ""
    return (
      <li
        key={s.id || `${s.file_path}-${s.created_at}`}
        className="flex items-center gap-3 py-2"
      >
        <div className="w-10 h-10 rounded overflow-hidden bg-gray-100 shrink-0">
          {s.url ? (
            <img src={s.url} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full" />
          )}
        </div>
        <div className="text-sm">
          <p className="font-medium">{s.file_path || "Story"}</p>
          {label && <p className="text-xs text-gray-500">Expires: {label}</p>}
        </div>
      </li>
    )
  }

  return (
    <section className="mt-4">
      <h3 className="text-sm font-semibold mb-2">Active stories</h3>
      {loading && <p className="text-xs text-gray-500">Loading…</p>}
      {!loading && <ul className="divide-y">{active.map(renderItem)}</ul>}
      <h3 className="text-sm font-semibold mt-4 mb-2">Archive</h3>
      <p>Today's Stories:</p>
      <ul className="divide-y">{archive.map(renderItem)}</ul>
    </section>
  )
}

export default StoryExpiry
