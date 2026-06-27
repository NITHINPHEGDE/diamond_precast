import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, ArrowUp, Calculator, X } from 'lucide-react'

const products = [
  { id: 'wall', label: 'Compound Wall', unit: 'Running Feet', formula: (val) => ({ slabs: Math.ceil(val / 6), columns: Math.ceil(val / 6) + 1 }) },
  { id: 'slab', label: 'M25 Grade Slab', unit: 'Sq. Feet', formula: (val) => ({ slabs: Math.ceil(val / 20) }) },
]

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false)
  const [calcOpen, setCalcOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState('wall')
  const [inputValue, setInputValue] = useState('')
  const [result, setResult] = useState(null)

  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const calculate = () => {
    const val = parseFloat(inputValue)
    if (!val || val <= 0) return
    const product = products.find(p => p.id === selectedProduct)
    setResult({ product: product.label, unit: product.unit, value: val, ...product.formula(val) })
  }

  const reset = () => {
    setInputValue('')
    setResult(null)
  }

  const currentProduct = products.find(p => p.id === selectedProduct)

  return (
    <>
      <AnimatePresence>
        {calcOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 200 }}
            style={{
              position: 'fixed',
              bottom: '180px',
              right: '24px',
              width: '320px',
              background: '#0D1F5C',
              borderRadius: '20px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              zIndex: 1000,
              overflow: 'hidden',
              border: '1px solid rgba(232,119,34,0.3)',
            }}
          >
            <div style={{
              background: '#E87722',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Calculator size={20} color="#0D1F5C" />
                <span style={{ fontWeight: 700, fontSize: '1rem', color: '#0D1F5C', fontFamily: 'Barlow Condensed, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Area Calculator
                </span>
              </div>
              <button onClick={() => { setCalcOpen(false); reset() }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0D1F5C' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '20px' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#E87722', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>
                  Select Product
                </label>
                <select
                  value={selectedProduct}
                  onChange={e => { setSelectedProduct(e.target.value); reset() }}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(232,119,34,0.4)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '0.875rem',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id} style={{ background: '#0D1F5C' }}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#E87722', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>
                  {currentProduct.unit}
                </label>
                <input
                  type="number"
                  value={inputValue}
                  onChange={e => { setInputValue(e.target.value); setResult(null) }}
                  placeholder={`Enter ${currentProduct.unit}`}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(232,119,34,0.4)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '0.875rem',
                    outline: 'none',
                  }}
                />
              </div>

              <button
                onClick={calculate}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#E87722',
                  color: '#0D1F5C',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Barlow Condensed, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '12px',
                }}
              >
                Calculate
              </button>

              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      background: 'rgba(232,119,34,0.1)',
                      border: '1px solid rgba(232,119,34,0.3)',
                      borderRadius: '12px',
                      padding: '16px',
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', color: '#E87722', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
                      Estimate Result
                    </div>
                    {result.slabs && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>Slabs Required</span>
                        <span style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>{result.slabs}</span>
                      </div>
                    )}
                    {result.columns && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>Columns Required</span>
                        <span style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>{result.columns}</span>
                      </div>
                    )}
                    {result.rooms && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>Rooms Required</span>
                        <span style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>{result.rooms}</span>
                      </div>
                    )}
<div
  style={{
    borderTop: '1px solid rgba(232,119,34,0.2)',
    marginTop: '12px',
    paddingTop: '12px',
  }}
>
  <a
    href="https://wa.me/918884842088?text=Hi%20Diamond%20Precast%2C%20I%20need%20a%20quote%20for%20my%20project."
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'block',
      textAlign: 'center',
      padding: '10px',
      background: '#25D366',
      color: '#fff',
      borderRadius: '8px',
      fontWeight: 700,
      fontSize: '0.875rem',
      textDecoration: 'none',
    }}
  >
    Get Quote on WhatsApp
  </a>
</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => { setCalcOpen(prev => !prev); reset() }}
        className="floating-calc"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.4, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Area Calculator"
      >
        <Calculator size={18} />
        <span>Area Calculator</span>
      </motion.button>

      <motion.a
        href="https://wa.me/918884842088?text=Hi%20Diamond%20Precast%2C%20I%20am%20interested%20in%20your%20precast%20services."
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
        <span className="floating-pulse" />
      </motion.a>

      <motion.a
        href="tel:+918884842388"
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
        .floating-top,
        .floating-calc {
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
          border: 2px solid rgba(232,119,34,0.4);
          color: #E87722;
          text-decoration: none;
        }
        .floating-call:hover { box-shadow: 0 8px 24px rgba(13,27,42,0.5); }
        
        .floating-calc:hover { box-shadow: 0 8px 24px rgba(232,119,34,0.5); }
        .floating-calc {
          bottom: 160px;
          right: 24px;
          width: auto;
          height: 44px;
          padding: 0 16px;
          gap: 8px;
          background: #E87722;
          color: #0D1F5C;
          border: none;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.875rem;
          font-family: 'Barlow Condensed', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
          display: flex;
          align-items: center;
        }
          floating-top {
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
          .floating-calc { bottom: 144px; right: 16px; height: 40px; width: auto; padding: 0 12px; font-size: 0.75rem; }
          .floating-top { bottom: 16px; right: 84px; width: 44px; height: 44px; }
        }
      `}</style>
    </>
  )
}