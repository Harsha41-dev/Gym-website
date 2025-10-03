const React = require("react");
const MainLayout = require("../layouts/MainLayout");

const fallbackProducts = [
  {
    _id: "1",
    name: "Premium Protein Powder",
    description: "High-quality whey protein blend for muscle recovery.",
    price: 249900,
    stock: 12,
    image: "/images/products/protein-powder.jpg",
  },
  {
    _id: "2",
    name: "Resistance Bands Set",
    description: "Set of 5 resistance bands for full-body workouts.",
    price: 149900,
    stock: 20,
    image: "/images/products/resistance-bands.jpg",
  },
  {
    _id: "3",
    name: "Smart Fitness Tracker",
    description: "Track your workouts, heart rate, and sleep patterns.",
    price: 399900,
    stock: 0,
    image: "/images/products/fitness-tracker.jpg",
  },
  {
    _id: "4",
    name: "Hydration Water Bottle",
    description: "Insulated water bottle keeps drinks cold for 12 hours.",
    price: 79900,
    stock: 35,
    image: "/images/products/water-bottle.jpg",
  },
];

function formatPrice(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "0.00";
  }
  return (value / 100).toFixed(2);
}

function Marketplace(props) {
  const { isLoggedIn } = props;
  const products = Array.isArray(props.products) && props.products.length ? props.products : fallbackProducts;

  const scriptContent = `
    document.addEventListener('DOMContentLoaded', function() {
      document.body.addEventListener('click', async function(event) {
        const target = event.target.closest('[data-action]');
        if (!target) return;
        const productId = target.getAttribute('data-product-id');
        if (!productId) return;
        if (target.dataset.disabled === 'true') {
          event.preventDefault();
          return;
        }
        if (target.getAttribute('data-action') === 'add-to-cart') {
          await addToCart(productId);
        }
        if (target.getAttribute('data-action') === 'buy-now') {
          await buyNow(productId);
        }
      });
    });

    async function addToCart(productId) {
      try {
        const response = await fetch('/api/marketplace/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId })
        });
        const data = await response.json();
        if (response.ok) {
          alert('Product added to cart!');
        } else {
          alert(data.message || 'Failed to add product to cart');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to add product to cart');
      }
    }

    async function buyNow(productId) {
      try {
        const response = await fetch('/api/marketplace/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId })
        });
        const data = await response.json();
        if (response.ok) {
          window.location.href = '/marketplace/checkout';
        } else {
          alert(data.message || 'Failed to process purchase');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to process purchase');
      }
    }
  `;

  return (
    <MainLayout {...props}>
      <main className="py-5">
        <div className="container">
          <h1 className="text-center text-danger mb-5">FitSync Marketplace</h1>
          <div className="row g-4">
            {products.length > 0 ? (
              products.map((product, index) => {
                const stock = typeof product.stock === "number" ? product.stock : 0;
                const inStock = stock > 0;
                const priceValue = typeof product.price === "number" ? product.price : 0;
                const imageSrc = product.image || fallbackProducts[index % fallbackProducts.length].image;
                const productId = product._id || `product-${index}`;

                return (
                  <div className="col-md-4 col-lg-3" key={`${productId}-${index}`}>
                    <div className="card h-100">
                      <img
                        src={imageSrc}
                        className="card-img-top"
                        alt={product.name}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text text-muted">{product.description}</p>
                        <p className="card-text">
                          <strong className="text-danger">₹{formatPrice(priceValue)}</strong>
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className={`badge bg-${inStock ? "success" : "danger"}`}>
                            {inStock ? "In Stock" : "Out of Stock"}
                          </span>
                          {isLoggedIn ? (
                            <div className="btn-group">
                              <button
                                className="btn btn-outline-danger btn-sm"
                                data-action="add-to-cart"
                                data-product-id={productId}
                                data-disabled={inStock ? "false" : "true"}
                                disabled={!inStock}
                              >
                                <i className="fas fa-cart-plus"></i> Add to Cart
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                data-action="buy-now"
                                data-product-id={productId}
                                data-disabled={inStock ? "false" : "true"}
                                disabled={!inStock}
                              >
                                Buy Now
                              </button>
                            </div>
                          ) : (
                            <a href="/auth/login?returnTo=/marketplace" className="btn btn-outline-danger btn-sm">
                              <i className="fas fa-sign-in-alt"></i> Login to Purchase
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-12 text-center">
                <p className="lead">No products available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <script dangerouslySetInnerHTML={{ __html: scriptContent }} />
    </MainLayout>
  );
}

module.exports = Marketplace;




