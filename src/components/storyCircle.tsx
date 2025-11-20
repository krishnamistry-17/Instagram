import React from "react"
import { StaticImage } from "gatsby-plugin-image"

interface StoryCircleProps {
  size?: number // Outer width/height (default 80px)
  ringWidth?: number // Thickness of SVG progress ring
  gradient?: string // Tailwind gradient classes
  image: string // Image path
  progress: number // 0–100
  onClick?: () => void
}

const StoryCircle: React.FC<StoryCircleProps> = ({
  size = 80,
  ringWidth = 4,
  gradient = "bg-gradient-to-tr from-pink-500 to-yellow-500",
  image,
  progress,
  onClick,
}) => {
  const padding = 6
  const innerSize = size - padding * 2
  const center = innerSize / 2
  const radius = center - ringWidth / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference
  return (
    <div
      className="relative cursor-pointer"
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      {/* Outer gradient border */}
      <div className={`absolute inset-0 rounded-full p-[3px] ${gradient}`}>
        {/* Inner white circle */}
        <div className="w-full h-full bg-white rounded-full p-[3px] relative overflow-visible">
          {/* Progress Ring */}
          {progress > 0 && (
            <svg
              className="absolute inset-0 pointer-events-none"
              width={innerSize}
              height={innerSize}
            >
              <circle
                cx={center}
                cy={center}
                r={radius}
                stroke="transparent"
                strokeWidth={ringWidth}
                fill="none"
              />
              <circle
                cx={center}
                cy={center}
                r={radius}
                stroke="url(#grad)"
                strokeWidth={ringWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="100" y2="100">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {/* Profile Image */}
          <img
            src={image}
            alt="story"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default StoryCircle
