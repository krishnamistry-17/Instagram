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
    { id: 1, name: "John Doe", profilePicture: "../images/image.png" },
    { id: 2, name: "Jane Doe", profilePicture: "../images/image.png" },
    { id: 3, name: "Jim Doe", profilePicture: "../images/image.png" },
    { id: 4, name: "Jill Doe", profilePicture: "../images/image.png" },
    // { id: 5, name: "Jack Doe", profilePicture: "../images/image.png" },
    // { id: 6, name: "Jill Doe", profilePicture: "../images/image.png" },
    // { id: 7, name: "Jack Doe", profilePicture: "../images/image.png" },
    // { id: 8, name: "Jill Doe", profilePicture: "../images/image.png" },
  ])
  return (
    <div className="bg-white border border-gray-200 rounded-md p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Find People</h2>
        <h2 className="text-sm font-semibold text-blue-500">Sea all</h2>
      </div>
      <div className="flex items-center gap-3 my-3 overflow-x-auto no-scrollbar">
        {people?.map(item => (
          <div
            key={item?.id}
            className="flex flex-col items-center border border-gray-200 rounded-md p-5 min-w-[130px] w-full
            "
          >
            <div className="w-13 h-13 rounded-full bg-linear-to-tr from-pink-500 to-yellow-500 p-px">
              <div className="w-full h-full rounded-full bg-white p-[3px]">
                <StaticImage
                  src={"../images/image.png"}
                  className="w-11 h-11 rounded-full object-cover"
                  alt={item?.name}
                />
              </div>
            </div>
            <p className="text-sm py-2 text-center">{item?.name}</p>
            <button className=" text-sm border border-gray-200 bg-blue-500 text-white rounded-md p-1 w-full">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
export default FindPeopleBox
