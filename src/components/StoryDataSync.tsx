import * as React from "react"
import { supabase } from "../lib/supabse"
import { useStory } from "../context/storyContext"

const StoryDataSync: React.FC = () => {
  const { allStories } = useStory()

  const fetchProfileData = localStorage.getItem("profile_user")
  if (!fetchProfileData) return

  const profile = JSON.parse(fetchProfileData)

  const saveStories = React.useCallback(async () => {
    if (!Array.isArray(allStories) || allStories.length === 0) return

    try {
      const payload = allStories.map(story => ({
        user_id: story.user,
        created_at: new Date().toISOString(),
      }))

      const { data, error } = await supabase
        .from("stories")
        .insert(payload)
        .select()

      if (error) {
        console.error("Error inserting stories:", error)
        return
      }
    } catch (e) {
      console.error("Unexpected error while inserting stories", e)
    }
  }, [allStories])

  const saveProfileData = React.useCallback(async () => {
    if (!profile) return

    try {
      const normalizedUsername =
        typeof profile.username === "string"
          ? profile.username.replace(/^@/, "")
          : ""
      if (!normalizedUsername) {
        console.warn("Profile username missing; skip saving profile.")
        return
      }

      const insertPayload = {
        bio: profile.bio,
        username: normalizedUsername,
        name: profile.name,
        followers: profile.followers,
        following: profile.following,
        posts: profile.posts,
        created_at: new Date().toISOString(),
      }

      const updatePayload = {
        bio: profile.bio,
        name: profile.name,
        followers: profile.followers,
        following: profile.following,
        posts: profile.posts,
      }

      const orFilter = `username.eq.${normalizedUsername},name.eq.${profile.name}`
      const { data: existing, error: selectErr } = await supabase
        .from("profiles")
        .select("id,username,name")
        .or(orFilter)
        .limit(1)

      if (selectErr) {
        console.error("Failed to select existing profile:", selectErr)
        return
      }

      // if (Array.isArray(existing) && existing.length > 0) {
      //   const { error: updateErr } = await supabase
      //     .from("profiles")
      //     .update(updatePayload)
      //     .eq("id", existing[0].id)
      //   if (updateErr) {
      //     console.error("Error updating profile:", updateErr)
      //     return
      //   }
      // } else {
      //   const { error: insertErr } = await supabase
      //     .from("profiles")
      //     .insert([insertPayload])
      //   if (insertErr) {
      //     console.error("Error inserting profile:", insertErr)
      //     return
      //   }
      // }
    } catch (e) {
      console.error("Unexpected error while inserting profile", e)
    }
  }, [profile])

  React.useEffect(() => {
    saveStories()
    saveProfileData()
  }, [saveStories, saveProfileData])

  return null
}

export default StoryDataSync
