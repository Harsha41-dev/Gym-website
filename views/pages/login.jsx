const React = require("react");
const MainLayout = require("../layouts/MainLayout");

function Login(props) {
  const { error } = props;

  const scriptContent = `
    document.getElementById('togglePassword').addEventListener('click', function() {
      const passwordInput = document.getElementById('password');
      const icon = this.querySelector('i');
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });

    (function() {
      'use strict';
      var forms = document.querySelectorAll('.needs-validation');
      Array.prototype.slice.call(forms).forEach(function(form) {
        form.addEventListener('submit', function(event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    })();
  `;

  return (
    <MainLayout {...props} stylesheets={["/css/login_register.css"]}>
      <main>
        <div className="container login-container">
          <div className="row w-100">
            <div className="col-md-6 login-form">
              <div className="card">
                <div className="card-header bg-danger text-white text-center py-3">
                  <h3>
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Login to FitSync
                  </h3>
                </div>
                <div className="card-body p-4">
                  {error ? <div className="alert alert-danger">{error}</div> : null}
                  <form action="/auth/login-form" method="POST" className="needs-validation" noValidate>
                    <div className="mb-4">
                      <label htmlFor="email" className="form-label">
                        <i className="fas fa-envelope me-2"></i>
                        Email
                      </label>
                      <input type="email" className="form-control form-control-lg" id="email" name="email" required />
                      <div className="invalid-feedback">Please enter a valid email address.</div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password" className="form-label">
                        <i className="fas fa-lock me-2"></i>
                        Password
                      </label>
                      <div className="input-group">
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          id="password"
                          name="password"
                          required
                        />
                        <button className="btn btn-outline-secondary" type="button" id="togglePassword">
                          <i className="fas fa-eye"></i>
                        </button>
                      </div>
                      <div className="invalid-feedback">Please enter your password.</div>
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-danger btn-lg">
                        <i className="fas fa-sign-in-alt me-2"></i>
                        Login
                      </button>
                    </div>
                  </form>
                  <div className="mt-4 text-center">
                    <p>
                      Don't have an account?{' '}
                      <a href="/auth/register" className="text-danger">
                        Register now
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 login-image"></div>
          </div>
        </div>
      </main>
      <script dangerouslySetInnerHTML={{ __html: scriptContent }} />
    </MainLayout>
  );
}

module.exports = Login;




