import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import * as React from "react"
import FindPeopleBox from "../components/findbox"
import Posts from "../components/posts"
import ProfileButton from "../components/profilebutton"
import { StoryDef } from "../components/storiesData"

const ProfilePage: React.FC = () => {
  const [user, setUser] = React.useState({
    name: "alice",
    username: "@alice",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    followers: 100,
    following: 100,
    posts: 10,
  })

  const handleProfile = () => {
    const storyData = localStorage.getItem("stories") as string
    if (!storyData) return
    const storyDataParsed = JSON.parse(storyData) as StoryDef[]
    console.log("storyDataParsed", storyDataParsed)
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-6 px-2">
          <div className="flex flex-col items-center justify-center pt-4">
            <div onClick={handleProfile}>
              <ProfileButton name="alice" size="lg" />
            </div>
            <div className="flex flex-col items-center justify-center pb-2">
              <p className="sm:text-2xl text-lg font-bold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.username}</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 ">
            <div className="flex flex-col gap-2 items-center">
              <p className="text-md font-semibold">{user.posts}</p>
              <p className="text-xs  font-semibold">Posts</p>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <p className="text-md font-semibold">{user.followers}</p>
              <p className="text-xs  font-semibold">Followers</p>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <p className="text-md font-semibold">{user.following}</p>
              <p className="text-xs  font-semibold">Following</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className=" rounded-md  shadow-sm p-3 mx-2">
            <p className="text-sm text-gray-600">{user.bio}</p>
          </div>
          <div className="flex items-center gap-2 my-3 mx-2">
            <button
              className="text-sm md:max-w-sm max-w-xs w-full 
              px-3 py-1.5 rounded-md border border-gray-200 hover:bg-gray-100"
            >
              Edit Profile
            </button>
            <button
              className="text-sm md:max-w-sm max-w-xs w-full 
              px-3 py-1.5 rounded-md border border-gray-200 hover:bg-gray-100"
            >
              Share Profile
            </button>
          </div>
          <div className="my-3 mx-1">
            <FindPeopleBox />
          </div>
          <div className="my-3 mx-1">
            <Posts />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProfilePage
