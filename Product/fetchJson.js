document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("cards");
    const searchBox = document.getElementById("searchInput");
    const filterBox = document.getElementById("productFilter");

    let allUsers = []; // Store fetched data

  // Fetch data from JSON file
 
      // Fetch posts
      async function fetchProduct() {
        const response = await fetch('./data.json');
        allUsers = await response.json();
        displayData(allUsers);
        setupFilters(allUsers);
    }

  // Display users inside the div
function displayData(users) {
      
  container.innerHTML = ""; // Clear previous data

  users.forEach(user => {
      let userDiv = document.createElement("div");
      userDiv.classList.add("card"); // Add class for styling
      userDiv.innerHTML = 
      ` <div class="card-image">
          <img src="${user.imgpath}" alt="Card Image" width="100%" height="100%">
        </div>
        
        <div class="card-content">
                  <div class="product-price-container">
                      <h2 id="product-name"  class="card-title">${user.productName}
                      </h2>
                        <p class="product-price">₹ ${user.productPrize}
                      </p>

                      </div>

                      <div class="rating">

                      ${'⭐'.repeat(user.srarrating)}
                      </div>
                    
                      <p class="card-text">${user.productinfo}</p>

                      <div class="card-actions">
                        <button class="btn add-to-cart">Add to cart ${user.addtocart}</button><button class="btn" onclick="whatsappSend('${user.productName}')">Buy now</button>
                      </div>
                    </div>
      `;
      container.appendChild(userDiv);
  });
}

 // Setup search and filter functionality
 function setupFilters(setProduct) {
  function applyFilters() {
      const query = searchBox.value.toLowerCase();
      const filterType = filterBox.value; // Get selected filter type

      const filteredPosts = setProduct.filter(setPro => {
          const matchesSearch = setPro.productName.toLowerCase().includes(query);
          const matchesFilter = filterType === 'all' || setPro.productCategory === filterType;
          return matchesSearch && matchesFilter;
      });

      displayData(filteredPosts);
  }

  searchBox.addEventListener('input', applyFilters);
  filterBox.addEventListener('change', applyFilters);
}
  

  fetchProduct();
});

