"use client"

const WaveText = ({ text }: { text: string }) => {
  const letters = text.split('')

  return (
    <div className="flex overflow-hidden perspective-[100px]">
      {letters.map((letter, index) => (
        <span
          key={index}
          className="animate-wave inline-block origin-center"
          style={{
            animationDelay: `${index * 0.1}s`,
            transform: 'translateZ(0)', // Pour une meilleure performance
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </div>
  )
}

export default WaveText

