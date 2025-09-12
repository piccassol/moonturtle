"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full bg-black" />

      {/* Top left character */}
      <motion.div
        className="absolute top-20 left-10 z-20 hidden md:block"
        initial={{ opacity: 0, x: -50, rotate: -10 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Image
          src="/images/moonturtle-artist.png"
          alt="Moonturtle Artist Character"
          width={120}
          height={120}
          className="drop-shadow-2xl"
        />
      </motion.div>

      {/* Top right character */}
      <motion.div
        className="absolute top-32 right-16 z-20 hidden lg:block"
        initial={{ opacity: 0, x: 50, rotate: 10 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <Image
          src="/images/moonturtle-btc.png"
          alt="Moonturtle BTC Character"
          width={100}
          height={100}
          className="drop-shadow-2xl"
        />
      </motion.div>

      {/* Bottom left character */}
      <motion.div
        className="absolute bottom-32 left-20 z-20 hidden lg:block"
        initial={{ opacity: 0, y: 50, rotate: -5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <Image
          src="/images/moonturtle-reading.png"
          alt="Moonturtle Reading Character"
          width={110}
          height={110}
          className="drop-shadow-2xl"
        />
      </motion.div>

      {/* Bottom right character */}
      <motion.div
        className="absolute bottom-20 right-10 z-20 hidden md:block"
        initial={{ opacity: 0, y: 50, x: 30 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 1, delay: 1.1 }}
      >
        <Image
          src="/images/moonturtle-sitting.png"
          alt="Moonturtle Sitting Character"
          width={130}
          height={130}
          className="drop-shadow-2xl"
        />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.h1
          className="mb-6 text-6xl font-bold tracking-tighter sm:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          MOONTURTLE
        </motion.h1>
        <motion.p
          className="max-w-[600px] text-lg text-gray-400 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Visual Artist & Creative Director
        </motion.p>
      </div>
    </div>
  )
}
