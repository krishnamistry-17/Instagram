import {
  FaBellSlash,
  FaCopy,
  FaEyeSlash,
  FaFlag,
  FaShare,
  FaTrash,
  FaUserMinus,
} from "react-icons/fa"
import * as React from "react"
import { IoChatbubbleOutline } from "react-icons/io5"

export type MenuItemsProps = {
  item: { id: number; userName: string }
  isCommentsOff?: boolean
  onCopyLink: () => void
  onShare: () => void
  onHidePost: () => void
  onMuteUser: () => void
  onUnfollowUser: () => void
  onToggleComments: () => void
  onReport: () => void
  onClose?: () => void
}

export const MenuItems: React.FC<MenuItemsProps> = ({
  item,
  isCommentsOff = false,
  onCopyLink,
  onShare,
  onHidePost,
  onMuteUser,
  onUnfollowUser,
  onToggleComments,
  onReport,
  onClose,
}) => {
  const isProfilePage = window.location.pathname.startsWith("/profile")
  return (
    <>
      <button
        role="menuitem"
        className="w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 rounded focus:outline-none focus:ring-0"
        onClick={() => {
          onCopyLink()
          onClose?.()
        }}
      >
        <FaCopy className="w-4 h-4" />
        Copy link
      </button>
      <button
        role="menuitem"
        className="w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 rounded"
        onClick={() => {
          onShare()
          onClose?.()
        }}
      >
        <FaShare className="w-4 h-4" />
        Share
      </button>
      <button
        role="menuitem"
        className="w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 rounded"
        onClick={() => {
          onHidePost()
          onClose?.()
        }}
      >
        <FaEyeSlash className="w-4 h-4" />
        Hide post
      </button>
      <button
        role="menuitem"
        className="w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 rounded"
        onClick={() => {
          onMuteUser()
          onClose?.()
        }}
      >
        <FaBellSlash className="w-4 h-4" />
        Mute {item.userName}
      </button>
      <button
        role="menuitem"
        className="w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 rounded"
        onClick={() => {
          onUnfollowUser()
          onClose?.()
        }}
      >
        <FaUserMinus className="w-4 h-4" />
        Unfollow {item.userName}
      </button>
      <button
        role="menuitem"
        className="w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 rounded"
        onClick={() => {
          onToggleComments()
          onClose?.()
        }}
      >
        <IoChatbubbleOutline className="w-4 h-4" />
        {isCommentsOff ? "Turn on comments" : "Turn off comments"}
      </button>
      <button
        role="menuitem"
        className="w-full px-3 py-2 text-sm text-red-600 flex items-center gap-2 hover:bg-red-50 rounded"
        onClick={() => {
          onReport()
          onClose?.()
        }}
      >
        <FaFlag className="w-4 h-4" />
        Report
      </button>
      {isProfilePage && (
        <button
          role="menuitem"
          className="w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 rounded"
          onClick={() => {
            onClose?.()
          }}
        >
          <FaTrash className="w-4 h-4" />
          Delete post
        </button>
      )}
    </>
  )
}
