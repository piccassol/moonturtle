"use client"

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

export default function WalletButton() {
  return (
    <div className="flex items-center">
      <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-lg !px-4 !py-2 !text-sm !font-medium !transition-colors" />
    </div>
  )
}
