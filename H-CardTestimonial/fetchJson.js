document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cardWrapper1");
  const dotsContainer = document.getElementById("scrollDots1");

  let allUsers = []; // Store fetched data

  // Fetch posts
  async function fetchProduct() {
      const response = await fetch('../H-CardTestimonial/data.json');
      allUsers = await response.json();
      displayData(allUsers);
      createDots(allUsers.length);
  }

  // Display users inside the div
  function displayData(users) {
      container.innerHTML = ""; // Clear previous data

      users.forEach(user => {
          let userDiv = document.createElement("div");
          userDiv.classList.add("card-testimonial");
          userDiv.innerHTML = `
              <div class="image-container-testimonial">
            <img src="${user.imgpath}" alt="img" width="100%" height="100%">
        </div>
        <div class="content">
          <div class="Name-rating-container">
            <h3>${user.customerName}</h3>
            <div class="stars">
               ${"⭐".repeat(user.starRating)}
            </div>
            </div>
            <p>
            ${user.reply}
            </p>
            <button class="read-more-button" onclick="toggleText(this)">Read More</button>
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