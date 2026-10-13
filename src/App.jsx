
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { CartProvider, useCart } from "./context/CartContext";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import "./style.css";

function Navbar() {
  const { cart } = useCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="navbar">
      <Link to="/" className="logo">LUXE.</Link>

      <nav>
        <Link to="/">الرئيسية</Link>
        <Link to="/products">المنتجات</Link>
        <Link to="/cart">السلة ({count})</Link>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <h3>LUXE. Fashion</h3>
      <p>أناقتك تبدأ من هنا ✨</p>
      <p>© 2026 جميع الحقوق محفوظة</p>
    </footer>
  );
}

export function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <Link to={`/products#product-${product.id}`}>
        <img src={product.image} alt={product.name} />
      </Link>

      <div className="product-info">
        <span className="category">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="price">{product.price} جنيه</p>
        <button onClick={() => addToCart(product)}>
          أضف إلى السلة +
        </button>
      </div>
    </article>
  );
}

function Layout() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </CartProvider>
  );
}
