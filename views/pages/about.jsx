const React = require("react");
const MainLayout = require("../layouts/MainLayout");

function About(props) {
  return (
    <MainLayout {...props} stylesheets={["/css/about.css"]}>
      <main>
        <section className="py-5 about-us-section">
          <div className="container">
            <h1 className="text-center text-danger mb-5">About Us</h1>
            <div className="row">
              <div className="col-md-6">
                <img
                  src="/images/about/about.jpg"
                  alt="About Us"
                  className="img-fluid rounded shadow"
                />
              </div>
              <div className="col-md-6">
                <p className="text-light">
                  Welcome to FitSync! We are dedicated to helping you achieve your fitness goals through personalized
                  training programs, state-of-the-art facilities, and a supportive community. Our team of experienced
                  trainers and staff are here to guide you every step of the way.
                </p>
                <p className="text-light">
                  At FitSync, we believe that fitness is not just about physical strength, but also about mental
                  well-being. We offer a variety of classes and programs designed to help you find balance and improve
                  your overall health.
                </p>
                <p className="text-light">
                  Join us today and become a part of the FitSync family. Together, we can achieve greatness!
                </p>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-4">
                <div className="card bg-dark text-light border-0 shadow card-equal">
                  <div className="card-body">
                    <h5 className="card-title text-danger">Our Mission</h5>
                    <p className="card-text">
                      To inspire and empower individuals to lead healthier, happier lives through fitness and wellness.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-dark text-light border-0 shadow card-equal">
                  <div className="card-body">
                    <h5 className="card-title text-danger">Our Vision</h5>
                    <p className="card-text">
                      To be the leading fitness community, known for our innovative approach and exceptional results.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-dark text-light border-0 shadow card-equal">
                  <div className="card-body">
                    <h5 className="card-title text-danger">Our Values</h5>
                    <p className="card-text">
                      Commitment, Integrity, Excellence, Community, and Innovation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5 meet-trainers-section">
          <div className="container">
            <h2 className="text-center text-danger mb-5">Meet Our Trainers</h2>
            <div className="row">
              <div className="col-md-4">
                <div className="card bg-dark text-light border-0 shadow h-100">
                  <img
                    src="/images/about/trainer1.jpg"
                    alt="Trainer 1"
                    className="card-img-top rounded-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-danger">Prashant Kumar</h5>
                    <p className="card-text">
                      Prashant is a certified personal trainer with over 10 years of experience in the fitness industry.
                      He specializes in strength training and bodybuilding.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-dark text-light border-0 shadow h-100">
                  <img
                    src="/images/about/trainer2.jpg"
                    alt="Trainer 2"
                    className="card-img-top rounded-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-danger">Deepika</h5>
                    <p className="card-text">
                      Deepika is a yoga instructor and wellness coach. She has a passion for helping people achieve
                      balance and harmony through yoga and mindfulness.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-dark text-light border-0 shadow h-100">
                  <img
                    src="/images/about/trainer3.jpg"
                    alt="Trainer 3"
                    className="card-img-top rounded-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-danger">Tanish Garg</h5>
                    <p className="card-text">
                      Tanish is a certified nutritionist and personal trainer. He focuses on creating personalized
                      nutrition plans to help clients reach their fitness goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}

module.exports = About;




