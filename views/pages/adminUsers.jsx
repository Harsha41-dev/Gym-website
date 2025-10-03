const React = require("react");
const ejs = require("ejs");
const MainLayout = require("../layouts/MainLayout");
const fallbackData = require("../utils/fallbackData");

const template = "<main>\n  <div class=\"container my-5\">\n    <h1 class=\"mb-4\">Member Management</h1>\n    \n    <% if (typeof message !== 'undefined' && message) { %>\n      <div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">\n        <%= message %>\n        <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button>\n      </div>\n    <% } %>\n    \n    <div class=\"card\">\n      <div class=\"card-header bg-danger text-white d-flex justify-content-between align-items-center\">\n        <h3 class=\"mb-0\"><i class=\"fas fa-users me-2\"></i>All Members</h3>\n        <a href=\"/admin/dashboard\" class=\"btn btn-outline-light\">\n          <i class=\"fas fa-arrow-left me-2\"></i>Back to Dashboard\n        </a>\n      </div>\n      <div class=\"card-body\">\n        <!-- Filter/Search -->\n        <div class=\"row mb-4\">\n          <div class=\"col-md-6\">\n            <div class=\"input-group\">\n              <input type=\"text\" id=\"userSearch\" class=\"form-control\" placeholder=\"Search by name or email\">\n              <button class=\"btn btn-outline-secondary\" type=\"button\">\n                <i class=\"fas fa-search\"></i>\n              </button>\n            </div>\n          </div>\n          <div class=\"col-md-6\">\n            <select id=\"activityFilter\" class=\"form-select\">\n              <option value=\"all\">All Members</option>\n              <option value=\"active\">Active Plans</option>\n              <option value=\"no-plan\">No Active Plans</option>\n            </select>\n          </div>\n        </div>\n        \n        <!-- Users Table -->\n        <div class=\"table-responsive\">\n          <table class=\"table table-dark table-hover align-middle\">\n            <thead>\n              <tr>\n                <th scope=\"col\">Name</th>\n                <th scope=\"col\">Email</th>\n                <th scope=\"col\">Age</th>\n                <th scope=\"col\">Gender</th>\n                <th scope=\"col\">Registration Date</th>\n                <th scope=\"col\">Active Plans</th>\n                <th scope=\"col\">Actions</th>\n              </tr>\n            </thead>\n            <tbody>\n              <% if (users && users.length > 0) { %>\n                <% users.forEach(user => { %>\n                  <tr class=\"user-row\" data-has-plan=\"<%= user.plans && user.plans.length ? 'active' : 'no-plan' %>\">\n                    <td><%= user.name %></td>\n                    <td><%= user.email %></td>\n                    <td><%= user.age || 'N/A' %></td>\n                    <td><%= user.gender || 'N/A' %></td>\n                    <td><%= new Date(user.createdAt).toLocaleDateString() %></td>\n                    <td>\n                      <% if (user.plans && user.plans.length) { %>\n                        <span class=\"badge bg-success\"><%= user.plans.length %> Plans</span>\n                      <% } else { %>\n                        <span class=\"badge bg-secondary\">No Plans</span>\n                      <% } %>\n                    </td>\n                    <td>\n                      <div class=\"btn-group\" role=\"group\">\n                        <button type=\"button\" class=\"btn btn-sm btn-info view-user-details\" data-id=\"<%= user._id %>\">\n                          <i class=\"fas fa-eye me-1\"></i>Details\n                        </button>\n                        <a href=\"/admin/users/delete/<%= user._id %>\" class=\"btn btn-sm btn-danger\" onclick=\"return confirm('Are you sure you want to delete this user? This action cannot be undone.')\">\n                          <i class=\"fas fa-trash me-1\"></i>Delete\n                        </a>\n                      </div>\n                    </td>\n                  </tr>\n                <% }) %>\n              <% } else { %>\n                <tr>\n                  <td colspan=\"7\" class=\"text-center\">No users found</td>\n                </tr>\n              <% } %>\n            </tbody>\n          </table>\n        </div>\n      </div>\n    </div>\n  </div>\n  \n  <!-- User Details Modal -->\n  <div class=\"modal fade\" id=\"userDetailsModal\" tabindex=\"-1\" aria-labelledby=\"userDetailsModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal-dialog modal-lg\">\n      <div class=\"modal-content bg-dark text-light\">\n        <div class=\"modal-header\">\n          <h5 class=\"modal-title\" id=\"userDetailsModalLabel\">User Details</h5>\n          <button type=\"button\" class=\"btn-close btn-close-white\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n        </div>\n        <div class=\"modal-body\" id=\"userDetailsContent\">\n          <div class=\"text-center\">\n            <div class=\"spinner-border text-danger\" role=\"status\">\n              <span class=\"visually-hidden\">Loading...</span>\n            </div>\n            <p>Loading user details...</p>\n          </div>\n        </div>\n        <div class=\"modal-footer\">\n          <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">Close</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</main>";
const inlineScripts = ["// Search functionality\n  document.getElementById('userSearch').addEventListener('input', function() {\n    const searchTerm = this.value.toLowerCase();\n    const rows = document.querySelectorAll('.user-row');\n    \n    rows.forEach(row => {\n      const name = row.cells[0].textContent.toLowerCase();\n      const email = row.cells[1].textContent.toLowerCase();\n      \n      if (name.includes(searchTerm) || email.includes(searchTerm)) {\n        row.style.display = '';\n      } else {\n        row.style.display = 'none';\n      }\n    });\n  });\n  \n  // Filter by plan status\n  document.getElementById('activityFilter').addEventListener('change', function() {\n    const filterValue = this.value;\n    const rows = document.querySelectorAll('.user-row');\n    \n    rows.forEach(row => {\n      const hasPlan = row.getAttribute('data-has-plan');\n      \n      if (filterValue === 'all' || hasPlan === filterValue) {\n        row.style.display = '';\n      } else {\n        row.style.display = 'none';\n      }\n    });\n  });\n  \n  // User details modal functionality\n  document.querySelectorAll('.view-user-details').forEach(button => {\n    button.addEventListener('click', async function() {\n      const userId = this.getAttribute('data-id');\n      const modalBody = document.getElementById('userDetailsContent');\n      \n      // Show loading indicator\n      modalBody.innerHTML = `\n        <div class=\"text-center\">\n          <div class=\"spinner-border text-danger\" role=\"status\">\n            <span class=\"visually-hidden\">Loading...</span>\n          </div>\n          <p>Loading user details...</p>\n        </div>\n      `;\n      \n      // Show the modal\n      const modal = new bootstrap.Modal(document.getElementById('userDetailsModal'));\n      modal.show();\n      \n      try {\n        // In a real app, this would be an AJAX call to get user details\n        // For now, we'll just simulate this with data we already have\n        const row = this.closest('tr');\n        const name = row.cells[0].textContent;\n        const email = row.cells[1].textContent;\n        const age = row.cells[2].textContent;\n        const gender = row.cells[3].textContent;\n        const registeredDate = row.cells[4].textContent;\n        \n        // Update modal with user details\n        setTimeout(() => {\n          modalBody.innerHTML = `\n            <div class=\"row\">\n              <div class=\"col-md-6\">\n                <h4>Personal Information</h4>\n                <p><strong>Name:</strong> ${name}</p>\n                <p><strong>Email:</strong> ${email}</p>\n                <p><strong>Age:</strong> ${age}</p>\n                <p><strong>Gender:</strong> ${gender}</p>\n                <p><strong>Registered:</strong> ${registeredDate}</p>\n              </div>\n              <div class=\"col-md-6\">\n                <h4>Fitness Plans</h4>\n                <p>User's active fitness plans would be displayed here.</p>\n                <h4 class=\"mt-3\">Recent Activity</h4>\n                <p>User's recent activity would be displayed here.</p>\n              </div>\n            </div>\n          `;\n        }, 500);\n        \n      } catch (error) {\n        modalBody.innerHTML = `\n          <div class=\"alert alert-danger\">\n            Error loading user details. Please try again.\n          </div>\n        `;\n      }\n    });\n  });"];
const externalScripts = ["/js/admin.js"];

function AdminUsers(props) {
  const defaults = (fallbackData && fallbackData["adminUsers"]) || {};
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

module.exports = AdminUsers;




