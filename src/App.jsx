import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Products from './components/Products/Products'
import Materials from './components/Materials/Materials'
import Process from './components/Process/Process'
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs'
import Areas from './components/Areas/Areas'
import Gallery from './components/Gallery/Gallery'
import Owners from './components/Owners/Owners'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import FloatingButtons from './components/FloatingButtons/FloatingButtons'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import ScrollProgress from './components/ScrollProgress/ScrollProgress'
import './styles/App.css'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <>
      <Helmet>
        <title>Diamond Precast – Premium Precast Compound Walls & Concrete Structures Karnataka</title>
        <meta name="description" content="Diamond Precast specializes in premium precast compound walls, M25 grade slabs, M30 grade columns, labour rooms and storage rooms across Karnataka. Quality, strength and timely delivery." />
        <meta name="keywords" content="precast compound wall, precast concrete, M25 slab, M30 column, labour room, storage room, Karnataka, Bengaluru, Tumakuru, Mysuru, Davanagere, Chitradurga, precast construction" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Diamond Precast" />
        <link rel="canonical" href="https://www.diamondprecast.com/" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.diamondprecast.com/" />
        <meta property="og:title" content="Diamond Precast – Premium Precast Compound Walls & Concrete Structures" />
        <meta property="og:description" content="Serving Karnataka with quality precast compound walls, slabs, columns and more. Experienced team, premium materials, fast installation." />
        <meta property="og:image" content="https://picsum.photos/seed/diamondprecast/1200/630" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Diamond Precast – Premium Precast Concrete Structures" />
        <meta name="twitter:description" content="Premium precast compound walls & concrete structures across Karnataka." />
        <meta name="twitter:image" content="https://picsum.photos/seed/diamondprecast/1200/630" />
      </Helmet>

      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <Materials />
        <Process />
        <WhyChooseUs />
        <Areas />
        <Gallery />
        <Owners />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}