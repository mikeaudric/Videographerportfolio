"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Play } from "lucide-react"

interface VideoPlayerProps {
  isHovering: boolean
  videoUrl: string
  thumbnail: string
  onLoadStart?: () => void
  onLoadEnd?: () => void
  onDurationChange?: (duration: number) => void
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, thumbnail, onLoadStart, onLoadEnd }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handlePlay = () => {
    setIsPlaying(true)
    if (onLoadStart) onLoadStart()
  }

  return (
    <div className="relative w-full h-full group">
      {!isPlaying ? (
        <>
          <img src={thumbnail} alt="Video thumbnail" className="w-full h-full object-cover rounded-lg" />
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black/30 group-hover:bg-black/50 transition-colors">
              <Play className="w-8 h-8 text-white" fill="white" />
            </div>
          </button>
        </>
      ) : (
        <iframe
          ref={iframeRef}
          className="w-full h-full rounded-lg"
          src={`${videoUrl}?autoplay=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
          onLoad={onLoadEnd}
        />
      )}
    </div>
  )
}

export default VideoPlayer

