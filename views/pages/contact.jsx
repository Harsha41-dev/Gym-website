const React = require("react");
const MainLayout = require("../layouts/MainLayout");

function Contact(props) {
  return (
    <MainLayout {...props}>
      <main>
        <section className="py-5">
          <div className="container">
            <h1 className="text-center text-danger mb-5">Contact Us</h1>
            <div className="row">
              <div className="col-md-6 mb-4">
                <h3 className="text-danger">Our Location</h3>
                <p className="text-light">
                  Visit us at our gym or reach out to us through our contact form. We're here to help you achieve your
                  fitness goals!
                </p>
                <div className="embed-responsive embed-responsive-16by9 mb-4" style={{ height: "300px" }}>
                  <iframe
                    className="embed-responsive-item"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019287508227!2d144.9631579153167!3d-37.8141079797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1f9e1e5e1e9!2s123%20Fitness%20St%2C%20Gym%20City!5e0!3m2!1sen!2sau!4v1614311234567!5m2!1sen!2sau"
                    allowFullScreen
                    style={{ width: "100%", height: "100%" }}
                    title="FitSync Location"
                  ></iframe>
                </div>
                <h3 className="text-danger">Operating Hours</h3>
                <ul className="list-unstyled text-light">
                  <li>Monday - Friday: 6:00 AM - 10:00 PM</li>
                  <li>Saturday: 8:00 AM - 8:00 PM</li>
                  <li>Sunday: 8:00 AM - 6:00 PM</li>
                </ul>
              </div>
              <div className="col-md-6">
                <h3 className="text-danger">Send Us a Message</h3>
                <form action="/contact" method="POST">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label text-light">
                      Name
                    </label>
                    <input type="text" className="form-control" id="name" name="name" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label text-light">
                      Email
                    </label>
                    <input type="email" className="form-control" id="email" name="email" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label text-light">
                      Message
                    </label>
                    <textarea className="form-control" id="message" name="message" rows="5" required></textarea>
                  </div>
                  <button type="submit" className="btn btn-danger">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}

module.exports = Contact;




