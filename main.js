document.addEventListener('DOMContentLoaded', () => {
    const showFormBtn = document.getElementById("showFormButton");
    const form = document.getElementById("myForm");
    const addPlayerBtn = document.getElementById("addPlayerBtn");
    const closeBtn = document.getElementById("closeBtn");
    const changeContainer = document.getElementById("change");

    let editingCard = null; // Track the card being modified

    // Original card style (in the change container)
    const ORIGINAL_CARD_STYLE = "bg-[url('/images/badge_total_rush.webp')] h-[30vh] w-full bg-contain bg-center bg-no-repeat flex flex-col items-center";
    
    // Show form when the "Show Form" button is clicked
    showFormBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent any default action
        if (form) {
            form.classList.remove("hidden");
            editingCard = null; // Reset editing state
        }
    });

    // Close form when the "Close" button is clicked
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default form submission
        if (form) {
            form.classList.add("hidden");
            // Use .reset() only if form exists and is an actual form element
            if (form.reset && typeof form.reset === 'function') {
                form.reset();
            }
        }
    });

    // Function to safely get input value
    function getInputValue(id) {
        const element = document.getElementById(id);
        return element ? element.value : '';
    }

    // Handle form submission to add or modify a player card
    addPlayerBtn.addEventListener('click', (event) => {
        event.preventDefault();

        // Get form input values
        const playerName = getInputValue("Name");
        const photoURL = getInputValue("Photo");
        const nationalityURL = getInputValue("Nationality");
        const clubURL = getInputValue("club");
        const Position = getInputValue("position");
        const rating = getInputValue("rating");
        const passing = getInputValue("passing");
        const pace = getInputValue("pace");
        const shooting = getInputValue("shooting");
        const dribbling = getInputValue("dribbling");
        const defending = getInputValue("defending");
        const physical = getInputValue("physical");

        // Validate inputs
        const requiredFields = [
            playerName, photoURL, nationalityURL, clubURL, Position, 
            rating, passing, pace, shooting, dribbling, defending, physical
        ];

        if (requiredFields.some(field => !field)) {
            alert("Please fill in all fields.");
            return;
        }

        if (editingCard) {
            // Update existing card
            updateCardDetails(editingCard);
        } else {
            // Create a new card
            const playerCard = createPlayerCard();
            changeContainer.appendChild(playerCard);
        }

        // Hide the form and reset it
        if (form) {
            form.classList.add("hidden");
            // Safely reset form
            if (form.reset && typeof form.reset === 'function') {
                form.reset();
            }
        }

        // Reset editing state
        editingCard = null;
    });

    // Function to create a new player card
    function createPlayerCard() {
        const playerName = getInputValue("Name");
        const photoURL = getInputValue("Photo");
        const nationalityURL = getInputValue("Nationality");
        const clubURL = getInputValue("club");
        const Position = getInputValue("position");
        const pace = getInputValue("pace");
        const shooting = getInputValue("shooting");
        const passing = getInputValue("passing");
        const dribbling = getInputValue("dribbling");
        const defending = getInputValue("defending");
        const physical = getInputValue("physical");

        const playerCard = document.createElement("div");
        playerCard.className = ORIGINAL_CARD_STYLE;
        playerCard.innerHTML = `
            <div class="flex flex-col items-center justify-between h-[20vh] mb-10">
                <div class="flex h-[15vh] items-center justify-center"> 
                    <img src="${nationalityURL}" class="h-3 w-6 pl-2 player-nationality" alt="Nationality"> 
                    <img src="${photoURL}" class="h-20 w-20 player-photo" alt="Player Photo">
                    <img src="${clubURL}" class="h-5 w-7 pr-3 player-club" alt="Club">                    
                </div>  
                <div class="flex justify-center h-4 w-[5vw] text-[13px] mt-3">
                    <p class="text-white font-bold player-name">${playerName}</p>
                </div>
                <div class="flex flex-col">
                    <div class="flex h-10 w-[7vw] text-[9px] justify-between text-white font-semibold mt-2">
                        <p class="player-pace">PAC <br>${pace}</p>
                        <p class="player-shooting">SHO <br>${shooting}</p>
                        <p class="player-passing">PAS <br>${passing}</p>
                        <p class="player-dribbling">DRI <br>${dribbling}</p>
                        <p class="player-defending">DEF <br>${defending}</p>
                        <p class="player-physical">PHY <br>${physical}</p>
                    </div>
                    <div>
                        <p class="text-white text-center player-position">${Position}</p>
                    </div>
                    <div class="flex gap-1 text-white text-[10px] justify-center mt-3">
                        <div><p class="modify-button cursor-pointer">Modify</p></div>
                        <div><p class="delete-button cursor-pointer">Delete</p></div>
                        <div><p class="play-button cursor-pointer">Play</p></div>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners for delete, modify, and play
        playerCard.querySelector(".delete-button").addEventListener('click', () => {
            playerCard.remove();
        });

        playerCard.querySelector(".modify-button").addEventListener('click', () => {
            // Pre-fill the form with current card details
            populateFormWithCardDetails(playerCard);

            // Show the form
            form.classList.remove("hidden");
            editingCard = playerCard; // Set the card being modified
        });

        playerCard.querySelector(".play-button").addEventListener('click', () => {
            movePlayerToPosition(playerCard);
        });

        return playerCard;
    }

    // Function to update card details
    function updateCardDetails(card) {
        const playerName = getInputValue("Name");
        const photoURL = getInputValue("Photo");
        const nationalityURL = getInputValue("Nationality");
        const clubURL = getInputValue("club");
        const Position = getInputValue("position");
        const pace = getInputValue("pace");
        const shooting = getInputValue("shooting");
        const passing = getInputValue("passing");
        const dribbling = getInputValue("dribbling");
        const defending = getInputValue("defending");
        const physical = getInputValue("physical");

        card.querySelector(".player-name").textContent = playerName;
        card.querySelector(".player-photo").src = photoURL;
        card.querySelector(".player-nationality").src = nationalityURL;
        card.querySelector(".player-club").src = clubURL;
        card.querySelector(".player-position").textContent = Position;
        card.querySelector(".player-pace").textContent = `PAC\n${pace}`;
        card.querySelector(".player-shooting").textContent = `SHO\n${shooting}`;
        card.querySelector(".player-passing").textContent = `PAS\n${passing}`;
        card.querySelector(".player-dribbling").textContent = `DRI\n${dribbling}`;
        card.querySelector(".player-defending").textContent = `DEF\n${defending}`;
        card.querySelector(".player-physical").textContent = `PHY\n${physical}`;
    }

    // Function to populate form with card details
    function populateFormWithCardDetails(card) {
        document.getElementById("Name").value = card.querySelector(".player-name").textContent;
        document.getElementById("Photo").value = card.querySelector(".player-photo").src;
        document.getElementById("Nationality").value = card.querySelector(".player-nationality").src;
        document.getElementById("club").value = card.querySelector(".player-club").src;
        document.getElementById("position").value = card.querySelector(".player-position").textContent;
    }

    // Function to move player to position
    function movePlayerToPosition(playerCard) {
        const Position = playerCard.querySelector(".player-position").textContent;
        const destinationDiv = document.getElementById(Position);

        // Safely retrieve player statistics
      const getStatValue = (selector) => {
    const element = playerCard.querySelector(selector);
    if (element) {
        const parts = element.textContent.split('\n');
        return parts.length > 1 ? parts[1] : 'N/A';
    }
    return 'N/A';
};
        if (destinationDiv) {
            // Remove the card from its current parent
            playerCard.parentNode.removeChild(playerCard);

            // Modify the card to match the new style
            playerCard.className = "bg-[url('/images/badge_total_rush.webp')] h-[20vh] w-full bg-contain bg-center bg-no-repeat flex flex-col items-center mt-6";
            
            // Modify the inner HTML to match the provided style with safeguards
            playerCard.innerHTML = `
            <div class="flex flex-col items-center justify-center h-[15vh] mt-5">
                <div class="flex h-[15vh] items-center justify-center mt-4">
                    <img src="${playerCard.querySelector('.player-nationality')?.src || ''}" class="h-3 w-6 pl-3" alt="Flag"> 
                    <img src="${playerCard.querySelector('.player-photo')?.src || ''}" class="h-12 w-12" alt="Player">
                    <img src="${playerCard.querySelector('.player-club')?.src || ''}" class="h-5 w-7 pr-3" alt="Club">
                </div>  
                <div class="flex justify-center h-4 w-[5vw] text-[10px] mb-2">
                    <p class="text-white font-bold player-name">${playerCard.querySelector('.player-name')?.textContent || 'Unknown Player'}</p>
                </div>
                <div class="flex flex-col justify-center">
                    <div class="flex h-5 w-[5vw] text-[6px] justify-between text-white font-semibold mb-2">
                        <p>PAC <br>${getStatValue('.player-pace')}</p>
                        <p>SHO <br>${getStatValue('.player-shooting')}</p>
                        <p>PAS <br>${getStatValue('.player-passing')}</p>
                        <p>DRI <br>${getStatValue('.player-dribbling')}</p>
                        <p>DEF <br>${getStatValue('.player-defending')}</p>
                        <p>PHY <br>${getStatValue('.player-physical')}</p>
                    </div>
                    <div class="bg-red-400">
                        <p class="text-white text-center player-position text-[8px] h-3">${Position}</p>
                    </div>
                    <div class="flex gap-1 text-white text-[8px] justify-center mt-3">
                        <div><p class="modify-button cursor-pointer">Modify</p></div>
                        <div><p class="delete-button cursor-pointer">Delete</p></div>
                        <div><p class="play-button cursor-pointer">Play</p></div>
                    </div>
                </div>
            </div>
            `;

            // Re-add event listeners (same as before)
            playerCard.querySelector(".delete-button").addEventListener('click', () => {
                playerCard.remove();
            });

            playerCard.querySelector(".modify-button").addEventListener('click', () => {
                populateFormWithCardDetails(playerCard);
                form.classList.remove("hidden");
                editingCard = playerCard;
            });

            playerCard.querySelector(".play-button").addEventListener('click', () => {
                movePlayerToPosition(playerCard);
            });

            // Clear the destination div (optional)
            destinationDiv.innerHTML = "";

            // Append the card to the new position
            destinationDiv.appendChild(playerCard);
        } else {
            alert(`No position found for ID "${Position}"`);
        }
    }
});