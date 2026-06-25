import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, ArrowUp } from 'lucide-react'

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      {/* WhatsApp floating button */}
      <motion.a
        href="https://wa.me/919876543210?text=Hi%20Diamond%20Precast%2C%20I%20am%20interested%20in%20your%20precast%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="floating-wa"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} />
        {/* Pulse ring */}
        <span className="floating-pulse" />
      </motion.a>

      {/* Call floating button */}
      <motion.a
        href="tel:+919876543210"
        className="floating-call"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.2, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Call Diamond Precast"
      >
        <Phone size={22} />
      </motion.a>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            className="floating-top"
            onClick={scrollToTop}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <style>{`
        .floating-wa,
        .floating-call,
        .floating-top {
          position: fixed;
          z-index: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
          transition: box-shadow 0.3s;
        }
        .floating-wa {
          bottom: 24px;
          right: 24px;
          width: 60px;
          height: 60px;
          background: #25D366;
          color: #fff;
          text-decoration: none;
        }
        .floating-wa:hover { box-shadow: 0 8px 32px rgba(37,211,102,0.5); }
        .floating-pulse {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 3px solid #25D366;
          animation: wa-pulse 2s infinite;
        }
        @keyframes wa-pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .floating-call {
          bottom: 96px;
          right: 24px;
          width: 52px;
          height: 52px;
          background: var(--color-primary);
          border: 2px solid rgba(244,163,0,0.4);
          color: var(--color-accent);
          text-decoration: none;
        }
        .floating-call:hover { box-shadow: 0 8px 24px rgba(13,27,42,0.5); }
        .floating-top {
          bottom: 24px;
          right: 96px;
          width: 48px;
          height: 48px;
          background: var(--color-accent);
          color: var(--color-primary);
          border: none;
        }
        .floating-top:hover { box-shadow: 0 8px 24px rgba(244,163,0,0.45); }
        @media (max-width: 480px) {
          .floating-wa { bottom: 16px; right: 16px; width: 54px; height: 54px; }
          .floating-call { bottom: 82px; right: 16px; width: 46px; height: 46px; }
          .floating-top { bottom: 16px; right: 84px; width: 44px; height: 44px; }
        }
      `}</style>
    </>
  )
}