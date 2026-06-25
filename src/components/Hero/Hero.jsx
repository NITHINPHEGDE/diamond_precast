import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Phone, MessageCircle, ChevronDown } from 'lucide-react'
import { Link } from 'react-scroll'
import CountUp from 'react-countup'
import './Hero.css'

const stats = [
  { value: 850, suffix: '+', label: 'Projects Completed' },
  { value: 600, suffix: '+', label: 'Happy Clients' },
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 25, suffix: '+', label: 'Areas Served' },
]

function StatItem({ stat }) {
  const ref = useRef(null)
  const inView = useInView(ref, {
    once: true,
    margin: '-50px',
  })

  return (
    <div ref={ref} className="hero-stat">
      <div className="hero-stat-value">
        {inView ? (
          <CountUp end={stat.value} duration={2.5} separator="," />
        ) : (
          '0'
        )}
        <span className="hero-stat-accent">{stat.suffix}</span>
      </div>

      <div className="hero-stat-label">{stat.label}</div>
    </div>
  )
}

export default function Hero() {
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const fadeOut = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      id="home"
      ref={heroRef}
      className="hero-section"
      aria-label="Hero"
    >
      {/* Background */}
      <motion.div className="hero-bg" style={{ y: bgY }}>
        <img
          src="https://picsum.photos/seed/herodp2024/1920/1080"
          alt="Diamond Precast"
          className="hero-bg-img"
          loading="eager"
          fetchPriority="high"
        />

        <div className="hero-overlay" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="hero-content"
        style={{ opacity: fadeOut }}
      >
        <div className="container">
          <div className="hero-inner">

            <motion.div
              className="hero-label"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="hero-label-dot" />
              Trusted Across Karnataka Since 2009
            </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              Diamond
              <span className="hero-title-accent">Precast</span>
            </motion.h1>

            <motion.p
              className="hero-tagline"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              Premium Precast Compound Walls &amp; Concrete Structures
            </motion.p>

            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
            >
              Serving Karnataka with Quality, Strength and Timely Delivery
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <a
                href="tel:+919876543210"
                className="hero-btn hero-btn-call"
                aria-label="Call Diamond Precast"
              >
                <Phone size={18} />
                Call Now
              </a>

              <a
                href="https://wa.me/919876543210?text=Hi%20Diamond%20Precast%2C%20I%20am%20interested%20in%20your%20precast%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn hero-btn-wa"
                aria-label="WhatsApp Diamond Precast"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="hero-stats"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
            >
              {stats.map((stat) => (
                <StatItem key={stat.label} stat={stat} />
              ))}
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* Scroll Down */}
      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <Link
          to="about"
          smooth
          duration={700}
          offset={-80}
          aria-label="Scroll to About"
        >
          <motion.div
            className="hero-scroll-icon"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  )
}