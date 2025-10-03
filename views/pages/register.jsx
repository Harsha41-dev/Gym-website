const React = require("react");
const MainLayout = require("../layouts/MainLayout");

function Register(props) {
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

    document.getElementById('role').addEventListener('change', function() {
      const trainerCourses = document.getElementById('trainer-courses');
      if (this.value === 'trainer') {
        trainerCourses.style.display = 'block';
      } else {
        trainerCourses.style.display = 'none';
      }
    });

    const form = document.querySelector('form');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    form.addEventListener('submit', function(event) {
      if (password.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity("Passwords don't match");
        event.preventDefault();
      } else {
        confirmPassword.setCustomValidity('');
      }
    });

    confirmPassword.addEventListener('input', function() {
      if (password.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity("Passwords don't match");
      } else {
        confirmPassword.setCustomValidity('');
      }
    });
  `;

  return (
    <MainLayout {...props} stylesheets={["/css/login_register.css"]}>
      <main>
        <div className="container register-container">
          <div className="row w-100">
            <div className="col-md-6 register-form">
              <div className="card">
                <div className="card-header bg-danger text-white text-center py-3">
                  <h3>
                    <i className="fas fa-user-plus me-2"></i>
                    Create an Account
                  </h3>
                </div>
                <div className="card-body p-4">
                  {error ? <div className="alert alert-danger">{error}</div> : null}
                  <form action="/auth/register-form" method="POST" className="needs-validation" noValidate>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <label htmlFor="name" className="form-label">
                          <i className="fas fa-user me-2"></i>
                          Full Name
                        </label>
                        <input type="text" className="form-control form-control-lg" id="name" name="name" required />
                        <div className="invalid-feedback">Please enter your name.</div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <label htmlFor="email" className="form-label">
                          <i className="fas fa-envelope me-2"></i>
                          Email
                        </label>
                        <input type="email" className="form-control form-control-lg" id="email" name="email" required />
                        <div className="invalid-feedback">Please enter a valid email address.</div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <label htmlFor="gender" className="form-label">
                          <i className="fas fa-venus-mars me-2"></i>
                          Gender
                        </label>
                        <select className="form-select form-select-lg" id="gender" name="gender" defaultValue="">
                          <option value="" disabled>
                            Select gender
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-4">
                        <label htmlFor="age" className="form-label">
                          <i className="fas fa-birthday-cake me-2"></i>
                          Age
                        </label>
                        <input type="number" className="form-control form-control-lg" id="age" name="age" min="16" max="120" />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
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
                        <div className="invalid-feedback">Please enter a password.</div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <label htmlFor="confirmPassword" className="form-label">
                          <i className="fas fa-lock me-2"></i>
                          Confirm Password
                        </label>
                        <input type="password" className="form-control form-control-lg" id="confirmPassword" required />
                        <div className="invalid-feedback">Passwords must match.</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="role" className="form-label">
                        <i className="fas fa-user-tag me-2"></i>
                        Account Type
                      </label>
                      <select className="form-select form-select-lg" id="role" name="role" required defaultValue="">
                        <option value="" disabled>
                          Select your account type
                        </option>
                        <option value="user">Gym Member</option>
                        <option value="trainer">Fitness Trainer</option>
                      </select>
                      <div className="invalid-feedback">Please select an account type.</div>
                    </div>

                    <div id="trainer-courses" className="mb-4" style={{ display: 'none' }}>
                      <label htmlFor="courses" className="form-label">
                        <i className="fas fa-dumbbell me-2"></i>
                        Select Courses to Teach
                      </label>
                      <div className="form-text mb-2">Select which courses you'd like to teach</div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" name="courses" value="strength training" id="course1" />
                            <label className="form-check-label" htmlFor="course1">
                              Strength Training
                            </label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" name="courses" value="yoga" id="course2" />
                            <label className="form-check-label" htmlFor="course2">
                              Yoga
                            </label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" name="courses" value="zumba" id="course3" />
                            <label className="form-check-label" htmlFor="course3">
                              Zumba
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4 form-check">
                      <input type="checkbox" className="form-check-input" id="termsCheck" required />
                      <label className="form-check-label" htmlFor="termsCheck">
                        I agree to the{' '}
                        <a href="#" className="text-danger">
                          Terms & Conditions
                        </a>
                      </label>
                      <div className="invalid-feedback">You must agree before submitting.</div>
                    </div>

                    <div className="d-grid">
                      <button type="submit" className="btn btn-danger btn-lg">
                        <i className="fas fa-user-plus me-2"></i>
                        Register
                      </button>
                    </div>
                  </form>
                  <div className="mt-4 text-center">
                    <p>
                      Already have an account?{' '}
                      <a href="/auth/login" className="text-danger">
                        Login here
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <script dangerouslySetInnerHTML={{ __html: scriptContent }} />
    </MainLayout>
  );
}

module.exports = Register;




