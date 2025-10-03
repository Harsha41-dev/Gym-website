const React = require("react");
const ejs = require("ejs");
const MainLayout = require("../layouts/MainLayout");
const fallbackData = require("../utils/fallbackData");

const template = "<main>\n  <div class=\"container my-5\">\n    <div class=\"row\">\n      <div class=\"col-lg-8 mx-auto\">\n        <div class=\"card\">\n          <div class=\"card-header bg-danger text-white text-center\">\n            <h2><i class=\"fas fa-calendar-check me-2\"></i>Book <%= plan.title %> Session</h2>\n          </div>\n          <div class=\"card-body\">\n            <div class=\"row mb-4\">\n              <div class=\"col-md-5\">\n                <img src=\"<%= plan.image %>\" alt=\"<%= plan.title %>\" class=\"img-fluid rounded\" style=\"max-height: 250px; width: 100%; object-fit: cover;\">\n              </div>\n              <div class=\"col-md-7\">\n                <h4 class=\"card-title\"><%= plan.title %></h4>\n                <p class=\"text-muted\"><%= plan.description %></p>\n                <div class=\"d-flex justify-content-between mt-2\">\n                  <div>\n                    <small class=\"text-muted d-block\"><i class=\"fas fa-clock me-1\"></i><%= plan.features.duration %></small>\n                    <small class=\"text-muted d-block\"><i class=\"fas fa-calendar-alt me-1\"></i><%= plan.features.sessions %> sessions per week</small>\n                  </div>\n                  <div>\n                    <h5 class=\"text-danger\"><%= plan.features.price %></h5>\n                  </div>\n                </div>\n              </div>\n            </div>\n\n            <form action=\"/bookings/plan/<%= plan.id %>\" method=\"POST\">\n              <input type=\"hidden\" name=\"planId\" value=\"<%= plan.id %>\">\n              <div class=\"mb-3\">\n                <label for=\"trainer\" class=\"form-label\"><i class=\"fas fa-user-tie me-2\"></i>Select Trainer</label>\n                <select class=\"form-select\" id=\"trainer\" name=\"trainerId\" required>\n                  <option value=\"\" selected disabled>Choose a trainer...</option>\n                  <% if (trainers && trainers.length > 0) { %>\n                    <% trainers.forEach(trainer => { %>\n                      <option value=\"<%= trainer._id %>\"><%= trainer.name %> <%= trainer.specializations ? `(${trainer.specializations.join(', ')})` : '' %></option>\n                    <% }); %>\n                  <% } else { %>\n                    <option disabled>No trainers available</option>\n                  <% } %>\n                </select>\n              </div>\n\n              <div class=\"row\">\n                <div class=\"col-md-6 mb-3\">\n                  <label for=\"startDate\" class=\"form-label\"><i class=\"fas fa-calendar me-2\"></i>Date</label>\n                  <input type=\"date\" class=\"form-control\" id=\"startDate\" name=\"startDate\" required \n                         min=\"<%= new Date().toISOString().split('T')[0] %>\">\n                </div>\n                \n                <div class=\"col-md-6 mb-3\">\n                  <label for=\"startTime\" class=\"form-label\"><i class=\"fas fa-clock me-2\"></i>Time</label>\n                  <select class=\"form-select\" id=\"startTime\" name=\"startTime\" required>\n                    <option value=\"\" selected disabled>Select a time...</option>\n                    <option value=\"09:00\">9:00 AM</option>\n                    <option value=\"10:00\">10:00 AM</option>\n                    <option value=\"11:00\">11:00 AM</option>\n                    <option value=\"12:00\">12:00 PM</option>\n                    <option value=\"13:00\">1:00 PM</option>\n                    <option value=\"14:00\">2:00 PM</option>\n                    <option value=\"15:00\">3:00 PM</option>\n                    <option value=\"16:00\">4:00 PM</option>\n                    <option value=\"17:00\">5:00 PM</option>\n                    <option value=\"18:00\">6:00 PM</option>\n                    <option value=\"19:00\">7:00 PM</option>\n                  </select>\n                </div>\n              </div>\n\n              <div class=\"mb-3\">\n                <label for=\"notes\" class=\"form-label\"><i class=\"fas fa-sticky-note me-2\"></i>Additional Notes (Optional)</label>\n                <textarea class=\"form-control\" id=\"notes\" name=\"notes\" rows=\"3\" placeholder=\"Any specific requirements or questions for the trainer...\"></textarea>\n              </div>\n\n              <div class=\"alert alert-info\">\n                <i class=\"fas fa-info-circle me-2\"></i>\n                <strong>Booking Policy:</strong> Cancellations must be made at least 24 hours before the scheduled session. Late cancellations may incur a fee.\n              </div>\n\n              <div class=\"d-grid gap-2 mt-4\">\n                <button type=\"submit\" class=\"btn btn-danger btn-lg\">\n                  <i class=\"fas fa-check-circle me-2\"></i>Book Now\n                </button>\n                <a href=\"/plans\" class=\"btn btn-outline-secondary\">\n                  <i class=\"fas fa-arrow-left me-2\"></i>Back to Plans\n                </a>\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</main>";
const inlineScripts = ["// Disable past dates in datepicker\n  const today = new Date().toISOString().split('T')[0];\n  document.getElementById('startDate').setAttribute('min', today);\n  \n  // Validate form before submission\n  document.querySelector('form').addEventListener('submit', function(e) {\n    const trainer = document.getElementById('trainer').value;\n    const date = document.getElementById('startDate').value;\n    const time = document.getElementById('startTime').value;\n    \n    if (!trainer || !date || !time) {\n      e.preventDefault();\n      alert('Please fill in all required fields.');\n    }\n  });"];
const externalScripts = [];

function Booking(props) {
  const defaults = (fallbackData && fallbackData["booking"]) || {};
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

module.exports = Booking;




