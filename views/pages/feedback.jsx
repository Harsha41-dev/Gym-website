const React = require("react");
const MainLayout = require("../layouts/MainLayout");

function Feedback(props) {
  const validationScript = `
    (function () {
      'use strict'
      var forms = document.querySelectorAll('.needs-validation')
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            } else {
              event.preventDefault();
              alert('Your feedback has been submitted successfully!');
            }
            form.classList.add('was-validated')
          }, false)
        })
    })()
  `;

  return (
    <MainLayout {...props}>
      <main>
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header bg-danger text-white text-center py-3">
                  <h3>
                    <i className="fas fa-comment-dots me-2"></i>
                    Provide Feedback
                  </h3>
                </div>
                <div className="card-body p-4">
                  <form id="feedbackForm" className="needs-validation" noValidate>
                    <div className="mb-4">
                      <label htmlFor="planId" className="form-label">
                        Plan ID
                      </label>
                      <input type="text" className="form-control" id="planId" name="planId" required />
                      <div className="invalid-feedback">Please provide a valid Plan ID.</div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="feedback" className="form-label">
                        Feedback
                      </label>
                      <textarea className="form-control" id="feedback" name="feedback" rows={5} required></textarea>
                      <div className="invalid-feedback">Please provide your feedback.</div>
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">
                        Submit Feedback
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <script dangerouslySetInnerHTML={{ __html: validationScript }} />
    </MainLayout>
  );
}

module.exports = Feedback;




