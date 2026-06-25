import React from 'react'
import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--color-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ textAlign: 'center' }}
      >
        {/* Diamond logo mark */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          style={{
            width: 64,
            height: 64,
            margin: '0 auto 24px',
            border: '3px solid var(--color-accent)',
            borderTopColor: 'transparent',
            borderRadius: '50%',
          }}
        />
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', fontWeight: 700, color: '#fff', letterSpacing: '0.02em' }}>
          Diamond<span style={{ color: 'var(--color-accent)' }}> Precast</span>
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Building Karnataka's Future
        </div>
      </motion.div>
    </motion.div>
  )
}