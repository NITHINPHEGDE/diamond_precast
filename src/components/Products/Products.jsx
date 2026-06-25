import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { products } from '../../data/products'

function ProductCard({ product, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      className="product-card"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      aria-label={product.title}
    >
      <div className="product-image-wrap">
        <img
          src={product.image}
          alt={product.title}
          className="product-img"
          loading="lazy"
        />
        <div className="product-badge">{product.badge}</div>
        <div className="product-img-overlay" />
      </div>
      <div className="product-body">
        <div className="product-specs-tag">{product.specs}</div>
        <h3 className="product-title">{product.title}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-materials">
          <div className="materials-label">Materials Used</div>
          <ul className="materials-list">
            {product.materials.map(m => (
              <li key={m} className="material-item">
                <CheckCircle size={14} color="var(--color-accent)" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
        
          <a href="tel:+919876543210"
          className="product-cta"
          aria-label={`Enquire about ${product.title}`}
        >
          Enquire Now <ArrowRight size={16} />
        </a>
      </div>
    </motion.article>
  )
}

export default function Products() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="products" className="section-padding products-section" aria-label="Our Products">
      <div className="container">
        <motion.div
          ref={ref}
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Our Products</div>
          <h2 className="section-title">Precision-Engineered<br />Precast Solutions</h2>
          <p className="section-subtitle">
            Every product in our portfolio is factory-cast to exacting standards, tested for strength and delivered ready to install — saving you time and cost on site.
          </p>
        </motion.div>

        <div className="products-grid">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .products-section {
          background: var(--color-light-gray);
        }
        .section-header {
          text-align: center;
          margin-bottom: 64px;
        }
        .section-header .section-label {
          justify-content: center;
        }
        .section-header .section-label::before {
          display: none;
        }
        .section-header .section-subtitle {
          margin: 0 auto;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .product-card {
          background: var(--color-white);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-xl);
        }
        .product-image-wrap {
          position: relative;
          height: 220px;
          overflow: hidden;
        }
        .product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .product-card:hover .product-img { transform: scale(1.05); }
        .product-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(13,27,42,0.4) 0%, transparent 60%);
        }
        .product-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          background: var(--color-accent);
          color: var(--color-primary);
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 5px 12px;
          border-radius: 50px;
        }
        .product-body {
          padding: 28px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .product-specs-tag {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-accent);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 8px;
        }
        .product-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: 12px;
          line-height: 1.3;
        }
        .product-desc {
          font-size: 0.875rem;
          color: #6b7280;
          line-height: 1.7;
          margin-bottom: 20px;
        }
        .product-materials {
          margin-bottom: 24px;
          flex: 1;
        }
        .materials-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-primary);
          margin-bottom: 10px;
        }
        .materials-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .material-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8125rem;
          color: #374151;
        }
        .product-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--color-primary);
          padding: 12px 0;
          border-top: 1px solid #f0f0f0;
          transition: color 0.2s, gap 0.2s;
        }
        .product-cta:hover { color: var(--color-accent); gap: 12px; }
        @media (max-width: 1024px) {
          .products-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .products-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}