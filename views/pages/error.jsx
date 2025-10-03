const React = require("react");
const ejs = require("ejs");
const MainLayout = require("../layouts/MainLayout");
const fallbackData = require("../utils/fallbackData");

const template = "<main>\n  <div class=\"container my-5\">\n    <div class=\"row justify-content-center\">\n      <div class=\"col-md-8\">\n        <div class=\"card\">\n          <div class=\"card-header bg-danger text-white\">\n            <h2><i class=\"fas fa-exclamation-triangle me-2\"></i>Error <%= statusCode || \"500\" %></h2>\n          </div>\n          <div class=\"card-body\">\n            <h3 class=\"text-danger\">Something went wrong!</h3>\n            \n            <p class=\"lead\"><%= message || \"The requested resource could not be found.\" %></p>\n            \n            <div class=\"mt-4 d-flex gap-2\">\n              <a href=\"/\" class=\"btn btn-primary\">\n                <i class=\"fas fa-home me-2\"></i>Return to Home\n              </a>\n              <button onclick=\"history.back()\" class=\"btn btn-secondary\">\n                <i class=\"fas fa-arrow-left me-2\"></i>Go Back\n              </button>\n            </div>\n            \n            <% if (process.env.NODE_ENV === 'development' && locals.stack) { %>\n              <div class=\"mt-4\">\n                <h4>Developer Information</h4>\n                <pre class=\"bg-dark text-light p-3 rounded\"><%= stack %></pre>\n              </div>\n            <% } %>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</main>";
const inlineScripts = [];
const externalScripts = [];

function Error(props) {
  const defaults = (fallbackData && fallbackData["error"]) || {};
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

module.exports = Error;




