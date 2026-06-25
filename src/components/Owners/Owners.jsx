import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, MessageCircle, Award } from 'lucide-react'
import { owners } from '../../data/owners'

function OwnerCard({ owner, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      className="owner-card"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      aria-label={`${owner.name} – ${owner.title}`}
    >
      <div className="owner-image-wrap">
        {/* REPLACE IMAGE: Owner professional headshot / portrait */}
        <img
          src={owner.image}
          alt={`${owner.name} – ${owner.title}`}
          className="owner-img"
          loading="lazy"
        />
        <div className="owner-img-overlay" />
      </div>

      <div className="owner-body">
        <div className="owner-header">
          <div>
            <h3 className="owner-name">{owner.name}</h3>
            <div className="owner-title">{owner.title}</div>
          </div>
          <div className="owner-badge">
            <Award size={18} color="var(--color-accent)" />
          </div>
        </div>

        <p className="owner-bio">{owner.bio}</p>

        <div className="owner-expertise">
          {owner.expertise.map(e => (
            <span key={e} className="expertise-tag">{e}</span>
          ))}
        </div>

        <div className="owner-actions">
          <a href={`tel:${owner.phone}`} className="owner-btn owner-btn-phone" aria-label={`Call ${owner.name}`}>
            <Phone size={16} />
            <span>{owner.phone}</span>
          </a>
          
           <a href={`https://wa.me/${owner.whatsapp}?text=Hi%20${encodeURIComponent(owner.name.split(' ')[0])}%2C%20I%20am%20interested%20in%20Diamond%20Precast%20services.`}
            target="_blank"
            rel="noopener noreferrer"
            className="owner-btn owner-btn-wa"
            aria-label={`WhatsApp ${owner.name}`}
          >
            <MessageCircle size={16} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function Owners() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="owners" className="section-padding owners-section" aria-label="Meet the Owners">
      <div className="container">
        <motion.div
          ref={ref}
          style={{ textAlign: 'center', marginBottom: '64px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>Leadership</div>
          <h2 className="section-title">Meet the Minds<br />Behind Diamond Precast</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Our founders bring decades of combined precast construction expertise and a shared commitment to making every project a showcase of quality.
          </p>
        </motion.div>

        <div className="owners-grid">
          {owners.map((owner, i) => (
            <OwnerCard key={owner.id} owner={owner} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .owners-section { background: var(--color-light-gray); }
        .section-label { justify-content: center; }
        .section-label::before { display: none; }
        .owners-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
          max-width: 960px;
          margin: 0 auto;
        }
        .owner-card {
          background: var(--color-white);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .owner-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-xl);
        }
        .owner-image-wrap {
          position: relative;
          height: 320px;
          overflow: hidden;
        }
        .owner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          transition: transform 0.5s ease;
        }
        .owner-card:hover .owner-img { transform: scale(1.04); }
        .owner-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(13,27,42,0.5) 0%, transparent 60%);
        }
        .owner-body { padding: 32px; }
        .owner-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .owner-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: 4px;
        }
        .owner-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-accent);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .owner-badge {
          width: 44px;
          height: 44px;
          background: rgba(244,163,0,0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .owner-bio {
          font-size: 0.9rem;
          color: #6b7280;
          line-height: 1.75;
          margin-bottom: 20px;
        }
        .owner-expertise {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }
        .expertise-tag {
          padding: 5px 14px;
          background: var(--color-light-gray);
          border-radius: 50px;
          font-size: 0.775rem;
          font-weight: 600;
          color: var(--color-primary);
        }
        .owner-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .owner-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 18px;
          border-radius: 50px;
          font-size: 0.8375rem;
          font-weight: 700;
          transition: all 0.25s ease;
          flex: 1;
          justify-content: center;
          min-width: 0;
        }
        .owner-btn-phone {
          background: var(--color-primary);
          color: var(--color-white);
        }
        .owner-btn-phone:hover { background: #1a2e45; }
        .owner-btn-wa {
          background: #25D366;
          color: #fff;
        }
        .owner-btn-wa:hover { background: #1ebe5d; }
        @media (max-width: 768px) {
          .owners-grid { grid-template-columns: 1fr; max-width: 480px; }
        }
      `}</style>
    </section>
  )
}