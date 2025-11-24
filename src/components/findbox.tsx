import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"

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

  const renderAvatar = (name: string) => {
    if (name === "jack") {
      return (
        <StaticImage
          src="../images/image5.png"
          className="w-full h-full rounded-full object-cover"
          alt={name}
        />
      )
    }
    if (name === "alice") {
      return (
        <StaticImage
          src="../images/image7.png"
          className="w-full h-full rounded-full object-cover"
          alt={name}
        />
      )
    }
    if (name === "bob") {
      return (
        <StaticImage
          src="../images/image6.png"
          className="w-full h-full rounded-full object-cover"
          alt={name}
        />
      )
    }
    if (name === "carol") {
      return (
        <StaticImage
          src="../images/image8.png"
          className="w-full h-full rounded-full object-cover"
          alt={name}
        />
      )
    }
    if (name === "dave") {
      return (
        <StaticImage
          src="../images/image9.png"
          className="w-full h-full rounded-full object-cover"
          alt={name}
        />
      )
    }

    if (name === "eve") {
      return (
        <StaticImage
          src="../images/image10.png"
          className="w-full h-full rounded-full object-cover"
          alt={name}
        />
      )
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Find People</h2>
        <h2 className="text-sm font-semibold text-blue-500">Sea all</h2>
      </div>
      <div className="flex items-center gap-3 my-3 overflow-x-auto no-scrollbar">
        {people?.map(item => {
          return (
            <div
              key={item?.id}
              className="flex flex-col items-center border border-gray-200 rounded-md p-5 min-w-[130px] w-full
            "
            >
              <div className="w-13 h-13 rounded-full bg-linear-to-tr from-pink-500 to-yellow-500 p-px">
                <div className="w-full h-full rounded-full bg-white p-[3px]">
                  {renderAvatar(item?.name)}
                </div>
              </div>
              <p className="text-sm py-2 text-center">{item?.name}</p>
              <button className=" text-sm border border-gray-200 bg-blue-500 text-white rounded-md p-1 w-full">
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
