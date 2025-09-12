import Hero from "./components/hero"
import Gallery from "./components/gallery"
import Contact from "./components/contact"
import Footer from "./components/footer"
import WalletButton from "./components/wallet-button"

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">MOONTURTLE</h1>
          <WalletButton />
        </div>
      </nav>
      <Hero />
      <Gallery />
      {/* <Portfolio /> */}
      <Contact />
      <Footer />
    </main>
  )
}
