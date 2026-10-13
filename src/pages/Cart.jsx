
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, total, removeFromCart, changeQuantity } = useCart();

  if (cart.length === 0) {
    return (
      <section className="section empty">
        <h1>سلة المشتريات فارغة 🛍️</h1>
        <p>لم تضف أي منتجات حتى الآن.</p>
        <Link to="/products" className="hero-btn">
          تصفح المنتجات
        </Link>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="page-heading">
        <h1>سلة المشتريات</h1>
        <p>راجع منتجاتك قبل إتمام الطلب.</p>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>{item.price} جنيه</p>

                <div className="quantity">
                  <button
                    onClick={() => changeQuantity(item.id, -1)}
                    aria-label="تقليل الكمية"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => changeQuantity(item.id, 1)}
                    aria-label="زيادة الكمية"
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  حذف المنتج
                </button>
              </div>

              <strong>
                {item.price * item.quantity} جنيه
              </strong>
            </div>
          ))}
        </div>

        <aside className="summary">
          <h2>ملخص الطلب</h2>
          <div className="summary-line">
            <span>عدد القطع</span>
            <span>
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <div className="summary-line">
            <span>الإجمالي</span>
            <strong>{total} جنيه</strong>
          </div>
          <p className="muted">تكلفة الشحن تحدد عند تجهيز الطلب.</p>
          <Link to="/checkout" className="hero-btn full-btn">
            إتمام الطلب
          </Link>
        </aside>
      </div>
    </section>
  );
}
