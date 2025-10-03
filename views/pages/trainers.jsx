const React = require("react");
const ejs = require("ejs");
const MainLayout = require("../layouts/MainLayout");
const fallbackData = require("../utils/fallbackData");

const template = "<div class=\"container mt-5\">\n    <h1 class=\"text-center mb-4\">Our Trainers</h1>\n    \n    <!-- Filters -->\n    <div class=\"row mb-4\">\n        <div class=\"col-md-8 mx-auto\">\n            <div class=\"card\">\n                <div class=\"card-body\">\n                    <form method=\"GET\" action=\"/trainers\" class=\"d-flex flex-wrap\">\n                        <div class=\"form-group me-3 mb-2\">\n                            <label for=\"specialization\">Specialization</label>\n                            <select class=\"form-control\" id=\"specialization\" name=\"specialization\">\n                                <option value=\"\">All Specializations</option>\n                                <% if (specializations && specializations.length > 0) { %>\n                                    <% specializations.forEach(spec => { %>\n                                        <option value=\"<%= spec %>\" <%= filters.specialization === spec ? 'selected' : '' %>><%= spec %></option>\n                                    <% }); %>\n                                <% } %>\n                            </select>\n                        </div>\n                        <div class=\"form-group me-3 mb-2\">\n                            <label for=\"sort\">Sort By</label>\n                            <select class=\"form-control\" id=\"sort\" name=\"sort\">\n                                <option value=\"newest\" <%= filters.sort === 'newest' ? 'selected' : '' %>>Newest</option>\n                                <option value=\"name\" <%= filters.sort === 'name' ? 'selected' : '' %>>Name</option>\n                                <option value=\"popularity\" <%= filters.sort === 'popularity' ? 'selected' : '' %>>Popularity</option>\n                            </select>\n                        </div>\n                        <div class=\"form-group d-flex align-items-end mb-2\">\n                            <button type=\"submit\" class=\"btn btn-primary\">Filter</button>\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n    \n    <!-- Trainers List -->\n    <div class=\"row\">\n        <% if (trainers && trainers.length > 0) { %>\n            <% trainers.forEach(trainer => { %>\n                <div class=\"col-md-4 mb-4\">\n                    <div class=\"card h-100\">\n                        <div class=\"text-center pt-3\">\n                            <% if (trainer.profilePicture) { %>\n                                <img src=\"<%= trainer.profilePicture %>\" class=\"rounded-circle img-fluid\" style=\"width: 150px; height: 150px; object-fit: cover;\">\n                            <% } else { %>\n                                <img src=\"/images/default-profile.png\" class=\"rounded-circle img-fluid\" style=\"width: 150px; height: 150px; object-fit: cover;\">\n                            <% } %>\n                        </div>\n                        <div class=\"card-body text-center\">\n                            <h5 class=\"card-title\"><%= trainer.name %></h5>\n                            <% if (trainer.specializations && trainer.specializations.length > 0) { %>\n                                <p class=\"card-text\">\n                                    <% trainer.specializations.forEach((spec, index) => { %>\n                                        <span class=\"badge bg-primary me-1\"><%= spec %></span>\n                                    <% }); %>\n                                </p>\n                            <% } %>\n                            <p class=\"card-text\"><%= trainer.bio ? trainer.bio.substring(0, 100) + (trainer.bio.length > 100 ? '...' : '') : 'No bio available' %></p>\n                            <a href=\"/trainers/<%= trainer._id %>\" class=\"btn btn-outline-primary\">View Profile</a>\n                            <% if (locals.isLoggedIn && locals.userRole === 'user') { %>\n                                <a href=\"/bookings/new?trainerId=<%= trainer._id %>\" class=\"btn btn-primary mt-2\">Book Session</a>\n                            <% } %>\n                        </div>\n                    </div>\n                </div>\n            <% }); %>\n        <% } else { %>\n            <div class=\"col-12 text-center\">\n                <p>No trainers found matching your criteria.</p>\n            </div>\n        <% } %>\n    </div>\n</div>";
const inlineScripts = [];
const externalScripts = [];

function Trainers(props) {
  const defaults = (fallbackData && fallbackData["trainers"]) || {};
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

module.exports = Trainers;




