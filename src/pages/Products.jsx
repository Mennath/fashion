
import { useState } from "react";
import { products } from "../data";
import { ProductCard } from "../App";

export default function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("الكل");

  const categories = [
    "الكل",
    ...new Set(products.map((p) => p.category))
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "الكل" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="section">
      <div className="page-heading">
        <span className="category">اكتشف مجموعتنا</span>
        <h1>كل المنتجات</h1>
        <p>اختار القطع التي تناسب ذوقك.</p>
      </div>

      <input
        className="search-input"
        type="search"
        placeholder="ابحث عن منتج..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filters">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? "filter active" : "filter"}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div id={`product-${product.id}`} key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="empty">لا توجد منتجات مطابقة للبحث.</p>
      )}
    </section>
  );
}
