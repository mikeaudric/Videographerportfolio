// VideoDetailDialog.tsx
"use client"

import { Dialog, DialogContent,DialogTitle } from "@/components/ui/dialog"
import VideoDetailContent from "./VideoDetailContent"

interface Video {
  id: number
  title: string
  description: string
  videoUrl: string
  duration: string
  type: "youtube" | "instagram"
}

interface VideoDetailDialogProps {
  video: Video | null
  isOpen: boolean
  onClose: () => void
  allVideos: Video[]
}

export default function VideoDetailDialog({ 
  video, 
  isOpen, 
  onClose, 
  allVideos 
}: VideoDetailDialogProps) {
  if (!video) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[85vw] w-[1600px] h-[85vh] p-0 bg-black/95 shadow-2xl overflow-y-auto">
        {/* Ajoutez un DialogTitle ici */}
        <DialogTitle className="sr-only">Détails de la vidéo</DialogTitle>
        
        <VideoDetailContent
          video={video}
          onClose={onClose}
          relatedVideos={allVideos}
          variant="dialog"
          className="h-full"
        />
      </DialogContent>
    </Dialog>
  )
}

