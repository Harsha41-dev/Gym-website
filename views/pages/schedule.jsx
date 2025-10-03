const React = require("react");
const ejs = require("ejs");
const MainLayout = require("../layouts/MainLayout");
const fallbackData = require("../utils/fallbackData");

const template = "<div class=\"container my-5\">\n    <div class=\"row mb-4\">\n        <div class=\"col-12\">\n            <h1 class=\"display-4 text-white\">My Weekly Schedule</h1>\n            <p class=\"lead text-white\">View your weekly fitness course schedule</p>\n        </div>\n    </div>\n\n    <div class=\"card shadow-sm mb-4 bg-dark\">\n        <div class=\"card-body\">\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <div class=\"table-responsive\">\n                        <table class=\"table table-striped table-dark\">\n                            <thead class=\"bg-primary text-white\">\n                                <tr>\n                                    <th>No.</th>\n                                    <th>Day</th>\n                                    <th>Time</th>\n                                    <th>Course</th>\n                                    <th>Trainer</th>\n                                </tr>\n                            </thead>\n                            <tbody class=\"text-white\">\n                                <% \n                                // Define days order for sorting\n                                const dayOrder = {\n                                    \"monday\": 1,\n                                    \"tuesday\": 2,\n                                    \"wednesday\": 3,\n                                    \"thursday\": 4,\n                                    \"friday\": 5,\n                                    \"saturday\": 6,\n                                    \"sunday\": 7\n                                };\n                                \n                                // Helper function to format time for sorting\n                                function timeToMinutes(timeStr) {\n                                    const [hours, minutes] = timeStr.split(':').map(Number);\n                                    return hours * 60 + minutes;\n                                }\n                                \n                                // Helper function to capitalize first letter\n                                function capitalizeFirst(str) {\n                                    return str.charAt(0).toUpperCase() + str.slice(1);\n                                }\n                                \n                                // Helper function to format date\n                                function formatDate(date) {\n                                    if (!date) return '';\n                                    const d = new Date(date);\n                                    return d.toLocaleDateString();\n                                }\n                                \n                                // Calculate days remaining\n                                function daysRemaining(endDate) {\n                                    if (!endDate) return '';\n                                    const now = new Date();\n                                    const end = new Date(endDate);\n                                    const diffTime = end - now;\n                                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));\n                                    return diffDays > 0 ? diffDays : 0;\n                                }\n                                \n                                // Flatten schedule into an array of all events\n                                const allEvents = [];\n                                if (schedule) {\n                                    Object.entries(schedule).forEach(([day, events]) => {\n                                        events.forEach(event => {\n                                            allEvents.push({\n                                                ...event,\n                                                day\n                                            });\n                                        });\n                                    });\n                                }\n                                \n                                // Sort events by day first, then by start time\n                                const sortedEvents = allEvents.sort((a, b) => {\n                                    // First sort by day\n                                    const dayDiff = dayOrder[a.day] - dayOrder[b.day];\n                                    if (dayDiff !== 0) return dayDiff;\n                                    \n                                    // Then sort by time\n                                    return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);\n                                });\n                                \n                                // Display events in numbered list\n                                sortedEvents.forEach((event, index) => { \n                                %>\n                                <tr class=\"<%= event.role === 'trainer' ? 'table-warning text-dark' : '' %>\">\n                                    <td><%= index + 1 %></td>\n                                    <td><%= capitalizeFirst(event.day) %></td>\n                                    <td><%= event.startTime %> - <%= event.endTime %></td>\n                                    <td>\n                                        <strong><%= event.courseName %></strong>\n                                        <% if (event.role === 'trainer') { %>\n                                            <span class=\"badge bg-warning text-dark\">Teaching</span>\n                                        <% } %>\n                                    </td>\n                                    <td>\n                                        <% if (event.role === 'trainee' && event.trainer) { %>\n                                            <%= event.trainer %>\n                                            <% if (event.enrollmentEnds) { %>\n                                                <br>\n                                                <small class=\"<%= daysRemaining(event.enrollmentEnds) < 7 ? 'text-danger' : 'text-white-50' %>\">\n                                                    Expires: <%= formatDate(event.enrollmentEnds) %>\n                                                    (<%= daysRemaining(event.enrollmentEnds) %> days left)\n                                                </small>\n                                            <% } %>\n                                        <% } else { %>\n                                            -\n                                        <% } %>\n                                    </td>\n                                </tr>\n                                <% }); %>\n                                \n                                <% if (sortedEvents.length === 0) { %>\n                                <tr>\n                                    <td colspan=\"5\" class=\"text-center py-4\">\n                                        <div class=\"alert alert-info mb-0\">\n                                            <i class=\"fas fa-info-circle me-2\"></i>\n                                            You don't have any scheduled classes yet. \n                                            <a href=\"/courses\" class=\"alert-link\">Browse courses</a> to enroll.\n                                        </div>\n                                    </td>\n                                </tr>\n                                <% } %>\n                            </tbody>\n                        </table>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";
const inlineScripts = [];
const externalScripts = [];

function Schedule(props) {
  const defaults = (fallbackData && fallbackData["schedule"]) || {};
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

module.exports = Schedule;




