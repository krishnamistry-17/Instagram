import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"
import ProfileButton from "./profilebutton"

const FindPeopleBox: React.FC = () => {
  const [people, setPeople] = React.useState<
    {
      id: number
      name: string
      profilePicture: string
    }[]
  >([
    { id: 1, name: "alice", profilePicture: "../images/image5.png" },
    { id: 2, name: "bob", profilePicture: "../images/image6.png" },
    { id: 3, name: "carol", profilePicture: "../images/image7.png" },
    { id: 4, name: "dave", profilePicture: "../images/image8.png" },
    { id: 5, name: "eve", profilePicture: "../images/image9.png" },
    { id: 6, name: "jack", profilePicture: "../images/image10.png" },
  ])

  return (
    <div className="bg-white border border-gray-200 rounded-md md:rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Find People</h2>
        <h2 className="text-sm font-semibold text-blue-600 hover:underline">See all</h2>
      </div>
      <div className="flex items-center gap-3 my-3 overflow-x-auto no-scrollbar">
        {people?.map(item => {
          return (
            <div
              key={item?.id}
              className="flex flex-col items-center border border-gray-200 rounded-md p-5 min-w-[130px] w-full hover:shadow-sm transition-shadow
            "
            >
              <ProfileButton name={item?.name} size="lg" />
              <p className="text-sm py-2 text-center">{item?.name}</p>
              <button className=" text-sm border border-transparent bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-1 w-full">
                Follow
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default FindPeopleBox
