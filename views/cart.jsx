const React = require("react");
const ejs = require("ejs");
const MainLayout = require("./layouts/MainLayout");
const fallbackData = require("./utils/fallbackData");

const template = "<div class=\"container py-5\">\n    <h1 class=\"mb-4\">Shopping Cart</h1>\n    \n    <div class=\"row\">\n        <div class=\"col-lg-8\">\n            <% if (cart && cart.items && cart.items.length > 0) { %>\n                <div class=\"card shadow-sm\">\n                    <div class=\"card-body\">\n                        <% cart.items.forEach(item => { %>\n                            <div class=\"cart-item d-flex align-items-center py-3\">\n                                <div class=\"flex-shrink-0\">\n                                    <img src=\"<%= item.product.image %>\" alt=\"<%= item.product.name %>\" class=\"img-thumbnail\" style=\"width: 100px; height: 100px; object-fit: cover;\">\n                                </div>\n                                <div class=\"flex-grow-1 ms-3\">\n                                    <h5 class=\"mb-1\"><%= item.product.name %></h5>\n                                    <p class=\"text-muted mb-2\">$<%= item.price.toFixed(2) %></p>\n                                    <div class=\"d-flex align-items-center\">\n                                        <div class=\"input-group quantity-control\">\n                                            <button class=\"btn btn-outline-secondary\" type=\"button\" onclick=\"updateQuantity('<%= item.product._id %>', <%= Math.max(1, item.quantity - 1) %>)\">-</button>\n                                            <input type=\"number\" class=\"form-control text-center\" value=\"<%= item.quantity %>\" min=\"1\" max=\"<%= item.product.stock || 99 %>\" readonly>\n                                            <button class=\"btn btn-outline-secondary\" type=\"button\" onclick=\"updateQuantity('<%= item.product._id %>', <%= item.quantity + 1 %>)\">+</button>\n                                        </div>\n                                        <button class=\"btn btn-danger ms-3\" onclick=\"removeFromCart('<%= item.product._id %>')\">\n                                            <i class=\"bi bi-trash\"></i>\n                                        </button>\n                                    </div>\n                                </div>\n                                <div class=\"ms-3 text-end\">\n                                    <h5 class=\"mb-0\">$<%= (item.price * item.quantity).toFixed(2) %></h5>\n                                </div>\n                            </div>\n                        <% }); %>\n                    </div>\n                </div>\n            <% } else { %>\n                <div class=\"card shadow-sm\">\n                    <div class=\"card-body text-center py-5\">\n                        <i class=\"bi bi-cart3 display-1 text-muted mb-3\"></i>\n                        <h3>Your cart is empty</h3>\n                        <p class=\"text-muted\">Add some items to your cart to see them here.</p>\n                        <a href=\"/marketplace\" class=\"btn btn-primary mt-3\">Continue Shopping</a>\n                    </div>\n                </div>\n            <% } %>\n        </div>\n        \n        <div class=\"col-lg-4\">\n            <div class=\"card shadow-sm\">\n                <div class=\"card-body\">\n                    <h4 class=\"card-title mb-4\">Order Summary</h4>\n                    <div class=\"d-flex justify-content-between mb-3\">\n                        <span>Subtotal</span>\n                        <span>$<%= cart ? cart.totalAmount.toFixed(2) : '0.00' %></span>\n                    </div>\n                    <div class=\"d-flex justify-content-between mb-3\">\n                        <span>Shipping</span>\n                        <span>Free</span>\n                    </div>\n                    <hr>\n                    <div class=\"d-flex justify-content-between mb-4\">\n                        <strong>Total</strong>\n                        <strong>$<%= cart ? cart.totalAmount.toFixed(2) : '0.00' %></strong>\n                    </div>\n                    <% if (cart && cart.items && cart.items.length > 0) { %>\n                        <button class=\"btn btn-primary w-100\" onclick=\"checkout()\">\n                            Proceed to Checkout\n                        </button>\n                    <% } else { %>\n                        <button class=\"btn btn-primary w-100\" disabled>\n                            Proceed to Checkout\n                        </button>\n                    <% } %>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";
const externalScripts = ["/js/cart.js"];

function Cart(props) {
  const defaults = (fallbackData && fallbackData.cart) || {};
  const data = { ...defaults, ...props };
  const defaultLocals = defaults.locals || {};
  const overrideLocals = props && props.locals ? props.locals : {};
  const locals = {
    ...defaultLocals,
    ...overrideLocals,
    isLoggedIn: data.isLoggedIn ?? defaultLocals.isLoggedIn ?? false,
    userRole: data.userRole ?? defaultLocals.userRole ?? "guest",
  };

  data.locals = locals;

  const html = ejs.render(template, data);

  return (
    <MainLayout {...data} scripts={externalScripts}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </MainLayout>
  );
}

module.exports = Cart;
