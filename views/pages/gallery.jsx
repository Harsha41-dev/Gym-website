const React = require("react");
const MainLayout = require("../layouts/MainLayout");

const galleryImages = [
  { src: "/images/gallery/gallery1.jpg", alt: "Gallery Image 1", variant: "gallery-item-large" },
  { src: "/images/gallery/gallery2.jpg", alt: "Gallery Image 2" },
  { src: "/images/gallery/gallery3.jpg", alt: "Gallery Image 3" },
  { src: "/images/gallery/gallery4.jpg", alt: "Gallery Image 4", variant: "gallery-item-wide" },
  { src: "/images/gallery/gallery5.jpg", alt: "Gallery Image 5" },
  { src: "/images/gallery/gallery6.jpg", alt: "Gallery Image 6" },
  { src: "/images/gallery/gallery7.jpg", alt: "Gallery Image 7", variant: "gallery-item-tall" },
  { src: "/images/gallery/gallery8.jpg", alt: "Gallery Image 8" },
  { src: "/images/gallery/gallery9.jpg", alt: "Gallery Image 9" },
  { src: "/images/gallery/gallery10.jpg", alt: "Gallery Image 10" },
  { src: "/images/gallery/gallery11.jpg", alt: "Gallery Image 11" },
  { src: "/images/gallery/gallery12.jpg", alt: "Gallery Image 12" }
];

function Gallery(props) {
  const images = Array.isArray(props.images) && props.images.length ? props.images : galleryImages;

  return (
    <MainLayout {...props} stylesheets={["/css/gallery.css"]}>
      <main>
        <section className="py-5">
          <div className="container">
            <h1 className="text-center text-danger mb-5">Gallery</h1>
            <div className="gallery">
              {images.map((image, index) => (
                <div
                  key={`${image.src}-${index}`}
                  className={['gallery-item', image.variant].filter(Boolean).join(' ')}
                >
                  <img src={image.src} alt={image.alt} className="gallery-image" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}

module.exports = Gallery;




