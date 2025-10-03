const React = require("react");
const Header = require("../partials/Header");
const Footer = require("../partials/Footer");

function MainLayout(props) {
  const {
    title,
    children,
    stylesheets = [],
    scripts = [],
    flashMessage,
    flashType,
    ...layoutProps
  } = props;

  const headLinks = Array.from(
    new Set([
      "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
      "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
      "/css/styles.css",
      ...stylesheets,
    ])
  );

  const scriptSources = Array.from(
    new Set([
      "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
      ...scripts,
      "/js/main.js",
    ])
  );

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title || "FitSync - Gym Management System"}</title>
        {headLinks.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
      </head>
      <body>
        <Header {...layoutProps} />
        {flashMessage ? (
          <div
            className={`alert alert-${flashType || "info"} alert-dismissible fade show`}
            role="alert"
          >
            {flashMessage}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        ) : null}
        {children}
        <Footer />
        {scriptSources.map((src) => (
          <script key={src} src={src}></script>
        ))}
      </body>
    </html>
  );
}

module.exports = MainLayout;
