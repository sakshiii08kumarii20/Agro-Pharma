document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cardWrapper");
  const dotsContainer = document.getElementById("scrollDots");

  let allUsers = []; // Store fetched data

  // Fetch posts
  async function fetchProduct() {
      const response = await fetch('../H-cardData/data.json');
      allUsers = await response.json();
      displayData(allUsers);
      createDots(allUsers.length);
  }

  // Display users inside the div
  function displayData(users) {
      container.innerHTML = ""; // Clear previous data

      users.forEach(user => {
          let userDiv = document.createElement("div");
          userDiv.classList.add("card");
          userDiv.innerHTML = `
              <div class="product-image">
                  <img src="${user.imgpath}" alt="Agro Yield" width="100%" height="100%">
              </div>
              <div class="product-price-container">
              <h2 class="product-title">${user.productName}</h2>
              <p class="product-price">₹ ${user.productPrize}</p>
              </div>
              <div class="rating">
                  ${"⭐".repeat(user.srarrating)}
              </div>
              <p class="product-description">
                  ${user.productinfo}
                  <button class="read-more-button" onclick="toggleText(this)">Read More</button>
              </p>
              <div class="buttons">
                  <button class="add-to-cart">Add to cart</button>
                  <button class="buy-now">Buy now</button>
              </div>
          `;
          container.appendChild(userDiv);
      });
  }

  // Create dots for scrolling
  function createDots(count) {
      dotsContainer.innerHTML = "";
      for (let i = 0; i < count; i++) {
          let dot = document.createElement("div");
          dot.classList.add("dot");
          dot.addEventListener("click", () => scrollToCard(i)); // Add click event
          dotsContainer.appendChild(dot);
      }
      updateDots(); // Set initial active dot
  }

  // Scroll to the corresponding card when clicking a dot
  function scrollToCard(index) {
      const cardWidth = document.querySelector(".card").offsetWidth;
      const scrollPosition = index * (cardWidth + 10); // Adjust for gap
      container.scrollTo({ left: scrollPosition, behavior: "smooth" });
  }

  // Update dot active state on scroll
  function updateDots() {
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const index = Math.round((scrollLeft / scrollWidth) * (dotsContainer.children.length - 1));

      Array.from(dotsContainer.children).forEach((dot, i) => {
          dot.classList.toggle("active", i === index);
      });
  }

  // Add scroll event listener
  container.addEventListener("scroll", updateDots);

  fetchProduct();
});