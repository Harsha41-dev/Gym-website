const React = require("react");
const ejs = require("ejs");
const MainLayout = require("../layouts/MainLayout");
const fallbackData = require("../utils/fallbackData");

const template = "<main>\n  <div class=\"container my-5\">\n    <div class=\"row justify-content-center\">\n      <div class=\"col-md-8\">\n        <div class=\"card\">\n          <div class=\"card-header bg-success text-white text-center py-3\">\n            <h2><i class=\"fas fa-check-circle me-2\"></i>Booking Confirmed!</h2>\n          </div>\n          <div class=\"card-body p-4\">\n            <div class=\"text-center mb-4\">\n              <div class=\"confirmation-icon\">\n                <i class=\"fas fa-calendar-check fa-4x text-success\"></i>\n              </div>\n              <p class=\"lead mt-3\">Your session has been successfully scheduled.</p>\n            </div>\n            \n            <div class=\"booking-details p-4 rounded bg-dark\">\n              <h4 class=\"mb-4 text-center\">Booking Details</h4>\n              \n              <div class=\"row mb-3\">\n                <div class=\"col-md-6\">\n                  <p><strong><i class=\"fas fa-dumbbell me-2\"></i>Program:</strong><br>\n                  <%= booking.planTitle %></p>\n                </div>\n                <div class=\"col-md-6\">\n                  <p><strong><i class=\"fas fa-user-tie me-2\"></i>Trainer:</strong><br>\n                  <%= booking.trainerName %></p>\n                </div>\n              </div>\n              \n              <div class=\"row mb-3\">\n                <div class=\"col-md-6\">\n                  <p><strong><i class=\"fas fa-calendar-alt me-2\"></i>Date:</strong><br>\n                  <%= new Date(booking.date).toLocaleDateString('en-US', {\n                    weekday: 'long',\n                    year: 'numeric',\n                    month: 'long',\n                    day: 'numeric'\n                  }) %></p>\n                </div>\n                <div class=\"col-md-6\">\n                  <p><strong><i class=\"fas fa-clock me-2\"></i>Time:</strong><br>\n                  <%= booking.time %></p>\n                </div>\n              </div>\n              \n              <% if (plan && plan.location) { %>\n              <div class=\"mb-3\">\n                <p><strong><i class=\"fas fa-map-marker-alt me-2\"></i>Location:</strong><br>\n                <%= plan.location %></p>\n              </div>\n              <% } else { %>\n              <div class=\"mb-3\">\n                <p><strong><i class=\"fas fa-map-marker-alt me-2\"></i>Location:</strong><br>\n                Main Gym Facility</p>\n              </div>\n              <% } %>\n              \n              <div class=\"alert alert-warning\">\n                <i class=\"fas fa-info-circle me-2\"></i>Please arrive 10 minutes before your scheduled time.\n              </div>\n            </div>\n            \n            <div class=\"text-center mt-4\">\n              <h5>What's Next?</h5>\n              <p>Your trainer will prepare for your session. You can view all your bookings in your dashboard.</p>\n            </div>\n            \n            <div class=\"d-grid gap-2 mt-4\">\n              <a href=\"/user/dashboard\" class=\"btn btn-danger btn-lg\">\n                <i class=\"fas fa-tachometer-alt me-2\"></i>Go to Dashboard\n              </a>\n              <a href=\"/user/courses\" class=\"btn btn-outline-light btn-lg\">\n                <i class=\"fas fa-search me-2\"></i>Browse More Courses\n              </a>\n            </div>\n          </div>\n          <div class=\"card-footer bg-dark text-center py-3\">\n            <p class=\"mb-0\">Need to make changes? Contact us at <a href=\"mailto:support@fitsync.com\" class=\"text-danger\">support@fitsync.com</a></p>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</main>";
const inlineScripts = [];
const externalScripts = [];

function BookingConfirmation(props) {
  const defaults = (fallbackData && fallbackData["bookingConfirmation"]) || {};
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

module.exports = BookingConfirmation;




