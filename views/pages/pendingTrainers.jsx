const React = require("react");
const ejs = require("ejs");
const MainLayout = require("../layouts/MainLayout");
const fallbackData = require("../utils/fallbackData");

const template = "<main>\n  <div class=\"container my-5\">\n    <h1 class=\"mb-4\">Pending Trainer Approvals</h1>\n    \n    <div class=\"card\">\n      <div class=\"card-header bg-danger text-white d-flex justify-content-between align-items-center\">\n        <h3 class=\"mb-0\"><i class=\"fas fa-user-clock me-2\"></i>Trainers Awaiting Approval</h3>\n        <div>\n          <a href=\"/admin/trainers\" class=\"btn btn-outline-light me-2\">\n            <i class=\"fas fa-users me-2\"></i>All Trainers\n          </a>\n          <a href=\"/admin/dashboard\" class=\"btn btn-outline-light\">\n            <i class=\"fas fa-arrow-left me-2\"></i>Back to Dashboard\n          </a>\n        </div>\n      </div>\n      <div class=\"card-body\">\n        <% if (trainers && trainers.length > 0) { %>\n          <div class=\"table-responsive\">\n            <table class=\"table table-dark table-hover\">\n              <thead>\n                <tr>\n                  <th>Name</th>\n                  <th>Email</th>\n                  <th>Registration Date</th>\n                  <th>Actions</th>\n                </tr>\n              </thead>\n              <tbody>\n                <% trainers.forEach(trainer => { %>\n                  <tr>\n                    <td><%= trainer.name %></td>\n                    <td><%= trainer.email %></td>\n                    <td><%= new Date(trainer.createdAt).toLocaleDateString() %></td>\n                    <td>\n                      <div class=\"btn-group\" role=\"group\">\n                        <a href=\"/admin/trainers/approve/<%= trainer._id %>\" class=\"btn btn-sm btn-success\" onclick=\"return confirm('Are you sure you want to approve this trainer?')\">\n                          <i class=\"fas fa-check me-1\"></i>Approve\n                        </a>\n                        <a href=\"/admin/trainers/reject/<%= trainer._id %>\" class=\"btn btn-sm btn-danger\" onclick=\"return confirm('Are you sure you want to reject this trainer?')\">\n                          <i class=\"fas fa-times me-1\"></i>Reject\n                        </a>\n                      </div>\n                    </td>\n                  </tr>\n                <% }) %>\n              </tbody>\n            </table>\n          </div>\n        <% } else { %>\n          <div class=\"alert alert-info\" role=\"alert\">\n            <i class=\"fas fa-info-circle me-2\"></i>No pending trainer registrations at this time.\n          </div>\n        <% } %>\n      </div>\n    </div>\n  </div>\n</main>";
const inlineScripts = [];
const externalScripts = [];

function PendingTrainers(props) {
  const defaults = (fallbackData && fallbackData["pendingTrainers"]) || {};
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

module.exports = PendingTrainers;




