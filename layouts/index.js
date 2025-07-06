// Injects nav and footer content, then initializes dependent scripts
const navPromise = fetch('/layouts/nav.html')
  .then(res => res.text())
  .then(html => {
    const nav = document.getElementById('navigation');
    if (nav) nav.innerHTML = html;
  });

const footerPromise = fetch('/layouts/footer.html')
  .then(response => response.text())
  .then(data => {
    const footer = document.getElementById('footer');
    if (footer) footer.innerHTML = data;
  });

Promise.all([navPromise, footerPromise]).then(() => {
    console.log('Nav and footer loaded. Initializing scripts.');
    // Contact Popup Modal Logic
    const openPopupButton = document.getElementById('open-contact-popup');
    const closePopupButton = document.getElementById('close-contact-popup');
    const contactPopup = document.getElementById('contact-popup');

    if (openPopupButton && closePopupButton && contactPopup) {
      console.log('Contact popup elements found. Attaching events.');
      openPopupButton.addEventListener('click', (e) => {
        e.preventDefault();
        contactPopup.classList.add('active');
      });

      const closePopup = (e) => {
          if (e) e.preventDefault();
          contactPopup.classList.remove('active');
      }

      closePopupButton.addEventListener('click', closePopup);

      // Close popup when clicking on the overlay
      contactPopup.addEventListener('click', (e) => {
        if (e.target === contactPopup) {
          closePopup(e);
        }
      });

      // Close popup with Escape key
      document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && contactPopup.classList.contains('active')) {
              closePopup(e);
          }
      });
    } else {
        console.log('Could not find all contact popup elements.');
    }

    // Image Zoom Logic
    const zoomModal = document.getElementById('zoom-modal');
    if (zoomModal) {
      console.log('Zoom modal found. Attaching events.');
        const imagesToZoom = document.querySelectorAll('.image-demo');
        const modalImage = document.getElementById('zoomed-image');
        const closeModal = document.querySelector('.zoom-modal-close');

        imagesToZoom.forEach(image => {
            image.addEventListener('click', () => {
                zoomModal.style.display = "block";
                modalImage.src = image.src;
            });
        });

        const closeZoomModal = () => {
            zoomModal.style.display = "none";
        }

        if(closeModal) {
          closeModal.addEventListener('click', closeZoomModal);
        }

        zoomModal.addEventListener('click', (e) => {
            if (e.target === zoomModal) {
                closeZoomModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && zoomModal.style.display === 'block') {
                closeZoomModal();
            }
        });
    } else {
        console.log('Zoom modal not found.');
    }

    // Load main script
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', '/wp-content/themes/toh2025/dist/js/main.min.js');
    script.setAttribute('id', 'localised-js');
    document.head.appendChild(script);
});