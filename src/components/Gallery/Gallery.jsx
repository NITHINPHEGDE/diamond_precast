import React, { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import { ZoomIn } from 'lucide-react'
import { galleryImages } from '../../data/gallery'

const categories = ['All', ...Array.from(new Set(galleryImages.map(g => g.category)))]

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const filtered = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(g => g.category === activeCategory)

  return (
    <section id="gallery" className="section-padding gallery-section" aria-label="Project Gallery">
      <div className="container">
        <motion.div
          ref={ref}
          style={{ textAlign: 'center', marginBottom: '48px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>Project Gallery</div>
          <h2 className="section-title">Our Work Speaks<br />For Itself</h2>
          <p className="section-subtitle" style={{ margin: '0 auto 36px' }}>
            Browse completed projects from across Karnataka — compound walls, slabs, columns, labour rooms and more.
          </p>

          {/* Category Filter */}
          <div className="gallery-filters" role="tablist" aria-label="Gallery filter">
            {categories.map(cat => (
              <button
                key={cat}
                className={`gallery-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                role="tab"
                aria-selected={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <PhotoProvider
          speed={() => 300}
          easing={type => type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)'}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="gallery-masonry"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.map((img, i) => (
                <motion.div
                  key={img.id}
                  className="gallery-item"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <PhotoView src={img.src}>
                    <div className="gallery-thumb-wrap" role="button" tabIndex={0} aria-label={`View ${img.alt}`}>
                      <img
                        src={img.thumb}
                        alt={img.alt}
                        className="gallery-thumb"
                        loading="lazy"
                      />
                      <div className="gallery-overlay">
                        <div className="gallery-zoom-icon">
                          <ZoomIn size={22} color="white" />
                        </div>
                        <div className="gallery-item-label">{img.alt}</div>
                      </div>
                      <div className="gallery-category-tag">{img.category}</div>
                    </div>
                  </PhotoView>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </PhotoProvider>
      </div>

      <style>{`
        .gallery-section { background: var(--color-white); }
        .gallery-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }
        .gallery-filter-btn {
          padding: 8px 20px;
          border-radius: 50px;
          font-size: 0.8125rem;
          font-weight: 600;
          background: var(--color-light-gray);
          color: var(--color-dark-text);
          border: 1.5px solid transparent;
          transition: all 0.25s ease;
        }
        .gallery-filter-btn:hover,
        .gallery-filter-btn.active {
          background: var(--color-primary);
          color: var(--color-white);
          border-color: var(--color-primary);
        }
        .gallery-filter-btn.active {
          box-shadow: 0 4px 16px rgba(13,27,42,0.25);
        }
        .gallery-masonry {
          columns: 3;
          column-gap: 16px;
        }
        .gallery-item {
          break-inside: avoid;
          margin-bottom: 16px;
        }
        .gallery-thumb-wrap {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          display: block;
        }
        .gallery-thumb {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 16px;
          transition: transform 0.4s ease;
        }
        .gallery-thumb-wrap:hover .gallery-thumb { transform: scale(1.04); }
        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(13,27,42,0.7) 0%, rgba(13,27,42,0.1) 60%, transparent 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 16px;
        }
        .gallery-thumb-wrap:hover .gallery-overlay { opacity: 1; }
        .gallery-zoom-icon {
          width: 52px;
          height: 52px;
          border: 2px solid rgba(255,255,255,0.7);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }
        .gallery-thumb-wrap:hover .gallery-zoom-icon { transform: scale(1.1); }
        .gallery-item-label {
          position: absolute;
          bottom: 14px;
          left: 14px;
          right: 14px;
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
          text-align: left;
        }
        .gallery-category-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(244,163,0,0.9);
          color: var(--color-primary);
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 4px 10px;
          border-radius: 50px;
        }
        @media (max-width: 1024px) {
          .gallery-masonry { columns: 2; }
        }
        @media (max-width: 580px) {
          .gallery-masonry { columns: 1; }
        }
      `}</style>
    </section>
  )
}