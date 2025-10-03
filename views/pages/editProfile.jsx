const React = require("react");
const ejs = require("ejs");
const MainLayout = require("../layouts/MainLayout");
const fallbackData = require("../utils/fallbackData");

const template = "<main>\n  <div class=\"container my-5\">\n    <div class=\"row justify-content-center\">\n      <div class=\"col-md-8\">\n        <div class=\"card\">\n          <div class=\"card-header bg-danger text-white text-center py-3\">\n            <h3><i class=\"fas fa-user-edit me-2\"></i>Edit Profile</h3>\n          </div>\n          <div class=\"card-body p-4\">\n            <!-- Display success/error messages if they exist -->\n            <% if (locals.success) { %>\n              <div class=\"alert alert-success\">\n                <%= success %>\n              </div>\n            <% } %>\n            <% if (locals.error) { %>\n              <div class=\"alert alert-danger\">\n                <%= error %>\n              </div>\n            <% } %>\n            \n            <form action=\"/user/profile\" method=\"POST\" class=\"needs-validation\" novalidate>\n              <div class=\"row mb-3\">\n                <div class=\"col-md-6\">\n                  <label for=\"name\" class=\"form-label\"><i class=\"fas fa-user me-2\"></i>Full Name</label>\n                  <input type=\"text\" class=\"form-control form-control-lg\" id=\"name\" name=\"name\" value=\"<%= user.name %>\" required>\n                  <div class=\"invalid-feedback\">Please enter your name.</div>\n                </div>\n                <div class=\"col-md-6\">\n                  <label for=\"email\" class=\"form-label\"><i class=\"fas fa-envelope me-2\"></i>Email</label>\n                  <input type=\"email\" class=\"form-control form-control-lg\" id=\"email\" name=\"email\" value=\"<%= user.email %>\" required>\n                  <div class=\"invalid-feedback\">Please enter a valid email address.</div>\n                </div>\n              </div>\n              \n              <div class=\"row mb-3\">\n                <div class=\"col-md-6\">\n                  <label for=\"gender\" class=\"form-label\"><i class=\"fas fa-venus-mars me-2\"></i>Gender</label>\n                  <select class=\"form-select form-select-lg\" id=\"gender\" name=\"gender\">\n                    <option value=\"\">Select gender</option>\n                    <option value=\"male\" <%= user.gender === 'male' ? 'selected' : '' %>>Male</option>\n                    <option value=\"female\" <%= user.gender === 'female' ? 'selected' : '' %>>Female</option>\n                    <option value=\"other\" <%= user.gender === 'other' ? 'selected' : '' %>>Other</option>\n                    <option value=\"prefer-not-to-say\" <%= user.gender === 'prefer-not-to-say' ? 'selected' : '' %>>Prefer not to say</option>\n                  </select>\n                </div>\n                <div class=\"col-md-6\">\n                  <label for=\"age\" class=\"form-label\"><i class=\"fas fa-birthday-cake me-2\"></i>Age</label>\n                  <input type=\"number\" class=\"form-control form-control-lg\" id=\"age\" name=\"age\" value=\"<%= user.age || '' %>\" min=\"1\" max=\"120\">\n                </div>\n              </div>\n              \n              <div class=\"mb-3\">\n                <label for=\"password\" class=\"form-label\"><i class=\"fas fa-lock me-2\"></i>New Password (leave blank to keep current)</label>\n                <div class=\"input-group\">\n                  <input type=\"password\" class=\"form-control form-control-lg\" id=\"password\" name=\"password\">\n                  <button class=\"btn btn-outline-secondary\" type=\"button\" id=\"togglePassword\">\n                    <i class=\"fas fa-eye\"></i>\n                  </button>\n                </div>\n                <div class=\"form-text text-light\">\n                  <small>Only fill this if you want to change your password</small>\n                </div>\n              </div>\n              \n              <div class=\"d-grid gap-2 mt-4\">\n                <button type=\"submit\" class=\"btn btn-danger btn-lg\">\n                  <i class=\"fas fa-save me-2\"></i>Save Changes\n                </button>\n                <a href=\"/<%= locals.userRole || 'user' %>/dashboard\" class=\"btn btn-outline-light btn-lg\">\n                  <i class=\"fas fa-arrow-left me-2\"></i>Back to Dashboard\n                </a>\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</main>";
const inlineScripts = ["// Toggle password visibility\n  document.getElementById('togglePassword').addEventListener('click', function() {\n    const passwordInput = document.getElementById('password');\n    const icon = this.querySelector('i');\n    \n    if (passwordInput.type === 'password') {\n      passwordInput.type = 'text';\n      icon.classList.remove('fa-eye');\n      icon.classList.add('fa-eye-slash');\n    } else {\n      passwordInput.type = 'password';\n      icon.classList.remove('fa-eye-slash');\n      icon.classList.add('fa-eye');\n    }\n  });"];
const externalScripts = [];

function EditProfile(props) {
  const defaults = (fallbackData && fallbackData["editProfile"]) || {};
  const data = { ...defaults, ...props };

  const defaultLocals = defaults.locals || {};
  const overrideLocals = props && props.locals ? props.locals : {};
  const locals = {
    ...defaultLocals,
    ...overrideLocals,
    isLoggedIn: data.isLoggedIn ?? defaultLocals.isLoggedIn ?? false,
    userRole: data.userRole ?? defaultLocals.userRole ?? "guest",
    userName: data.userName ?? defaultLocals.userName ?? "Guest",
  };

  data.locals = locals;

  let html = ejs.render(template, data);

  const collectedInlineScripts = [...inlineScripts];
  html = html.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, (_, body) => {
    const trimmed = body.trim();
    if (trimmed.length) {
      collectedInlineScripts.push(trimmed);
    }
    return "";
  });

  return (
    <MainLayout {...data} scripts={externalScripts}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {collectedInlineScripts.map((script, index) => (
        <script key={index} dangerouslySetInnerHTML={{ __html: script }} />
      ))}
    </MainLayout>
  );
}

module.exports = EditProfile;




