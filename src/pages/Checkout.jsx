
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "cash"
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (cart.length === 0) {
      setError("السلة فارغة. أضف منتجات أولًا.");
      return;
    }

    // محاكاة إتمام الطلب محليًا
    const order = {
      ...form,
      items: cart,
      total,
      createdAt: new Date().toISOString()
    };

    const orders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    localStorage.setItem(
      "orders",
      JSON.stringify([...orders, order])
    );

    clearCart();
    navigate("/", { state: { orderSuccess: true } });
  }

  if (cart.length === 0) {
    return (
      <section className="section empty">
        <h1>لا توجد منتجات لإتمام الطلب</h1>
        <Link to="/products" className="hero-btn">
          العودة للمنتجات
        </Link>
      </section>
    );
  }

  return (
    <section className="section checkout-section">
      <div className="page-heading">
        <h1>إتمام الطلب</h1>
        <p>أدخل بيانات التوصيل لمتابعة طلبك.</p>
      </div>

      <div className="cart-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <label>الاسم بالكامل</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="اكتب اسمك"
            required
          />

          <label>رقم الهاتف</label>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="رقم الهاتف"
            required
          />

          <label>عنوان التوصيل</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="المحافظة، المنطقة، الشارع..."
            required
            rows={4}
          />

          <label>طريقة الدفع</label>
          <select
            name="payment"
            value={form.payment}
            onChange={handleChange}
          >
            <option value="cash">الدفع عند الاستلام</option>
            <option value="wallet">محفظة إلكترونية (تجريبي)</option>
          </select>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="hero-btn full-btn">
            تأكيد الطلب — {total} جنيه
          </button>
        </form>

        <aside className="summary">
          <h2>ملخص طلبك</h2>
          {cart.map((item) => (
            <div className="summary-line" key={item.id}>
              <span>{item.name} × {item.quantity}</span>
              <span>{item.price * item.quantity} ج</span>
            </div>
          ))}
          <hr />
          <div className="summary-line">
            <strong>الإجمالي</strong>
            <strong>{total} جنيه</strong>
          </div>
        </aside>
      </div>
    </section>
  );
}
