document.addEventListener('DOMContentLoaded', () => {
    const showFormBtn = document.getElementById("showFormButton");
    const form = document.getElementById("myForm");
    const addPlayerBtn = document.getElementById("addPlayerBtn");
    const closeBtn = document.getElementById("closeBtn");

    // Show form when the "Show Form" button is clicked
    showFormBtn.addEventListener('click', () => {
        form.classList.remove("hidden");
    });

    // Close form when the "Close" button is clicked
    closeBtn.addEventListener('click', () => {
        form.classList.add("hidden");
    });

    // Handle form submission to add a player to the selected position
    addPlayerBtn.addEventListener('click', (event) => {
        event.preventDefault();

        // Get form input values
        const playerName = document.getElementById("Name").value;
        const position = document.getElementById("position").value;
        const photoURL = document.getElementById("Photo").value;
        const nationalityURL = document.getElementById("Nationality").value;
        const clubURL = document.getElementById("club").value;
        const rating = document.getElementById("rating").value;
        const passing = document.getElementById("passing").value;
        const pace = document.getElementById("pace").value;
        const shooting = document.getElementById("shooting").value;
        const dribbling = document.getElementById("dribbling").value;
        const defending = document.getElementById("defending").value;
        const physical = document.getElementById("physical").value;

        // Validate form inputs
        if (!playerName || !position || !photoURL || !nationalityURL || !clubURL || !rating || !passing || !pace || !shooting || !dribbling || !defending || !physical) {
            alert("Please fill in all fields.");
            return;
        }

        // Data to be displayed in the card
        const playerData = {
            name: playerName,
            photoURL: photoURL,
            nationalityURL: nationalityURL,
            clubURL: clubURL,
            rating: rating,
            passing: passing,
            pace: pace,
            shooting: shooting,
            dribbling: dribbling,
            defending: defending,
            physical: physical
        };

        // Get the corresponding card based on the position selected
        const positionDiv = document.getElementById(position);

        if (!positionDiv) {
            alert("Invalid position selected.");
            return;
        }

        // Insert the player data into the correct position card
        positionDiv.innerHTML = `
            <div class="flex flex-col items-center justify-center h-[15vh] mt-5">
                <div class="flex h-[15vh] items-center justify-center mt-4"> 
                    <img src="${playerData.nationalityURL}" class="h-3 w-6 pl-3" alt="Flag"> 
                    <img src="${playerData.photoURL}" class="h-12 w-12" alt="Player">
                    <img src="${playerData.clubURL}" class="h-5 w-7 pr-3" alt="Club">                    
                </div>  
                <div class="flex justify-center h-4 w-[5vw] text-[10px] mb-2">
                    <p class="text-white font-bold">${playerData.name}</p>
                </div>
                <div class="flex flex-col">
                    <div class="flex h-8 w-[5vw] text-[6px] justify-between text-white font-semibold mb-2">
                        <p>PAC <br>${playerData.pace}</p>
                        <p>SHO <br>${playerData.shooting}</p>
                        <p>PAS <br>${playerData.passing}</p>
                        <p>DRI <br>${playerData.dribbling}</p>
                        <p>DEF <br>${playerData.defending}</p>
                        <p>PHY <br>${playerData.physical}</p>
                    </div>
                    <div class="flex justify-center"><p class="font-bold text-white">${position}</p></div>
                </div>
            </div>
        `;

        // Hide the form after submission
        form.classList.add("hidden");

        // Optionally reset the form (you can comment this out if you don't want to clear the form)
        form.reset();
    });
});
