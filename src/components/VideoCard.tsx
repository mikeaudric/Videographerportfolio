"use client"
import { useState, useEffect } from "react"
import { Play } from "lucide-react"
import { getThumbnailUrl, getEmbedUrl } from "@/lib/video-utils"
import { cn } from "@/lib/utils"

interface Video {
  id: number
  title: string
  description: string
  videoUrl: string
  duration: string
  type: "youtube" | "instagram"
}

interface VideoCardProps {
  video: Video
  isReel: boolean
  onReadMore?: (video: Video) => void
  isCarousel?: boolean // Nouveau prop pour différencier l'affichage
}

export default function VideoCard({ video, isReel, onReadMore, isCarousel = false }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [truncatedDescription, setTruncatedDescription] = useState("")

  const handlePlay = () => {
    setIsPlaying(true)
  }

  useEffect(() => {
    if (!isCarousel) {
      const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text
        const targetLength = maxLength - 17
        let truncated = text.substr(0, targetLength)
        truncated = truncated.substr(0, truncated.lastIndexOf(" "))
        return truncated
      }
      const maxLength = isReel ? 120 : 150
      setTruncatedDescription(truncateText(video.description, maxLength))
    }
  }, [video.description, isReel, isCarousel])

  return (
    <div 
      className={cn("relative", isReel && "max-w-[360px] mx-auto", !isCarousel && "space-y-3")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn("relative", isReel ? "aspect-[9/16]" : "aspect-video")}>
        {!isPlaying ? (
          <div className="relative w-full h-full group">
            <img
              src={getThumbnailUrl(video.videoUrl) || "/placeholder.svg"}
              alt={video.title}
              className={cn("w-full h-full object-cover rounded-lg", isReel && "object-contain")}
            />
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black/30 group-hover:bg-black/50 transition-colors">
                <Play className="w-8 h-8 text-white" fill="white" />
              </div>
            </button>
            {video.duration && (
              <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-xs text-white">
                {video.duration}
              </div>
            )}
            {/* Effet de survol pour le carousel uniquement  */}
            {isCarousel && isHovered && (
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-t from-blue-500/50 via-blue-700/10 to-transparent px-2 py-1.5 z-[1]">
                <h2 className="text-sm font-medium text-white truncate">
                  {video.title}
                </h2>
              </div>
            )}
          </div>
        ) : (
          <iframe
            className="w-full h-full rounded-lg"
            src={`${getEmbedUrl(video.videoUrl)}?autoplay=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}
      </div>

      {/* Informations affichées uniquement hors carousel */}
      {!isCarousel && (
        <div className="space-y-2">
          <h2 className="text-sm font-bold leading-tight text-white/95">{video.title}</h2>
          <p className="text-sm text-gray-400 line-clamp-2 cursor-pointer group" onClick={() => onReadMore?.(video)}>
            {truncatedDescription}
            {video.description.length > 150 && (
              <>
                <span className="text-gray-400">...</span>
                <span className="text-blue-100 group-hover:underline ml-1">en lire plus</span>
              </>
            )}
          </p>
        </div>
      )}
    </div>
  )
}

