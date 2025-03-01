// VideoDetailModal.tsx
"use client"

import { useEffect, useState } from "react"
import VideoDetailContent from "./VideoDetailContent"

interface Video {
  id: number
  title: string
  description: string
  videoUrl: string
  duration: string
  type: "youtube" | "instagram"
}

interface VideoDetailModalProps {
  video: Video
  isOpen: boolean
  onClose: () => void
  relatedVideos: Video[]
}

export default function VideoDetailModal({ 
  video, 
  isOpen, 
  onClose, 
  relatedVideos 
}: VideoDetailModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (isOpen) {
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!mounted || !isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="h-full w-full overflow-y-auto">
        <div className="container mx-auto min-h-screen p-4">
          <VideoDetailContent
            video={video}
            onClose={onClose}
            relatedVideos={relatedVideos}
            variant="modal"
          />
        </div>
      </div>
    </div>
  )
}

