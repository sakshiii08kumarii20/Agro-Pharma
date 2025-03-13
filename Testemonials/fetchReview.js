document.addEventListener("DOMContentLoaded", () => {

   

    const container = document.getElementById("cards");
   

    let allReviws = []; // Store fetched data

  // Fetch data from JSON file
    // Fetch posts
      async function fetchProduct() {
        const response = await fetch('./review.json');
        allReviws = await response.json();
        displayData(allReviws);
       
    }
    // Display users inside the div
function displayData(reviews) {
      
  container.innerHTML = ""; // Clear previous data

  reviews.forEach(review => {
      let reviewDiv = document.createElement("div");
      reviewDiv.classList.add("card"); // Add class for styling
      reviewDiv.innerHTML = 
      ` <div class="card-image">
          <img src="${review.imgpath}" alt="Card Image" width="100%" height="100%">
        </div>
        
        <div class="card-content">
                      <h2 id="product-name"  class="card-title">${review.clientName
            }
                      </h2>

                      ${'⭐'.repeat(review.srarrating)
            }
            
                    
                      <p class="card-text">${review.reviewText
            }</p>

             
      `;
      container.appendChild(reviewDiv);
        });
    }



  fetchProduct();
});

