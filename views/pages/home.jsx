const React = require("react");
const MainLayout = require("../layouts/MainLayout");

function Home(props) {
  const { isLoggedIn, userRole } = props;

  const heroStyle = {
    background:
      "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(\"/images/home/top.jpg\")",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
  };

  const inlineStyles = `
    .explore-courses-btn {
      font-size: 1.5rem;
      background-color: var(--primary-color);
      border: none;
      transition: all 0.3s ease;
    }

    .explore-courses-btn:hover {
      background-color: var(--hover-color);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(229, 9, 20, 0.4);
    }
  `;

  return (
    <MainLayout {...props}>
      <style dangerouslySetInnerHTML={{ __html: inlineStyles }} />
      <main>
        <section className="hero-section text-center py-5" style={heroStyle}>
          <div className="container py-5">
            <h1 className="display-3 fw-bold mb-4">
              Welcome to <span className="text-white">Fit</span>
              <span className="text-danger">Sync</span>
            </h1>
            <p className="lead text-white mb-5">
              Your ultimate solution for fitness tracking, personal training sessions, and complete workout management
            </p>
            <div className="d-flex justify-content-center gap-3">
              {!isLoggedIn ? (
                <a href="/auth/login" className="btn btn-danger btn-lg">
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Get Started
                </a>
              ) : (
                <>
                  {userRole === "user" || userRole === "trainer" || userRole === "admin" ? (
                    <a
                      href={
                        userRole === "user"
                          ? "/user/dashboard"
                          : userRole === "trainer"
                          ? "/trainer/dashboard"
                          : "/admin/dashboard"
                      }
                      className="btn btn-danger btn-lg"
                    >
                      <i className="fas fa-tachometer-alt me-2"></i>
                      Dashboard
                    </a>
                  ) : null}
                </>
              )}
              <a href="#features" className="btn btn-outline-light btn-lg">
                <i className="fas fa-info-circle me-2"></i>
                Learn More
              </a>
            </div>
          </div>
        </section>

        <section id="features" className="py-5">
          <div className="container">
            <h2 className="text-center text-danger mb-5">Why Choose FitSync?</h2>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100 text-center p-4">
                  <div className="card-body">
                    <i className="fas fa-calendar-check text-danger mb-3" style={{ fontSize: "3rem" }}></i>
                    <h3 className="card-title">Smart Scheduling</h3>
                    <p className="card-text text-light">
                      Book training sessions with your preferred trainers with just a few clicks. Manage your fitness
                      schedule effortlessly.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 text-center p-4">
                  <div className="card-body">
                    <i className="fas fa-dumbbell text-danger mb-3" style={{ fontSize: "3rem" }}></i>
                    <h3 className="card-title">Personalized Workouts</h3>
                    <p className="card-text text-light">
                      Get customized workout plans designed specifically for your fitness goals and experience level.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 text-center p-4">
                  <div className="card-body">
                    <i className="fas fa-utensils text-danger mb-3" style={{ fontSize: "3rem" }}></i>
                    <h3 className="card-title">Nutrition Tracking</h3>
                    <p className="card-text text-light">
                      Monitor your daily calorie intake and maintain balanced nutrition with our intelligent diet
                      planning tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {(!isLoggedIn || userRole === "user") && (
          <section className="py-5 text-center" style={{ backgroundColor: "var(--dark-bg)" }}>
            <div className="container">
              <a href="/plans" className="btn btn-lg btn-danger px-5 py-3 explore-courses-btn">
                <i className="fas fa-dumbbell me-2"></i>
                Explore Our Fitness Plans
              </a>
            </div>
          </section>
        )}

        <section className="py-5 bg-dark">
          <div className="container">
            <h2 className="text-center text-danger mb-5">What Our Members Say</h2>
            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="d-flex mb-3">
                      <i className="fas fa-quote-left text-danger fa-2x me-2"></i>
                      <div>
                        <p className="card-text text-light">
                          FitSync completely transformed my approach to fitness. The personalized workout plans and
                          trainer booking system are game changers!
                        </p>
                      </div>
                    </div>
                    <p className="text-muted mb-0">- Pushp, Member since 2023</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="d-flex mb-3">
                      <i className="fas fa-quote-left text-danger fa-2x me-2"></i>
                      <div>
                        <p className="card-text text-light">
                          As a trainer, FitSync makes it easy to manage my schedule and connect with clients. The
                          platform is intuitive and powerful!
                        </p>
                      </div>
                    </div>
                    <p className="text-muted mb-0">- Harsha, Fitness Trainer</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="d-flex mb-3">
                      <i className="fas fa-quote-left text-danger fa-2x me-2"></i>
                      <div>
                        <p className="card-text text-light">
                          The nutrition tracking feature helped me to achieve my weight loss goals. I have lost 20 pounds
                          in just 3 months of fitness plans using FitSync!
                        </p>
                      </div>
                    </div>
                    <p className="text-muted mb-0">- Siddhant, Premium Member</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5 text-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <h2 className="text-danger mb-4">Ready to transform your fitness journey?</h2>
                <p className="text-light mb-5">
                  Join thousands of members who have already improved their health and fitness with FitSync.
                </p>
                <div className="d-grid gap-2 d-md-block">
                  {!isLoggedIn ? (
                    <a href="/auth/register" className="btn btn-danger btn-lg me-md-2">
                      Join Now <i className="fas fa-arrow-right ms-2"></i>
                    </a>
                  ) : null}
                  {isLoggedIn && userRole === "user" ? (
                    <a href="/user/dashboard" className="btn btn-danger btn-lg me-md-2">
                      Go to Dashboard <i className="fas fa-tachometer-alt ms-2"></i>
                    </a>
                  ) : null}
                  <a href="/about" className="btn btn-outline-light btn-lg">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>\n      </main>
    </MainLayout>
  );
}

module.exports = Home;









