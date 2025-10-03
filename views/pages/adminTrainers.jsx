const React = require("react");
const ejs = require("ejs");
const MainLayout = require("../layouts/MainLayout");
const fallbackData = require("../utils/fallbackData");

const template = "<main>\n  <div class=\"container my-5\">\n    <h1 class=\"mb-4\">Trainer Management</h1>\n    \n    <% if (typeof message !== 'undefined' && message) { %>\n      <div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">\n        <%= message %>\n        <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button>\n      </div>\n    <% } %>\n    \n    <div class=\"card\">\n      <div class=\"card-header bg-danger text-white d-flex justify-content-between align-items-center\">\n        <h3 class=\"mb-0\"><i class=\"fas fa-users me-2\"></i>All Trainers</h3>\n        <a href=\"/admin/dashboard\" class=\"btn btn-outline-light\">\n          <i class=\"fas fa-arrow-left me-2\"></i>Back to Dashboard\n        </a>\n      </div>\n      <div class=\"card-body\">\n        <!-- Filter/Search -->\n        <div class=\"row mb-4\">\n          <div class=\"col-md-6\">\n            <div class=\"input-group\">\n              <input type=\"text\" id=\"trainerSearch\" class=\"form-control\" placeholder=\"Search by name or email\">\n              <button class=\"btn btn-outline-secondary\" type=\"button\">\n                <i class=\"fas fa-search\"></i>\n              </button>\n            </div>\n          </div>\n          <div class=\"col-md-6\">\n            <select id=\"statusFilter\" class=\"form-select\">\n              <option value=\"all\">All Status</option>\n              <option value=\"active\">Active</option>\n              <option value=\"pending\">Pending Approval</option>\n              <option value=\"rejected\">Rejected</option>\n            </select>\n          </div>\n        </div>\n        \n        <!-- Trainers Table -->\n        <div class=\"table-responsive\">\n          <table class=\"table table-dark table-hover align-middle\">\n            <thead>\n              <tr>\n                <th scope=\"col\">Name</th>\n                <th scope=\"col\">Email</th>\n                <th scope=\"col\">Registration Date</th>\n                <th scope=\"col\">Status</th>\n                <th scope=\"col\">Actions</th>\n              </tr>\n            </thead>\n            <tbody>\n              <% if (trainers && trainers.length > 0) { %>\n                <% trainers.forEach(trainer => { %>\n                  <tr class=\"trainer-row\" data-status=\"<%= trainer.status %>\">\n                    <td><%= trainer.name %></td>\n                    <td><%= trainer.email %></td>\n                    <td><%= new Date(trainer.createdAt).toLocaleDateString() %></td>\n                    <td>\n                      <% if (trainer.status === 'active') { %>\n                        <span class=\"badge bg-success\">Active</span>\n                      <% } else if (trainer.status === 'pending') { %>\n                        <span class=\"badge bg-warning text-dark\">Pending</span>\n                      <% } else if (trainer.status === 'rejected') { %>\n                        <span class=\"badge bg-danger\">Rejected</span>\n                      <% } %>\n                    </td>\n                    <td>\n                      <div class=\"btn-group\" role=\"group\">\n                        <% if (trainer.status === 'pending') { %>\n                          <a href=\"/admin/trainers/approve/<%= trainer._id %>\" class=\"btn btn-sm btn-success\" onclick=\"return confirm('Are you sure you want to approve this trainer?')\">\n                            <i class=\"fas fa-check me-1\"></i>Approve\n                          </a>\n                          <a href=\"/admin/trainers/reject/<%= trainer._id %>\" class=\"btn btn-sm btn-danger\" onclick=\"return confirm('Are you sure you want to reject this trainer?')\">\n                            <i class=\"fas fa-times me-1\"></i>Reject\n                          </a>\n                        <% } else if (trainer.status === 'active' || trainer.status === 'rejected') { %>\n                          <a href=\"/admin/trainers/toggle-status/<%= trainer._id %>\" class=\"btn btn-sm <%= trainer.status === 'active' ? 'btn-warning' : 'btn-success' %>\">\n                            <i class=\"fas <%= trainer.status === 'active' ? 'fa-ban' : 'fa-check' %> me-1\"></i>\n                            <%= trainer.status === 'active' ? 'Deactivate' : 'Activate' %>\n                          </a>\n                        <% } %>\n                        <a href=\"/admin/trainers/delete/<%= trainer._id %>\" class=\"btn btn-sm btn-outline-danger\" onclick=\"return confirm('Are you sure you want to delete this trainer? This action cannot be undone.')\">\n                          <i class=\"fas fa-trash me-1\"></i>Delete\n                        </a>\n                      </div>\n                    </td>\n                  </tr>\n                <% }) %>\n              <% } else { %>\n                <tr>\n                  <td colspan=\"5\" class=\"text-center\">No trainers found</td>\n                </tr>\n              <% } %>\n            </tbody>\n          </table>\n        </div>\n      </div>\n    </div>\n  </div>\n</main>";
const inlineScripts = ["// Search functionality\n  document.getElementById('trainerSearch').addEventListener('input', function() {\n    const searchTerm = this.value.toLowerCase();\n    const rows = document.querySelectorAll('.trainer-row');\n    \n    rows.forEach(row => {\n      const name = row.cells[0].textContent.toLowerCase();\n      const email = row.cells[1].textContent.toLowerCase();\n      \n      if (name.includes(searchTerm) || email.includes(searchTerm)) {\n        row.style.display = '';\n      } else {\n        row.style.display = 'none';\n      }\n    });\n  });\n  \n  // Filter by status\n  document.getElementById('statusFilter').addEventListener('change', function() {\n    const filterValue = this.value;\n    const rows = document.querySelectorAll('.trainer-row');\n    \n    rows.forEach(row => {\n      const status = row.getAttribute('data-status');\n      \n      if (filterValue === 'all' || status === filterValue) {\n        row.style.display = '';\n      } else {\n        row.style.display = 'none';\n      }\n    });\n  });"];
const externalScripts = ["/js/admin.js"];

function AdminTrainers(props) {
  const defaults = (fallbackData && fallbackData["adminTrainers"]) || {};
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

module.exports = AdminTrainers;




