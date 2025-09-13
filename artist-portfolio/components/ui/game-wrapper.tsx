"use client"

import { useRef } from "react"
import dynamic from "next/dynamic"

const MoonHopGame = dynamic(() => import("./moonhop-game"), {
  ssr: false,
  loading: () => <div className="w-full h-64 bg-slate-900 rounded-lg animate-pulse" />,
})

export default function GameWrapper() {
  const gameRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative w-full h-64 rounded-lg overflow-hidden border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
      <div ref={gameRef} id="moonhop-game" className="w-full h-full" />
      <MoonHopGame />

      {/* Game overlay with instructions */}
      <div className="absolute top-4 right-4 text-white/80 text-sm bg-black/30 px-3 py-2 rounded-lg backdrop-blur-sm">
        <div className="text-xs">🎮 MoonHop Game</div>
        <div className="text-xs opacity-75">Click or Space to jump!</div>
      </div>
    </div>
  )
}
