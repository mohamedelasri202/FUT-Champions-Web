document.addEventListener('DOMContentLoaded', () => {
    const showFormBtn = document.getElementById("showFormButton");
    const form = document.getElementById("myForm");
    const addPlayerBtn = document.getElementById("addPlayerBtn");
    const closeBtn = document.getElementById("closeBtn");
    const changeContainer = document.getElementById("change");
    const showBenchBTN = document.getElementById("showBenchButton");
    const Bench = document.getElementById("bench");

    let editingCard = null;

    // Simplified validation function
    function validateForm() {
        const inputs = form.querySelectorAll('input');
        let isValid = true;
        const errorMessages = [];

        // Remove previous error styles
        inputs.forEach(input => input.classList.remove('border-red-500'));

        inputs.forEach(input => {
            const value = input.value.trim();

            // Basic empty check
            if (value === '') {
                input.classList.add('border-red-500');
                errorMessages.push(`${input.name} is required`);
                isValid = false;
                return;
            }

            // Simple URL validation
            if (input.type === 'url' && !value.startsWith('http')) {
                input.classList.add('border-red-500');
                errorMessages.push(`Please enter a valid URL for ${input.name}`);
                isValid = false;
            }

            // Number validation
            if (input.type === 'number') {
                const numValue = parseFloat(value);
                if (isNaN(numValue) || numValue < 10 || numValue > 99) {
                    input.classList.add('border-red-500');
                    errorMessages.push(`${input.name} must be between 10 and 99`);
                    isValid = false;
                }
            }

            // Name validation (kept simple)
            if (input.id === 'Name' && !/^[a-zA-Z]{3,}$/.test(value)) {
                input.classList.add('border-red-500');
                errorMessages.push('Name must be at least 3 letters');
                isValid = false;
            }
        });

        // Position validation
        const positionSelect = document.getElementById('position');
        if (positionSelect.value === '') {
            positionSelect.classList.add('border-red-500');
            errorMessages.push('Please select a position');
            isValid = false;
        }

        // Create or update error container
        let errorContainer = document.getElementById('errorMessages');
        if (!errorContainer) {
            errorContainer = document.createElement('div');
            errorContainer.id = 'errorMessages';
            errorContainer.classList.add('text-red-500', 'mb-4');
            form.insertBefore(errorContainer, form.firstChild);
        }

        // Clear previous errors
        errorContainer.innerHTML = '';

        // Display new errors
        if (!isValid) {
            errorMessages.forEach(message => {
                const errorDiv = document.createElement('div');
                errorDiv.textContent = message;
                errorContainer.appendChild(errorDiv);
            });
        }

        return isValid;
    }

    // Reset form function
    const resetForm = () => {
        form.reset();
        const errorContainer = document.getElementById('errorMessages');
        if (errorContainer) {
            errorContainer.innerHTML = '';
        }
    };

    // Function to add listeners to card buttons
    function addCardButtonListeners(cardElement) {
        const deleteBtn = cardElement.querySelector('.delete-button');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                const playerCard = event.target.closest('.player-card');
                if (playerCard) {
                    playerCard.remove();
                }
            });
        }

        const modifyBtn = cardElement.querySelector('.modify-button');
        if (modifyBtn) {
            modifyBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                const playerCard = event.target.closest('.player-card');
                if (playerCard) {
                    // Extract card details (kept same as original)
                    const playerName = playerCard.querySelector(".player-name").textContent;
                    const photoURL = playerCard.querySelector(".player-photo").src;
                    const nationalityURL = playerCard.querySelector(".player-nationality").src;
                    const clubURL = playerCard.querySelector(".player-club").src;
                    const Position = playerCard.querySelector(".player-position").textContent;
                    const pace = playerCard.querySelector(".player-pace").textContent.split('\n')[1];
                    const shooting = playerCard.querySelector(".player-shooting").textContent.split('\n')[1];
                    const passing = playerCard.querySelector(".player-passing").textContent.split('\n')[1];
                    const dribbling = playerCard.querySelector(".player-dribbling").textContent.split('\n')[1];
                    const defending = playerCard.querySelector(".player-defending").textContent.split('\n')[1];
                    const physical = playerCard.querySelector(".player-physical").textContent.split('\n')[1];

                    // Populate form fields
                    document.getElementById("Name").value = playerName;
                    document.getElementById("Photo").value = photoURL;
                    document.getElementById("Nationality").value = nationalityURL;
                    document.getElementById("club").value = clubURL;
                    document.getElementById("position").value = Position;
                    document.getElementById("passing").value = passing;
                    document.getElementById("pace").value = pace;
                    document.getElementById("shooting").value = shooting;
                    document.getElementById("dribbling").value = dribbling;
                    document.getElementById("defending").value = defending;
                    document.getElementById("physical").value = physical;

                    form.classList.remove("hidden");
                    editingCard = playerCard;
                }
            });
        }

        const playBtn = cardElement.querySelector('.play-button');
        if (playBtn) {
            playBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                const playerCard = event.target.closest('.player-card');
                if (playerCard) {
                    // Check which container the card is in
                    const currentContainer = playerCard.closest('[id]');
                    const changeContainer = document.getElementById("change");
                    const matchDivs = document.querySelectorAll('[id^="match"]');

                    if (currentContainer.id === "change") {
                        // Try to place in a match position based on the player's position
                        const positionId = playerCard.querySelector(".player-position").textContent;
                        const destinationDiv = document.getElementById(positionId);
                        if (destinationDiv) {
                            const existingCard = destinationDiv.querySelector('.player-card');
                            if (existingCard) {
                                changeContainer.appendChild(existingCard);
                            }
                            destinationDiv.appendChild(playerCard);
                        } else {
                            alert(`No position found for ID "${positionId}"`);
                        }
                    } else {
                        // Move back to change container
                        changeContainer.appendChild(playerCard);
                    }
                }
            });
        }
    }

    // Show form event listener
    showFormBtn.addEventListener('click', () => {
        form.classList.remove("hidden");
        editingCard = null;
        resetForm();
    });

    // Close form event listener
    closeBtn.addEventListener('click', () => {
        form.classList.add("hidden");
        resetForm();
    });

    // Show bench event listener
    showBenchBTN.addEventListener('click', () => {
        Bench.classList.toggle("hidden");
        
    });

    // Add player event listener
    addPlayerBtn.addEventListener('click', (event) => {
        event.preventDefault();

        // Validate the form first
        if (!validateForm()) {
            return;
        }

        // Get form input values
        const playerName = document.getElementById("Name").value;
        const photoURL = document.getElementById("Photo").value;
        const nationalityURL = document.getElementById("Nationality").value;
        const clubURL = document.getElementById("club").value;
        const Position = document.getElementById("position").value;
        const passing = document.getElementById("passing").value;
        const pace = document.getElementById("pace").value;
        const shooting = document.getElementById("shooting").value;
        const dribbling = document.getElementById("dribbling").value;
        const defending = document.getElementById("defending").value;
        const physical = document.getElementById("physical").value;

        // Editing existing card
        if (editingCard) {
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

            // Handle position change
            const newContainer = document.getElementById(Position);
            if (newContainer && newContainer !== editingCard.parentNode) {
                const existingCard = newContainer.querySelector('.player-card');
                if (existingCard) {
                    changeContainer.appendChild(existingCard);
                }
                newContainer.appendChild(editingCard);
            }
        } else {
            // Create new player card
            const playerCard = document.createElement("div");
            playerCard.className = "bg-[url('badge_total_rush.webp')] h-full w-full bg-contain bg-center bg-no-repeat flex flex-col items-center  player-card";
            playerCard.setAttribute("data-unique-id", Date.now());
            playerCard.innerHTML = `
                <div>
                  <div class="flex flex-col items-center justify-between h-[20vh] mt-1">
                      <div class="flex h-full items-end justify-between"> 
                          <img src="${nationalityURL}" class="h-2 w-4 pl-2 player-nationality" alt=""> 
                          <img src="${photoURL}" class="w-10 player-photo" alt="">
                          <img src="${clubURL}" class="h-4 w-6 pr-3 player-club" alt="">                    
                      </div>  
                      <div class="flex text-[8px] mt-1">
                          <p class="text-white font-bold player-name">${playerName}</p>
                      </div>
                      <div class="flex flex-col items-center">
                          <div class="flex h-full w-[5vw] text-[5px] justify-between text-white font-semibold">
                              <p class="player-pace">PAC <br>${pace}</p>
                              <p class="player-shooting">SHO <br>${shooting}</p>
                              <p class="player-passing">PAS <br>${passing}</p>
                              <p class="player-dribbling">DRI <br>${dribbling}</p>
                              <p class="player-defending">DEF <br>${defending}</p>
                              <p class="player-physical">PHY <br>${physical}</p>
                          </div>
                          <div>
                              <p class="text-white font-semibold flex h-full w-[7vw] text-[10px] justify-center player-position">${Position}</p>
                          </div>
                          <div class="flex gap-1 text-white text-[10px] justify-center mt-3 h-fit">
                              <div class="modify-button cursor-pointer"><i class="fa-solid fa-pen-to-square"></i></div>
                              <div class="delete-button cursor-pointer"> <i class="fa-solid fa-trash"></i></div>
                              <div class="play-button cursor-pointer"><i class="fa-solid fa-rotate"></i></div>
                          </div>
                      </div>
                  </div>
              </div>
            `;

            // Add event listeners to the new card
            addCardButtonListeners(playerCard);

            // Append the new card to the container with id "change"
            changeContainer.appendChild(playerCard);
        }

        // Hide the form and reset it
        form.classList.add("hidden");
        resetForm();
        
        // Show success message
        alert('Player added/updated successfully!');
    });
});