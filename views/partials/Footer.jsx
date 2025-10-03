const React = require("react");

function Footer() {
  return (
    <footer className="text-center p-5" style={{ backgroundColor: "#212121" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="text-danger">FitSync</h5>
            <p className="text-light">
              FitSync is dedicated to helping you achieve your fitness goals with personalized training and nutrition
              plans.
            </p>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="text-danger">Get in Touch</h5>
            <ul className="list-unstyled text-light">
              <li>
                <i className="fas fa-map-marker-alt me-2"></i>
                123 Fitness St, Gym City
              </li>
              <li>
                <i className="fas fa-envelope me-2"></i>
                info@fitsync.com
              </li>
              <li>
                <i className="fas fa-phone me-2"></i>
                +1 234 567 890
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="text-danger">Quick Links</h5>
            <ul className="list-unstyled text-light">
              <li>
                <a href="/about" className="text-light">
                  <i className="fas fa-info-circle me-2"></i>
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-light">
                  <i className="fas fa-envelope me-2"></i>
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/gallery" className="text-light">
                  <i className="fas fa-images me-2"></i>
                  Gallery
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="bg-light" />
        <p className="m-0 text-light">&copy; 2025 FitSync Gym Management</p>
      </div>
    </footer>
  );
}

module.exports = Footer;
