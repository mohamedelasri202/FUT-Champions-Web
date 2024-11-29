document.addEventListener('DOMContentLoaded', () => {
    const showFormBtn = document.getElementById("showFormButton");
    const form = document.getElementById("myForm");
    const addPlayerBtn = document.getElementById("addPlayerBtn");
    const closeBtn = document.getElementById("closeBtn");
    const changeContainer = document.getElementById("change");

    let editingCard = null; // Track the card being modified

    // Show form when the "Show Form" button is clicked
    showFormBtn.addEventListener('click', () => {
        form.classList.remove("hidden");
        editingCard = null; // Reset editing state
    });

    // Close form when the "Close" button is clicked
    closeBtn.addEventListener('click', () => {
        form.classList.add("hidden");
        form.reset(); // Clear form inputs
    });

    // Handle form submission to add or modify a player card
    addPlayerBtn.addEventListener('click', (event) => {
        event.preventDefault();

        // Get form input values
        const playerName = document.getElementById("Name").value;
        const photoURL = document.getElementById("Photo").value;
        const nationalityURL = document.getElementById("Nationality").value;
        const clubURL = document.getElementById("club").value;
        const Position = document.getElementById("position").value;
        const rating = document.getElementById("rating").value;
        const passing = document.getElementById("passing").value;
        const pace = document.getElementById("pace").value;
        const shooting = document.getElementById("shooting").value;
        const dribbling = document.getElementById("dribbling").value;
        const defending = document.getElementById("defending").value;
        const physical = document.getElementById("physical").value;

        // Validate inputs
        if (!playerName || !photoURL || !nationalityURL || !clubURL || !Position || !rating || !passing || !pace || !shooting || !dribbling || !defending || !physical) {
            alert("Please fill in all fields.");
            return;
        }

        if (editingCard) {
            // Update existing card
            editingCard.querySelector(".player-name").textContent = playerName;
            editingCard.querySelector(".player-photo").src = photoURL;
            editingCard.querySelector(".player-nationality").src = nationalityURL;
            editingCard.querySelector(".player-club").src = clubURL;
            editingCard.querySelector(".player-position").textContent = Position;
            editingCard.querySelector(".player-pace").textContent = `PAC\n${pace}`;
            editingCard.querySelector(".player-shooting").textContent = `SHO\n${shooting}`;
            editingCard.querySelector(".player-passing").textContent = `PAS\n${passing}`;
            editingCard.querySelector(".player-dribbling").textContent = `DRI\n${dribbling}`;
            editingCard.querySelector(".player-defending").textContent = `DEF\n${defending}`;
            editingCard.querySelector(".player-physical").textContent = `PHY\n${physical}`;
        } else {
            // Create a new card
            const playerCard = document.createElement("div");
            playerCard.className = "bg-[url('/images/badge_total_rush.webp')] h-full w-full bg-contain bg-center bg-no-repeat flex flex-col items-center mt-6";
            playerCard.innerHTML = `
               
                <div class="" >
                  <div class="flex flex-col items-center justify-between h-[20vh] mt-1">
                      <div class="flex h-full items-end justify-between" > 
                          <img src="${nationalityURL}" class="h-2 w-4 pl-2 player-nationality" alt=""> 
                          <img src="${photoURL}" class="w-10  player-photo" alt="">
                          <img src="${clubURL}" class="h-4 w-6 pr-3 player-club" alt="">                    
                      </div>  
                      <div class="flex  text-[8px] mt-">
                          <p class="text-white font-bold player-name ">${playerName}</p>
                      </div>
                      <div class="flex flex-col items-center">
                          <div class="flex h-full w-[5vw] text-[5px] justify-between text-white font-semibold mr ">
                              <p class="player-pace">PAC <br>${pace}</p>
                              <p class="player-shooting">SHO <br>${shooting}</p>
                              <p class="player-passing">PAS <br>${passing}</p>
                              <p class="player-dribbling">DRI <br>${dribbling}</p>
                              <p class="player-defending">DEF <br>${defending}</p>
                              <p class="player-physical">PHY <br>${physical}</p>
                          </div>
                          <div>
                              <p class="text-white font-semibold flex h-full w-[7vw] text-[10px] justify-center  player-position">${Position}</p>
                          </div>
                          <div class="flex gap-1 text-white text-[10px] justify-center mt-3 h-fit  ">
                              <div><p class="modify-button cursor-pointer">Modify</p></div>
                              <div><p class="delete-button cursor-pointer">Delete</p></div>
                              <div><p class="play-button cursor-pointer">Play</p></div>
                          </div>
                      </div>
                  </div>
              </div>
            `;

            // Append the new card to the container with id "change"
            changeContainer.appendChild(playerCard);

            // Add event listeners for delete, modify, and play
            playerCard.querySelector(".delete-button").addEventListener('click', () => {
                playerCard.remove();
            });

            playerCard.querySelector(".modify-button").addEventListener('click', () => {
                // Pre-fill the form with current card details
                document.getElementById("Name").value = playerName;
                document.getElementById("Photo").value = photoURL;
                document.getElementById("Nationality").value = nationalityURL;
                document.getElementById("club").value = clubURL;
                document.getElementById("position").value = Position;
                document.getElementById("rating").value = rating;
                document.getElementById("passing").value = passing;
                document.getElementById("pace").value = pace;
                document.getElementById("shooting").value = shooting;
                document.getElementById("dribbling").value = dribbling;
                document.getElementById("defending").value = defending;
                document.getElementById("physical").value = physical;

                // Show the form
                form.classList.remove("hidden");
                editingCard = playerCard; // Set the card being modified
            });

            playerCard.querySelector(".play-button").addEventListener('click', () => {
                const destinationId = Position; // Use the position as the target id
                const destinationDiv = document.getElementById(destinationId);

                if (destinationDiv) {
                    destinationDiv.innerHTML = ""; // Clear the destination div (optional)
                    destinationDiv.appendChild(playerCard); // Move the card
                } else {
                    alert(`No position found for ID "${destinationId}"`);
                }
            });
        }

        // Hide the form and reset it
        form.classList.add("hidden");
        form.reset();
    });
});