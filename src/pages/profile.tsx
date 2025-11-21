import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import * as React from "react"
import { FaUserPlus } from "react-icons/fa"
import FindPeopleBox from "../components/findbox"
import Posts from "../components/posts"

const ProfilePage: React.FC = () => {
  const [user, setUser] = React.useState({
    name: "John Doe",
    username: "@johndoe",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    profilePicture: "../images/image.png",
    coverPicture: "../images/image.png",
    followers: 100,
    following: 100,
    posts: 10,
  })

  return (
    <Layout>
      <div className=" max-w-xl mx-auto">
        <div className="flex items-center gap-8 px-2">
          <div className="flex flex-col items-center justify-center pt-4">
            <div className="w-13 h-13 rounded-full bg-linear-to-tr from-pink-500 to-yellow-500 p-px">
              <div className="w-full h-full rounded-full bg-white p-[3px]">
                <StaticImage
                  src="../images/image.png"
                  className="w-11 h-11 rounded-full object-cover"
                  alt="suggestion 1"
                />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center py-2">
              <p className="sm:text-2xl text-md font-bold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.username}</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 ">
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
        <div className="flex flex-col ">
          <p className="text-sm text-gray-500 px-2">{user.bio}</p>
          <div className="flex items-center gap-2 my-3 mx-2">
            <button
              className="text-sm md:max-w-sm max-w-xs w-full 
              px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-100"
            >
              Edit Profile
            </button>
            <button>
              <FaUserPlus className="w-4 h-4" />
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
