"use client"

import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import PaymentModal from "./payment-modal"

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [selectedArtwork, setSelectedArtwork] = useState<any>(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  const paintings = [
    {
      id: "1",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1d3c0520-cc65-11ee-a258-c12046d80396.jpg-viwNVvUl6SHa5sJrzugWnSZcgMke0c.jpeg",
      alt: "Whimsical character with avocado",
      title: "Avocado Dreams",
      price: 5.0, // Updated first painting to 5 SOL
    },
    {
      id: "2",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/06c6df80-c8b0-11ee-9d2e-41fff65c04fe.jpg-yfTWFDIpBZ7RE8icgPstDkH0BLVZfI.jpeg",
      alt: "Floating character in landscape",
      title: "Celestial Meditation",
      price: 3.0,
    },
    {
      id: "3",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9b628ab0-cc5f-11ee-a258-c12046d80396.jpg-H1Vv0X0xDdrNE3Cf64GmCl6XOPw4pF.jpeg",
      alt: "Colorful character group",
      title: "Garden Friends",
      price: 5.0, // Updated third painting to 5 SOL
    },
    {
      id: "4",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d8613cd0-c701-11ee-ae50-a90c4c963c7e%20%281%29.jpg-huyxWlNxg2HUtBUhFx0yyBMXsETvF3.jpeg",
      alt: "Abstract swirling forms",
      title: "Cosmic Swirl",
      price: 3.5,
    },
    {
      id: "5",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1877.jpg-HkBcnHz9xAFzS279GEZnwKaA9uT6ZK.jpeg",
      alt: "Circular abstract composition",
      title: "Inner Circle",
      price: 5.0, // Updated fifth painting to 5 SOL
    },
    {
      id: "6",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f380bb40-cc64-11ee-a258-c12046d80396.jpg-t3bh2CUpHwTDnYZIKLwru9YdorYKbS.jpeg",
      alt: "Character with stars",
      title: "Starlight Companion",
      price: 5.0, // Updated sixth painting to 5 SOL
    },
    {
      id: "7",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c3308380-cc5f-11ee-a258-c12046d80396.jpg-YT9J48QJuf7pFktBN0LaT2T4vBF4Om.jpeg",
      alt: "Duck-like character in landscape",
      title: "Peaceful Waters",
      price: 5.0, // Updated seventh painting to 5 SOL
    },
    {
      id: "8",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/78aade30-c702-11ee-ae50-a90c4c963c7e%20%281%29.jpg-db1XSfBHnbH11ZBaOkeuN5hxEhHQqu.jpeg",
      alt: "Close-up character portrait",
      title: "Gentle Gaze",
      price: 2.9,
    },
    {
      id: "9",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5ed562b0-cc65-11ee-a258-c12046d80396.jpg-oSAAaIwiMhAs4GUl5VL6vIB1gEWgMM.jpeg",
      alt: "Character in natural setting",
      title: "Mountain Serenity",
      price: 5.0, // Updated ninth painting to 5 SOL
    },
    {
      id: "10",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1358e900-c702-11ee-ae50-a90c4c963c7e%20%281%29.jpg-Vf4jzMDgJv7OpWvlLjhgeKWlIyz21n.jpeg",
      alt: "Expressive character portrait",
      title: "Joyful Expression",
      price: 2.6,
    },
  ]

  const handlePurchaseClick = (artwork: any) => {
    setSelectedArtwork(artwork)
    setIsPaymentModalOpen(true)
  }

  return (
    <section className="relative py-20">
      <div ref={ref} className="container mx-auto px-4">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          Paintings Collection
        </motion.h2>

        <motion.p
          className="mb-8 text-center text-sm text-zinc-400 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          [To purchase click confirm anyways because we are not verified on Phantom yet but wallet is dev wallet and can
          be tracked on Solscan, all payments gateways are safe and secure via vercel.com]
        </motion.p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paintings.map((painting, index) => (
            <motion.div
              key={painting.id}
              className="group relative overflow-hidden rounded-lg bg-zinc-900"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={painting.src || "/placeholder.svg"}
                  alt={painting.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h3 className="text-lg font-semibold text-white mb-1">{painting.title}</h3>
                <p className="text-purple-300 font-medium mb-3">{painting.price} SOL</p>
                <Button
                  onClick={() => handlePurchaseClick(painting)}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  size="sm"
                >
                  Purchase
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedArtwork && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => {
            setIsPaymentModalOpen(false)
            setSelectedArtwork(null)
          }}
          artwork={{
            id: selectedArtwork.id,
            title: selectedArtwork.title,
            price: selectedArtwork.price,
            image: selectedArtwork.src,
          }}
        />
      )}
    </section>
  )
}
