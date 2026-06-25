import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Layers, Zap, Gem, Droplets, ShieldCheck } from 'lucide-react'
import { materials } from '../../data/materials'

const iconMap = {
  layers: Layers,
  zap: Zap,
  gem: Gem,
  droplets: Droplets,
  'shield-check': ShieldCheck,
}

export default function Materials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="materials" className="section-padding materials-section" aria-label="Materials We Use">
      <div className="container">
        <motion.div
          ref={ref}
          className="section-header"
          style={{ textAlign: 'center', marginBottom: '64px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <span style={{ display: 'none' }}></span>
            Raw Materials
          </div>
          <h2 className="section-title">Only the Best<br />Goes Into Our Products</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            We source premium raw materials and test every batch before production begins. The strength of our precast elements starts with the quality of what we put in.
          </p>
        </motion.div>

        <div className="materials-grid">
          {materials.map((mat, i) => {
            const Icon = iconMap[mat.icon] || Layers
            return (
              <motion.div
                key={mat.id}
                className="material-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="mat-icon-wrap">
                  <Icon size={24} />
                </div>
                <div className="mat-stat">{mat.stat}</div>
                <h3 className="mat-title">{mat.title}</h3>
                <p className="mat-desc">{mat.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>

      <style>{`
        .materials-section {
          background: var(--color-primary);
          position: relative;
          overflow: hidden;
        }
        .materials-section::before {
          content: '';
          position: absolute;
          top: -200px;
          right: -200px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(244,163,0,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .materials-section .section-label { color: var(--color-accent); }
        .materials-section .section-title { color: var(--color-white); }
        .materials-section .section-subtitle { color: rgba(255,255,255,0.6); }
        .materials-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
        }
        .material-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-lg);
          padding: 32px 24px;
          transition: all 0.3s ease;
          cursor: default;
        }
        .material-card:hover {
          background: rgba(244,163,0,0.08);
          border-color: rgba(244,163,0,0.3);
          transform: translateY(-4px);
        }
        .mat-icon-wrap {
          width: 52px;
          height: 52px;
          background: rgba(244,163,0,0.15);
          color: var(--color-accent);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .mat-stat {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-accent);
          margin-bottom: 6px;
        }
        .mat-title {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-white);
          margin-bottom: 10px;
          line-height: 1.3;
        }
        .mat-desc {
          font-size: 0.8125rem;
          color: rgba(255,255,255,0.55);
          line-height: 1.65;
        }
        @media (max-width: 1024px) {
          .materials-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 640px) {
          .materials-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 400px) {
          .materials-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}