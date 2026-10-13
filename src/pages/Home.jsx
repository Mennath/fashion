
import { Link } from "react-router-dom";
import { products } from "../data";
import { ProductCard } from "../App";

export default function Home() {
  return (
    <div>
      <section className="hero">
        <div className="hero-text">
          <span>COLLECTION 2026</span>
          <h1>
            اكتشف أسلوبك
            <br />
            <span>بأناقة مختلفة</span>
          </h1>
          <p>
            اكتشف أحدث صيحات الموضة واختر إطلالتك
            المفضلة من مجموعتنا الجديدة.
          </p>
          <Link to="/products" className="hero-btn">
            تسوق الآن
          </Link>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000"
            alt="مجموعة أزياء عصرية"
          />
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="category">اختياراتنا لك</span>
            <h2>منتجات مميزة</h2>
          </div>
          <Link to="/products" className="text-link">
            عرض كل المنتجات ←
          </Link>
        </div>

        <div className="products-grid">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="promo">
        <h2>إطلالتك الجديدة في انتظارك</h2>
        <p>اختار قطعك المفضلة واجمع إطلالة تناسبك.</p>
        <Link to="/products" className="hero-btn">
          اكتشف المجموعة
        </Link>
      </section>
    </div>
  );
}
