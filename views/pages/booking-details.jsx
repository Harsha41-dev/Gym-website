const React = require("react");
const ejs = require("ejs");
const MainLayout = require("../layouts/MainLayout");
const fallbackData = require("../utils/fallbackData");

const template = "<main>\n  <div class=\"container my-5\">\n    <div class=\"row\">\n      <div class=\"col-lg-8 mx-auto\">\n        <div class=\"card\">\n          <div class=\"card-header bg-danger text-white\">\n            <h2 class=\"mb-0\"><i class=\"fas fa-calendar-check me-2\"></i>Booking Details</h2>\n          </div>\n          <div class=\"card-body\">\n            <% if (booking) { %>\n              <div class=\"booking-info p-4 rounded mb-4\" style=\"background-color: #2a2a2a;\">\n                <div class=\"row\">\n                  <div class=\"col-md-7\">\n                    <h4><%= plan ? plan.title : booking.planTitle %></h4>\n                    <p class=\"mb-4\"><%= plan ? plan.description : \"No description available\" %></p>\n                    \n                    <div class=\"booking-meta mb-3\">\n                      <div class=\"d-flex align-items-center mb-2\">\n                        <i class=\"fas fa-calendar-alt text-danger me-2\"></i>\n                        <span><strong>Date:</strong> <%= new Date(booking.startTime).toLocaleDateString() %></span>\n                      </div>\n                      <div class=\"d-flex align-items-center mb-2\">\n                        <i class=\"fas fa-clock text-danger me-2\"></i>\n                        <span><strong>Time:</strong> <%= new Date(booking.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) %></span>\n                      </div>\n                      <div class=\"d-flex align-items-center mb-2\">\n                        <i class=\"fas fa-tag text-danger me-2\"></i>\n                        <span><strong>Status:</strong> \n                          <span class=\"badge <%= booking.status === 'confirmed' ? 'bg-success' : booking.status === 'pending' ? 'bg-warning text-dark' : booking.status === 'cancelled' ? 'bg-danger' : 'bg-secondary' %>\">\n                            <%= booking.status.charAt(0).toUpperCase() + booking.status.slice(1) %>\n                          </span>\n                        </span>\n                      </div>\n                    </div>\n                  </div>\n                  \n                  <div class=\"col-md-5\">\n                    <div class=\"card bg-dark\">\n                      <div class=\"card-header\">\n                        <h5 class=\"mb-0\"><%= userRole === 'user' ? 'Your Trainer' : 'Student' %></h5>\n                      </div>\n                      <div class=\"card-body\">\n                        <div class=\"d-flex align-items-center\">\n                          <div class=\"avatar me-3\">\n                            <% if (userRole === 'user' && booking.trainer.profilePicture) { %>\n                              <img src=\"<%= booking.trainer.profilePicture %>\" alt=\"Trainer\" class=\"rounded-circle\" width=\"60\" height=\"60\">\n                            <% } else if (userRole !== 'user' && booking.user.profilePicture) { %>\n                              <img src=\"<%= booking.user.profilePicture %>\" alt=\"User\" class=\"rounded-circle\" width=\"60\" height=\"60\">\n                            <% } else { %>\n                              <div class=\"avatar-placeholder rounded-circle bg-secondary d-flex align-items-center justify-content-center\" style=\"width: 60px; height: 60px;\">\n                                <i class=\"fas fa-user text-light\" style=\"font-size: 1.5rem;\"></i>\n                              </div>\n                            <% } %>\n                          </div>\n                          <div>\n                            <h6 class=\"mb-0\"><%= userRole === 'user' ? booking.trainer.name : booking.user.name %></h6>\n                            <p class=\"text-muted mb-0\"><%= userRole === 'user' ? (booking.trainer.specializations ? booking.trainer.specializations.join(', ') : 'Trainer') : 'Student' %></p>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              \n              <% if (booking.notes) { %>\n              <div class=\"mb-4\">\n                <h5><i class=\"fas fa-sticky-note me-2\"></i>Session Notes</h5>\n                <div class=\"p-3 rounded\" style=\"background-color: #2a2a2a;\">\n                  <%= booking.notes %>\n                </div>\n              </div>\n              <% } %>\n              \n              <div class=\"d-flex justify-content-between mt-4\">\n                <% if (userRole === 'user' && booking.status !== 'cancelled' && booking.status !== 'completed') { %>\n                  <button type=\"button\" class=\"btn btn-outline-danger\" data-bs-toggle=\"modal\" data-bs-target=\"#cancelModal\">\n                    <i class=\"fas fa-times-circle me-2\"></i>Cancel Booking\n                  </button>\n                <% } else if (userRole === 'trainer' && booking.status === 'pending') { %>\n                  <div>\n                    <a href=\"/trainer/bookings/confirm/<%= booking._id %>\" class=\"btn btn-success me-2\">\n                      <i class=\"fas fa-check me-2\"></i>Confirm\n                    </a>\n                    <a href=\"/trainer/bookings/cancel/<%= booking._id %>\" class=\"btn btn-outline-danger\">\n                      <i class=\"fas fa-times me-2\"></i>Decline\n                    </a>\n                  </div>\n                <% } else if (userRole === 'trainer' && booking.status === 'confirmed') { %>\n                  <a href=\"/trainer/bookings/complete/<%= booking._id %>\" class=\"btn btn-success\">\n                    <i class=\"fas fa-check-double me-2\"></i>Mark as Completed\n                  </a>\n                <% } %>\n                \n                <% if (userRole === 'user') { %>\n                  <a href=\"/user/bookings\" class=\"btn btn-outline-secondary\">\n                    <i class=\"fas fa-arrow-left me-2\"></i>Back to My Bookings\n                  </a>\n                <% } else { %>\n                  <a href=\"/trainer/bookings\" class=\"btn btn-outline-secondary\">\n                    <i class=\"fas fa-arrow-left me-2\"></i>Back to Bookings\n                  </a>\n                <% } %>\n              </div>\n              \n              <!-- Cancel Modal -->\n              <% if (userRole === 'user' && booking.status !== 'cancelled' && booking.status !== 'completed') { %>\n                <div class=\"modal fade\" id=\"cancelModal\" tabindex=\"-1\" aria-hidden=\"true\">\n                  <div class=\"modal-dialog\">\n                    <div class=\"modal-content bg-dark text-light\">\n                      <div class=\"modal-header\">\n                        <h5 class=\"modal-title\"><i class=\"fas fa-exclamation-triangle text-warning me-2\"></i>Cancel Booking</h5>\n                        <button type=\"button\" class=\"btn-close btn-close-white\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                      </div>\n                      <form action=\"/bookings/<%= booking._id %>\" method=\"POST\">\n                        <div class=\"modal-body\">\n                          <p>Are you sure you want to cancel this booking?</p>\n                          <input type=\"hidden\" name=\"status\" value=\"cancelled\">\n                          \n                          <div class=\"mb-3\">\n                            <label for=\"cancellationReason\" class=\"form-label\">Reason for cancellation</label>\n                            <textarea class=\"form-control\" id=\"cancellationReason\" name=\"cancellationReason\" rows=\"3\" required></textarea>\n                          </div>\n                        </div>\n                        <div class=\"modal-footer\">\n                          <button type=\"button\" class=\"btn btn-outline-secondary\" data-bs-dismiss=\"modal\">Close</button>\n                          <button type=\"submit\" class=\"btn btn-danger\">Yes, Cancel Booking</button>\n                        </div>\n                      </form>\n                    </div>\n                  </div>\n                </div>\n              <% } %>\n            <% } else { %>\n              <div class=\"alert alert-danger\">\n                <i class=\"fas fa-exclamation-circle me-2\"></i>\n                Booking not found\n              </div>\n              <a href=\"javascript:history.back()\" class=\"btn btn-outline-secondary\">\n                <i class=\"fas fa-arrow-left me-2\"></i>Go Back\n              </a>\n            <% } %>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</main>";
const inlineScripts = [];
const externalScripts = [];

function BookingDetails(props) {
  const defaults = (fallbackData && fallbackData["booking-details"]) || {};
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

module.exports = BookingDetails;




