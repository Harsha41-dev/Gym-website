const React = require("react");
const ejs = require("ejs");
const MainLayout = require("../layouts/MainLayout");
const fallbackData = require("../utils/fallbackData");

const template = "<main>\n  <div class=\"container my-5\">\n    <div class=\"row\">\n      <div class=\"col-lg-8\">\n        <h1 class=\"mb-4\">Book Your Session</h1>\n        \n        <div class=\"card mb-4\">\n          <div class=\"card-header bg-danger text-white\">\n            <h3 class=\"mb-0\"><%= plan.title %></h3>\n          </div>\n          <div class=\"card-body\">\n            <div class=\"row\">\n              <% if (plan.image) { %>\n              <div class=\"col-md-4 mb-3\">\n                <img src=\"<%= plan.image %>\" alt=\"<%= plan.title %>\" class=\"img-fluid rounded\">\n              </div>\n              <div class=\"col-md-8\">\n              <% } else { %>\n              <div class=\"col-12\">\n              <% } %>\n                <h4><i class=\"fas fa-info-circle me-2\"></i>Program Details</h4>\n                <p><%= plan.description %></p>\n                <div class=\"row\">\n                  <div class=\"col-md-6\">\n                    <p><strong>Category:</strong> <%= plan.category %></p>\n                    <p><strong>Duration:</strong> <%= plan.duration %></p>\n                  </div>\n                  <div class=\"col-md-6\">\n                    <p><strong>Sessions:</strong> <%= plan.sessions %> sessions</p>\n                    <p><strong>Price:</strong> $<%= plan.price.toFixed(2) %></p>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        \n        <div class=\"card\">\n          <div class=\"card-header bg-dark text-white\">\n            <h3 class=\"mb-0\">Schedule Your First Session</h3>\n          </div>\n          <div class=\"card-body\">\n            <form action=\"/user/book\" method=\"POST\" id=\"bookingForm\">\n              <input type=\"hidden\" name=\"planId\" value=\"<%= plan._id %>\">\n              \n              <div class=\"mb-3\">\n                <label for=\"trainer\" class=\"form-label\"><i class=\"fas fa-user-tie me-2\"></i>Select a Trainer</label>\n                <select class=\"form-select\" id=\"trainer\" name=\"trainerId\" required>\n                  <option value=\"\" selected disabled>Choose a trainer...</option>\n                  <% trainers.forEach(trainer => { %>\n                    <option value=\"<%= trainer._id %>\"><%= trainer.name %></option>\n                  <% }); %>\n                </select>\n              </div>\n              \n              <div class=\"mb-3\">\n                <label for=\"date\" class=\"form-label\"><i class=\"fas fa-calendar-alt me-2\"></i>Select Date</label>\n                <input type=\"date\" class=\"form-control\" id=\"date\" name=\"date\" required min=\"<%= new Date().toISOString().split('T')[0] %>\">\n              </div>\n              \n              <div class=\"mb-3\">\n                <label for=\"time\" class=\"form-label\"><i class=\"fas fa-clock me-2\"></i>Select Time</label>\n                <select class=\"form-select\" id=\"time\" name=\"time\" required>\n                  <option value=\"\" selected disabled>Choose a time slot...</option>\n                  <!-- Time slots dynamically populated based on trainer availability -->\n                </select>\n              </div>\n              \n              <div class=\"mb-3 form-check\">\n                <input type=\"checkbox\" class=\"form-check-input\" id=\"termsCheck\" required>\n                <label class=\"form-check-label\" for=\"termsCheck\">\n                  I agree to the <a href=\"#\" class=\"text-danger\" data-bs-toggle=\"modal\" data-bs-target=\"#termsModal\">Terms & Conditions</a>\n                </label>\n              </div>\n              \n              <div class=\"d-grid gap-2\">\n                <button type=\"submit\" class=\"btn btn-danger btn-lg\" id=\"bookButton\">\n                  <i class=\"fas fa-calendar-check me-2\"></i>Book Now\n                </button>\n                <a href=\"/user/plans\" class=\"btn btn-outline-light\">\n                  <i class=\"fas fa-arrow-left me-2\"></i>Back to Courses\n                </a>\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n      \n      <div class=\"col-lg-4 mt-4 mt-lg-0\">\n        <div class=\"card sticky-top\" style=\"top: 20px;\">\n          <div class=\"card-header bg-dark text-white\">\n            <h3 class=\"mb-0\"><i class=\"fas fa-shopping-cart me-2\"></i>Your Selection</h3>\n          </div>\n          <div class=\"card-body\">\n            <h5><%= plan.title %></h5>\n            <p class=\"text-muted\"><%= plan.category %></p>\n            <hr>\n            <div class=\"d-flex justify-content-between\">\n              <span>Program Price:</span>\n              <span>$<%= plan.price.toFixed(2) %></span>\n            </div>\n            <div class=\"d-flex justify-content-between mt-2\">\n              <span>Number of Sessions:</span>\n              <span><%= plan.sessions %></span>\n            </div>\n            <hr>\n            <div class=\"d-flex justify-content-between fw-bold\">\n              <span>Total:</span>\n              <span>$<%= plan.price.toFixed(2) %></span>\n            </div>\n            \n            <div class=\"alert alert-info mt-3\">\n              <i class=\"fas fa-info-circle me-2\"></i>Your first session will be scheduled based on your selection. Subsequent sessions will be arranged with your trainer.\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  \n  <!-- Terms and Conditions Modal -->\n  <div class=\"modal fade\" id=\"termsModal\" tabindex=\"-1\" aria-labelledby=\"termsModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal-dialog modal-dialog-scrollable\">\n      <div class=\"modal-content bg-dark text-light\">\n        <div class=\"modal-header\">\n          <h5 class=\"modal-title\" id=\"termsModalLabel\">Terms & Conditions</h5>\n          <button type=\"button\" class=\"btn-close btn-close-white\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n        </div>\n        <div class=\"modal-body\">\n          <h6>Booking Agreement</h6>\n          <p>By booking a session, you agree to attend at the specified date and time. Cancellations must be made at least 24 hours in advance.</p>\n          \n          <h6>Refund Policy</h6>\n          <p>No refunds are provided for missed sessions. In case of emergency, sessions can be rescheduled at the trainer's discretion.</p>\n          \n          <h6>Health Disclaimer</h6>\n          <p>You confirm that you have no known medical conditions that would prevent you from safely participating in the activities. Consult with your physician before beginning any exercise program.</p>\n        </div>\n        <div class=\"modal-footer\">\n          <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">Close</button>\n          <button type=\"button\" class=\"btn btn-danger\" id=\"agreeButton\" data-bs-dismiss=\"modal\">I Agree</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</main>";
const inlineScripts = [];
const externalScripts = ["/js/booking.js"];

function BookingPage(props) {
  const defaults = (fallbackData && fallbackData["bookingPage"]) || {};
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

module.exports = BookingPage;




