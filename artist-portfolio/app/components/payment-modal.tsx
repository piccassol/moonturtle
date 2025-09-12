"use client"

import { useState } from "react"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  artwork: {
    id: string
    title: string
    price: number
    image: string
  }
}

export default function PaymentModal({ isOpen, onClose, artwork }: PaymentModalProps) {
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const [isProcessing, setIsProcessing] = useState(false)
  const [buyerEmail, setBuyerEmail] = useState("")

  const ARTIST_WALLET = new PublicKey("7ipHwwAS7ZDcZmpc52n1vFtMT7wbc7r9bi8AWyz1zTBW")

  const handlePurchase = async () => {
    if (!publicKey || !buyerEmail) {
      toast({
        title: "Error",
        description: "Please connect your wallet and enter your email",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: ARTIST_WALLET,
          lamports: artwork.price * LAMPORTS_PER_SOL,
        }),
      )

      const signature = await sendTransaction(transaction, connection)

      // Wait for confirmation
      await connection.confirmTransaction(signature, "confirmed")

      toast({
        title: "Purchase Successful!",
        description: `You've successfully purchased "${artwork.title}" for ${artwork.price} SOL`,
      })

      // Here you would typically save the purchase to a database
      console.log("Purchase completed:", {
        artworkId: artwork.id,
        buyerWallet: publicKey.toString(),
        buyerEmail,
        transactionSignature: signature,
        amount: artwork.price,
      })

      onClose()
    } catch (error) {
      console.error("Transaction failed:", error)
      toast({
        title: "Transaction Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Purchase Artwork</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={artwork.image || "/placeholder.svg"}
              alt={artwork.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold">{artwork.title}</h3>
              <p className="text-sm text-gray-600">{artwork.price} SOL</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={buyerEmail}
              onChange={(e) => setBuyerEmail(e.target.value)}
            />
          </div>

          {!publicKey ? (
            <p className="text-sm text-gray-600">Please connect your Phantom wallet to continue</p>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Connected: {publicKey.toString().slice(0, 8)}...{publicKey.toString().slice(-8)}
              </p>
              <Button onClick={handlePurchase} disabled={isProcessing || !buyerEmail} className="w-full">
                {isProcessing ? "Processing..." : `Purchase for ${artwork.price} SOL`}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
