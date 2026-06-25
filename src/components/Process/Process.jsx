import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { processSteps } from '../../data/process'

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="process" className="section-padding process-section" aria-label="Installation Process">
      <div className="container">
        <motion.div
          ref={ref}
          className="section-header"
          style={{ textAlign: 'center', marginBottom: '72px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>Installation Process</div>
          <h2 className="section-title">From Factory to Finish —<br />13 Steps to a Perfect Structure</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Our systematic installation methodology eliminates on-site surprises. Every step is documented, supervised and quality-checked before proceeding to the next.
          </p>
        </motion.div>

        <div className="process-timeline">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.id}
              className={`process-item ${i % 2 === 0 ? 'process-left' : 'process-right'}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.07 }}
            >
              <div className="process-card">
                <div className="process-step-num">{step.step}</div>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-desc">{step.description}</p>
              </div>
              <div className="process-node">
                {step.id === processSteps.length ? (
                  <CheckCircle2 size={20} color="var(--color-primary)" strokeWidth={2.5} />
                ) : (
                  <div className="process-node-dot" />
                )}
              </div>
            </motion.div>
          ))}
          <div className="process-line" />
        </div>
      </div>

      <style>{`
        .process-section { background: var(--color-white); }
        .section-header .section-label { justify-content: center; }
        .section-header .section-label::before { display: none; }
        .process-timeline {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .process-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, var(--color-accent), rgba(244,163,0,0.2));
          transform: translateX(-50%);
          z-index: 0;
        }
        .process-item {
          display: grid;
          grid-template-columns: 1fr 40px 1fr;
          align-items: center;
          gap: 24px;
          position: relative;
          z-index: 1;
          margin-bottom: 20px;
        }
        .process-left .process-card { grid-column: 1; text-align: right; }
        .process-left .process-node { grid-column: 2; }
        .process-left::after { grid-column: 3; content: ''; }
        .process-right .process-card { grid-column: 3; text-align: left; }
        .process-right .process-node { grid-column: 2; }
        .process-right::before { grid-column: 1; content: ''; }
        .process-node {
          width: 40px;
          height: 40px;
          background: var(--color-accent);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 0 6px rgba(244,163,0,0.2);
          justify-self: center;
          flex-shrink: 0;
        }
        .process-node-dot {
          width: 12px;
          height: 12px;
          background: var(--color-primary);
          border-radius: 50%;
        }
        .process-card {
          padding: 24px 28px;
          background: var(--color-light-gray);
          border-radius: var(--radius-md);
          transition: all 0.3s ease;
        }
        .process-card:hover {
          background: var(--color-primary);
          box-shadow: var(--shadow-lg);
        }
        .process-card:hover .process-step-num,
        .process-card:hover .process-step-title,
        .process-card:hover .process-step-desc {
          color: rgba(255,255,255,0.9);
        }
        .process-card:hover .process-step-num { color: var(--color-accent); }
        .process-step-num {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 800;
          color: var(--color-accent);
          line-height: 1;
          margin-bottom: 6px;
          transition: color 0.3s;
        }
        .process-step-title {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: 6px;
          transition: color 0.3s;
        }
        .process-step-desc {
          font-size: 0.8375rem;
          color: #6b7280;
          line-height: 1.6;
          transition: color 0.3s;
        }
        @media (max-width: 768px) {
          .process-timeline { padding-left: 52px; }
          .process-line { left: 20px; }
          .process-item {
            grid-template-columns: 40px 1fr;
            grid-template-rows: auto;
          }
          .process-left .process-card,
          .process-right .process-card { grid-column: 2; text-align: left; }
          .process-left .process-node,
          .process-right .process-node { grid-column: 1; }
          .process-left::after, .process-right::before { display: none; }
        }
      `}</style>
    </section>
  )
}