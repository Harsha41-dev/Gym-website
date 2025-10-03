const React = require("react");
const MainLayout = require("../layouts/MainLayout");
const fallbackData = require("../utils/fallbackData");

function PendingApproval(props) {
  const defaults = (fallbackData && fallbackData.pendingApproval) || {};
  const data = { ...defaults, ...props };
  const hero = data.hero || {
    heading: "Registration Pending Approval",
    message: "Thank you for registering as a trainer with FitSync!",
  };
  const highlights = Array.isArray(data.highlights) && data.highlights.length
    ? data.highlights
    : [
        "Our admin team will review your application within 24-48 hours.",
        "You'll receive an email notification once a decision has been made.",
        "Feel free to prepare your trainer profile while you wait.",
      ];

  return (
    <MainLayout {...data}>
      <main>
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card bg-dark text-light shadow-lg border-0">
                <div className="card-header bg-warning text-dark text-center py-3">
                  <h2>
                    <i className="fas fa-hourglass-half me-2"></i>
                    {hero.heading}
                  </h2>
                </div>
                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <div className="pending-icon mb-3">
                      <i className="fas fa-user-clock fa-4x text-warning"></i>
                    </div>
                    <p className="lead mb-0">{hero.message}</p>
                  </div>

                  <div className="alert alert-info text-dark">
                    <strong>Your registration is pending admin approval.</strong>
                    <p className="mb-0">
                      Our team will review your application and we will notify you via email once a decision has been
                      made.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4>What happens next?</h4>
                    <ul className="ps-3">
                      {highlights.map((item, index) => (
                        <li key={index} className="mb-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-center">
                    <a href="/" className="btn btn-primary">
                      <i className="fas fa-home me-2"></i>
                      Return to Home
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

module.exports = PendingApproval;
