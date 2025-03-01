export const getVideoId = (url: string): string => {
  // YouTube
  const youtubeMatch = url.match(
    /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([^/&?]{10,12})/,
  )
  if (youtubeMatch) return youtubeMatch[1]

  // Instagram
  const instagramMatch = url.match(/instagram\.com\/(?:p|reel)\/([^/?]+)/)
  if (instagramMatch) return instagramMatch[1]

  return ""
}

export const getThumbnailUrl = (videoUrl: string): string => {
  const videoId = getVideoId(videoUrl)

  if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }

  // Pour Instagram, on utilise une image par défaut
  return "/placeholder.svg?height=720&width=1280"
}

export const getEmbedUrl = (videoUrl: string): string => {
  const videoId = getVideoId(videoUrl)

  if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
    return `https://www.youtube.com/embed/${videoId}`
  }

  if (videoUrl.includes("instagram.com")) {
    return `https://www.instagram.com/p/${videoId}/embed`
  }

  return videoUrl
}

