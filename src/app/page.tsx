"use client"

import { useState, useRef, useEffect } from "react"
import { Instagram, Twitter, MessageCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import VideoCard from "@/components/VideoCard"
import VideoDetailDialog from "@/components/VideoDetailDialog"
import { SITE_INFO } from "@/lib/constants"
import WaveText from "@/components/WaveText"

interface Video {
  id: number
  title: string
  description: string
  videoUrl: string
  duration: string
  type: "youtube" | "instagram"
}

const allVideos: Video[] = [
  {
    id: 1,
    title: "DLE, ON SE PRÉSENTE ENFIN. 2024: DÉCRYPTAGE, RETOUR SUR EXPÉRIENCE, AMBITIONS...STRATÉGIE 2025 ?",
    description:
      "Dans un format de discussion libre, l'équipe DLE se présente, parle de l'eSport au Bénin, son expérience. Dans un format de discussion libre, l'équipe DLE se présente, parle de l'eSport au Bénin, son expérience.",
    videoUrl: "https://www.youtube.com/watch?v=sA8wJ5Vg86g",
    duration: "30:20",
    type: "youtube",
  },
  {
    id: 2,
    title: "Parents et esport # Kader x AFG",
    description:
      "Série teaser de l'interview d'un gamer professionnel bénin. Dans un format de discussion libre, l'équipe DLE se présente, parle de l'eSport au Bénin, son expérienceDans un format de discussion libre, l'équipe DLE se présente, parle de l'eSport au Bénin, son expérienceDans un format de discussion libre, l'équipe DLE se présente, parle de l'eSport au Bénin, son expérience. Dans un format de discussion libre, l'équipe DLE se présente, parle de l'eSport au Bénin, son expérienceDans un format de discussion libre, l'équipe DLE se présente, parle de l'eSport au Bénin, son expérienceDans un format de discussion.",
    videoUrl: "https://www.instagram.com/reel/DCG6HcGtwtD/?igsh=MXZxbTRocHA4b2Znbw==",
    duration: "0:30",
    type: "instagram",
  },
  {
    id: 3,
    title: "Esport au Bénin : Rencontre avec Médard DJEKETE président de l'association  @afrigamers4685 ​",
    description:
      "Président de l'association Afrigamers, Médard nous donne sa vision de la structuration de l'esport au Bénin. De joueurs compétiteur à entrepreneur dans l'esport, d'une stratégie éprouvée par 12 années de labeur et des tournois à 3.000.000 FCFA de cash prize, il en ressort un avis des plus pertinent à écouter sur : les métiers du numérique et l'esport, l'entreprenariat, l'esport comme vecteur de réussite, tournois récurrents vs tournois d'envergure. L'honneur à été notre de pouvoir tenir cette interview à l'aube de grandes échéances pour lui et sa team qui ont été couronnés de succès.",
    videoUrl: "https://youtu.be/KXch1C3X2bg",
    duration: "30:20",
    type: "youtube",
  },
  {
    id: 4,
    title: "Esport au Bénin : Rencontre avec Laura ABBEY joueuse TEKKE8 de la team  @afrigamers4685 ​​",
    description:
      "Laura joueuse de Tekken8, compétitrice en Afrique pour représenter le Bénin sous la bannière Afrigamers nous a fait l'honneur de cet interview. Elle y aborde ce que c'est qu'être une gameuse en Afrique, et véhicule un message : OSER, pour toutes celles qui voudront s'inspirer d'elle pour se lancer dans le gaming.",
    videoUrl: "https://youtu.be/rQrUwVE2hYk",
    duration: "30:20",
    type: "youtube",
  },
  {
    id: 5,
    title: "Esport au Bénin : Rencontre avec Kévin AHOUANSOU joueur eFootball de la team  @afrigamers4685 ​​",
    description:
      "Troisième joueur de l'écurie AfriGamers qu'on a rencontré, interviewé et découvert. Rempli d'humilité, de détermination à la tâche, mais légèrement ralenti par le rythme moribon des compétition au Bénin sur eFootball Kévin se positionne comme le top 2 sur son jeux au Bénin. Découvrez comment il a dès son plus jeune âge bravé les interdits pour sa passion et embrassé sa carrière de juriste dans le même temps.",
    videoUrl: "https://youtu.be/K6CcEvzzg90",
    duration: "30:20",
    type: "youtube",
  },
  {
    id: 6,
    title: "Esport au Bénin : Rencontre avec Abdel Kader MARTIN joueur eFootball de la team  @afrigamers4685 ​ ​​",
    description:
      "Dans cette interview exclusive, nous plongeons dans l'univers d'un joueur professionnel béninois de eFootball de l’équipe AfriGamers. Il partage avec nous son parcours, sa rencontre avec sa team, ses difficultés et sa qualification pour EWC où il représente le Bénin. Découvrez comment il a concilié passion pour les jeux vidéo et vie personnelle, l’impact de cette passion sur ses relations familiales, ainsi que ses perspectives d’avenir dans les compétitions d’esport.",
    videoUrl: "https://youtu.be/mUxPlyIioYA",
    duration: "30:20",
    type: "youtube",
  },
  {
    id: 7,
    title: "Comment utiliser les Vercel Serverless Functions ? (+ nouveau repo github)",
    description:
      "Dans cette interview exclusive, nous plongeons dans l'univers d'un joueur professionnel béninois de eFootball de l’équipe AfriGamers. Il partage avec nous son parcours, sa rencontre avec sa team, ses difficultés et sa qualification pour EWC où il représente le Bénin. Découvrez comment il a concilié passion pour les jeux vidéo et vie personnelle, l’impact de cette passion sur ses relations familiales, ainsi que ses perspectives d’avenir dans les compétitions d’esport.",
    videoUrl: "https://www.youtube.com/watch?v=1FcHDhqgy94&t=210s",
    duration: "30:20",
    type: "youtube",
  },
]

export default function Page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [displayCount, setDisplayCount] = useState(3)
  const [activeFilter, setActiveFilter] = useState<"youtube" | "instagram">("youtube")
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  const filteredVideos = allVideos.filter((video) => video.type === activeFilter)
  const hasMoreVideos = displayCount < filteredVideos.length

  const loadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 6, filteredVideos.length))
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative">
      {/* Conteneur de la grille avec fondu */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, 
              transparent 0%,
              transparent 90%,
              black 100%
            ),
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.11) 1px, transparent 1px)
          `,
          backgroundColor: '#000000',
          backgroundSize: '20px 20px',
          backgroundPosition: 'center',
          backgroundAttachment: "fixed",
        }}
      />

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col flex-1">
        <header className="bg-[#1C2331] p-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <a
                  href={`mailto:${SITE_INFO.email}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {SITE_INFO.email}
                </a>
                <div className="text-2xl font-bold">
                  <WaveText text={SITE_INFO.name} />
                </div>
              </div>
              <div className="flex gap-4">
                <Link
                  href="https://www.instagram.com/mikeaudric/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="https://x.com/AudricMarie" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                  <span className="sr-only">X (Twitter)</span>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-8 space-y-12">
          <div className="flex justify-center space-x-4 mb-8">
            <Button
              onClick={() => setActiveFilter("youtube")}
              variant="filter"
              data-state={activeFilter === "youtube" ? "active" : "inactive"}
              className="rounded-full transition-all duration-300 ease-in-out"
            >
              Long format
            </Button>
            <Button
              onClick={() => setActiveFilter("instagram")}
              variant="filter"
              data-state={activeFilter === "instagram" ? "active" : "inactive"}
              className="rounded-full transition-all duration-300 ease-in-out"
            >
              Réels
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {filteredVideos.slice(0, displayCount).map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                isReel={video.type === "instagram"}
                onReadMore={() => setSelectedVideo(video)}
              />
            ))}
          </div>

          {hasMoreVideos && (
            <div className="flex justify-center">
              <Button
                onClick={loadMore}
                variant="outline"
                className="bg-transparent border border-white/20 hover:bg-white/10 text-white backdrop-blur-sm"
              >
                En voir plus
              </Button>
            </div>
          )}

          <div className="relative">
            <div className="absolute -inset-0.5 bg-blue-500/20 blur-2xl rounded-lg" />
            <div className="absolute -inset-1 bg-white/10 blur-xl rounded-lg" />
            
            <div className="relative bg-gradient-to-b from-[#1C2331]/80 to-black/60 backdrop-blur-md rounded-lg p-8 border border-white/10 shadow-[0_0_50px_0_rgba(28,35,49,0.6)]">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-100 to-blue-900 bg-clip-text text-transparent">
                En ce qui me concerne...
              </h2>
              
              <p className="text-xl leading-relaxed text-gray-200 text-justify">
                Je suis monteur vidéo avec un peu plus deux ans d'expérience. J'ai commencé par passion, dans le but de
                développer ma créativité et travaillé sur plusieurs type de contenus réseaux sociax (youtube, instagram,
                tiktok), touchant différents univers (gaming, soirée, robotique, développement personnel). J'apporte
                créativité et professionalisme pour embellir vos vidéos et je cherche à toujours faire mieux.
              </p>
            </div>
          </div>
        </main>

        {/* Footer ajusté */}
        <footer className="w-full bg-black border-t border-white/10 mt-auto">
          <div className="container mx-auto py-8 px-4">
            <div className="flex flex-col items-center gap-4 text-center">
              <a
                href={`mailto:${SITE_INFO.email}`}
                className="text-xl font-semibold hover:text-white transition-colors"
              >
                {SITE_INFO.email}
              </a>
              <p className="text-sm text-gray-400">
                © {SITE_INFO.currentYear} par {SITE_INFO.name} and powered by AI
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Bouton de contact et dialogs restent inchangés... */}
      <button
        onClick={() => setIsDialogOpen(true)}
        className="fixed bottom-4 right-4 flex items-center gap-2 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-2 z-50"
      >
        <MessageCircle className="w-5 h-5" />
        <span>Contactez-moi</span>
      </button>



      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4  z-[100]">
          <div className="bg-[#1C2331] p-8 rounded-lg w-[130%] max-w-2xl relative">
            {/* Bouton de fermeture */}
            <button
              onClick={() => setIsDialogOpen(false)}
              className="absolute -top-4 -right-4 bg-blue-600 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200 z-[101] shadow-lg"
            >
              <span className="sr-only">Fermer</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Contact Me</h2>
                <p className="text-gray-400">Send me a message and I'll get back to you as soon as possible.</p>
              </div>
              <form className="space-y-6">
                <input 
                  className="w-full p-3 rounded bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Your name"
                />
                <input
                  className="w-full p-3 rounded bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  type="email"
                  placeholder="Your email"
                />
                <textarea
                  className="w-full p-3 rounded bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors min-h-[120px]"
                  placeholder="Your message"
                  rows={4}
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#1C2331]"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

            <VideoDetailDialog 
              video={selectedVideo} 
              isOpen={selectedVideo !== null} 
              onClose={() => setSelectedVideo(null)} 
              allVideos={allVideos}
            />
          </div>
        )
      }

