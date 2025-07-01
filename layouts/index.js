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

      fetch('/layouts/hotline.html')
        .then(response => response.text())
        .then(data => {
          const hotLine = document.getElementById('hot-line');
          if (hotLine) hotLine.innerHTML = data;
        });

      fetch('/layouts/zalo.html')
        .then(response => response.text())
        .then(data => {
          const zalo = document.getElementById('zalo');
          if (zalo) zalo.innerHTML = data;
        });
    })
]).then(() => {
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', '/wp-content/themes/toh2025/dist/js/main.min.js');
  script.setAttribute('id', 'localised-js');
  document.head.appendChild(script);
});