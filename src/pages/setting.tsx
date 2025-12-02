import { navigate } from "gatsby"
import Layout from "../components/layout"
import * as React from "react"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import { FaUser } from "react-icons/fa"
import { FaLock } from "react-icons/fa"
import { FaEye } from "react-icons/fa"
import { FaBell } from "react-icons/fa"
import { FaQuestion } from "react-icons/fa"
import { FaInfoCircle } from "react-icons/fa"
import { FaSignOutAlt } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import { MdDarkMode } from "react-icons/md"
import { MdArchive } from "react-icons/md"

const SettingPage: React.FC = () => {
  const handleNavigate = (id: number) => {
    if (id === 7) {
      setLogoutModal(true)
    } else if (id === 9) {
      navigate("/archive")
    }
  }
  const details = [
    //display here icon without tag
    { id: 3, label: "Privacy", icon: FaEye },
    { id: 2, label: "Security", icon: FaLock },
    { id: 4, label: "Notifications", icon: FaBell },
    { id: 9, label: "Archive", icon: MdArchive },
    { id: 8, label: "Theme", icon: MdDarkMode },
    { id: 5, label: "Help", icon: FaQuestion },
    { id: 1, label: "Account", icon: FaUser },
    { id: 6, label: "About", icon: FaInfoCircle },
    { id: 7, label: "Logout", icon: FaSignOutAlt },
  ]
  const [logoutModal, setLogoutModal] = React.useState(false)
  return (
    <Layout>
      <div className="max-w-xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6">
        <div className="flex flex-col px-2 sm:gap-6 border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("/")}>
              <FaAngleLeft className="w-4 h-4" />
            </button>
            <h1 className="sm:text-xl text-md font-semibold text-center w-full">
              Settings
            </h1>
          </div>
        </div>
        <div className="flex flex-col gap-4 my-3">
          <div className="bg-white border border-gray-200 rounded-md md:rounded-xl shadow-sm p-3">
            <input
              type="search"
              placeholder="Search settings"
              className="w-full sm:max-w-sm border border-gray-200 rounded-md p-2 bg-gray-100"
            />
          </div>
          <div className="bg-white border border-gray-200 rounded-md md:rounded-xl shadow-sm">
            <ul className="divide-y divide-gray-100">
              {details.map(item => (
                <li key={item.id} className="px-2">
                  <button
                    className="w-full flex items-center gap-2 hover:bg-gray-50 rounded-md p-3 text-left"
                    onClick={() => handleNavigate(item?.id)}
                  >
                    {/*display here item with tag */}
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                    <FaAngleRight className="w-5 h-5 text-gray-300 ml-auto" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {logoutModal && (
            <div className=" fixed inset-0 bg-black/20 z-50 ">
              <div
                className="max-w-[400px] w-full h-fit bg-white rounded-md p-4 shadow-xs absolute 
                bottom-0 mx-auto
                sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Logout</h2>
                  <button
                    className="text-gray-700"
                    onClick={() => setLogoutModal(false)}
                  >
                    <IoClose className="w-6 h-6 " />
                  </button>
                </div>

                <p className="text-sm text-gray-500">
                  Are you sure you want to logout?
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <button className="w-full bg-red-500 text-white px-4 py-2 rounded-md">
                    Logout
                  </button>
                  <button
                    className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
                    onClick={() => setLogoutModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default SettingPage
