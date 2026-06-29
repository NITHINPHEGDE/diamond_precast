import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { areas } from '../../data/areas'

export default function Areas() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="areas" className="section-padding areas-section" aria-label="Areas We Serve">
      <div className="container">
        <motion.div
          ref={ref}
          style={{ textAlign: 'center', marginBottom: '64px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>Service Coverage</div>
          <h2 className="section-title">
            We Deliver to<br />25+ Locations Across<br />South India
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Our fleet of specialised transport vehicles and site crews are deployed across Karnataka, and expanding into Tamil Nadu and Andhra Pradesh.
          </p>
        </motion.div>

        <motion.div
          className="areas-grid"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {areas.map((area, i) => (
            <motion.div
              key={area.id}
              className="area-chip"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              aria-label={`${area.name}, ${area.state}`}
            >
              <MapPin size={14} color="var(--color-accent)" strokeWidth={2.5} />
              <span className="area-name">{area.name}</span>
              <span className="area-state">{area.state !== 'Karnataka' ? area.state : ''}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="areas-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p>Don't see your area? We may still be able to serve you.</p>
          <a href="tel:+918884842088" className="btn-primary">
            <MapPin size={16} />
            Check Availability
          </a>
        </motion.div>
      </div>

      <style>{`
        .areas-section { background: var(--color-light-gray); }
        .section-label { justify-content: center; }
        .section-label::before { display: none; }
        .areas-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          margin-bottom: 56px;
        }
        .area-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 10px 18px;
          background: var(--color-white);
          border: 1.5px solid #e5e7eb;
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-primary);
          box-shadow: var(--shadow-sm);
          transition: all 0.25s ease;
          cursor: default;
        }
        .area-chip:hover {
          background: var(--color-primary);
          color: var(--color-white);
          border-color: var(--color-primary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .area-chip:hover svg { color: var(--color-accent); }
        .area-state {
          font-size: 0.7rem;
          font-weight: 500;
          color: #9ca3af;
          margin-left: 2px;
        }
        .area-chip:hover .area-state { color: rgba(255,255,255,0.6); }
        .areas-cta {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .areas-cta p {
          font-size: 1rem;
          color: #6b7280;
        }
      `}</style>
    </section>
  )
}