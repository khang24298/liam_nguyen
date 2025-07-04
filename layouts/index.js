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
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', '/wp-content/themes/toh2025/dist/js/main.min.js');
  script.setAttribute('id', 'localised-js');
  document.head.appendChild(script);
});