// Injects the footer.html content into the #footer element
Promise.all([
  fetch('/layouts/nav.html')
    .then(res => res.text())
    .then(html => {
      const nav = document.getElementById('navigation');
      if (nav) nav.innerHTML = html;
      fetch('/layouts/footer.html')
        .then(response => response.text())
        .then(data => {
          const footer = document.getElementById('footer');
          if (footer) footer.innerHTML = data;
        });
    })
]).then(() => {
    // Contact Popup Modal Logic
  const openPopupButton = document.getElementById('open-contact-popup');
  const closePopupButton = document.getElementById('close-contact-popup');
  const contactPopup = document.getElementById('contact-popup');

  if (openPopupButton && closePopupButton && contactPopup) {
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
  }

  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', '/wp-content/themes/toh2025/dist/js/main.min.js');
  script.setAttribute('id', 'localised-js');
  document.head.appendChild(script);
});