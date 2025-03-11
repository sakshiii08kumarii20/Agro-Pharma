fetch('./Footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('Footer').innerHTML = data;
  })
  .catch(error => {
    console.error('Error loading Footer:', error);
  });
fetch('./Navbar.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('Navbar').innerHTML = data;
  })
  .catch(error => {
    console.error('Error loading Navbar:', error);
  });