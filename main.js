document.addEventListener('DOMContentLoaded', () => {
    const showBtn = document.getElementById("showFormButton");
    const form = document.getElementById("myForm");
    const closeBtn = document.querySelector('.bg-blue-950');

    showBtn.onclick = () => form.classList.remove("hidden");
    closeBtn.onclick = () => form.classList.add("hidden");
});


document.querySelector('.bg-red-950').addEventListener('click', function(event) {
    event.preventDefault();
    
    // Validate number inputs
    const numberInputs = document.querySelectorAll('input[type="number"]');
    for (let input of numberInputs) {
        const value = input.value.trim();
        if (value === '' || isNaN(value) || value < 10 || value > 99) {
            alert(`${input.labels[0].textContent} must be a number between 10 and 99`);
            return;
        }
    }

    // Validate text and URL inputs
    const textAndUrlInputs = document.querySelectorAll('input[type="text"], input[type="url"]');
    for (let input of textAndUrlInputs) {
        const value = input.value.trim();
        if (value === '') {
            alert(`${input.labels[0].textContent} cannot be empty`);
            return;
        }
        
        // Simple URL validation for URL inputs
        if (input.type === 'url' && !/^https?:\/\/\S+\.\S+$/.test(value)) {
            alert(`Please enter a valid URL for ${input.labels[0].textContent}`);
            return;
        }
        if (input.type === 'number') {
            const numValue = Number(value);
            if (isNaN(numValue) || numValue < 10 || numValue > 99) {
                alert(`${label} must be a number between 10 and 99`);
                return;
            }
        }

        if (input.type === 'url' && !/^https?:\/\/\S+\.\S+$/.test(value)) {
            alert(`Please enter a valid URL for ${label}`);
            return;
        }

        // Store validated data
        playerData[input.id] = value;
    }

    // Place player in the correct position div
    placePLayerInPosition(playerData);

    // Reset form
    form.reset();
});

function placePLayerInPosition(data) {
    // Get the target div based on position
    const positionDiv = document.getElementById(data.position.toUpperCase());
    
    if (!positionDiv) {
        alert('Invalid position selected');
        return;
    }

    // Create player card HTML
    const playerCard = `
        <div class="player-card bg-white shadow-md rounded-lg p-4 mb-4">
            <div class="flex items-center space-x-4">
                <img src="${data.Photo}" alt="${data.Name}" class="w-20 h-20 object-cover rounded-full">
                <div>
                    <h3 class="font-bold text-lg">${data.Name}</h3>
                    <p class="text-gray-600">${data.position}</p>
                </div>
            </div>
            <div class="mt-4 grid grid-cols-3 gap-2">
                <div class="text-center">
                    <span class="block font-semibold">Rating</span>
                    <span>${data.rating}</span>
                </div>
                <div class="text-center">
                    <span class="block font-semibold">Pace</span>
                    <span>${data.pace}</span>
                </div>
                <div class="text-center">
                    <span class="block font-semibold">Passing</span>
                    <span>${data.passing}</span>
                </div>
                <div class="text-center">
                    <span class="block font-semibold">Shooting</span>
                    <span>${data.shooting}</span>
                </div>
                <div class="text-center">
                    <span class="block font-semibold">Dribbling</span>
                    <span>${data.dribbling}</span>
                </div>
                <div class="text-center">
                    <span class="block font-semibold">Defending</span>
                    <span>${data.defending}</span>
                </div>
            </div>
            <div class="mt-4 flex justify-between">
                <a href="${data.Nationality}" target="_blank" class="text-blue-600 hover:underline">Nationality</a>
                <a href="${data.club}" target="_blank" class="text-blue-600 hover:underline">Club</a>
            </div>
        </div>
    `;

    // Append the player card to the position div
    positionDiv.innerHTML += playerCard;
}
    

    // If all validations pass
    console.log('Form is valid');
    // Add your form submission logic here

document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input');
    const addPlayerBtn = document.querySelector('.bg-red-950');
    const players = [];

    addPlayerBtn.onclick = () => {
        const player = {};

        inputs.forEach(input => {
            player[input.id] = input.value;
        });

        players.push(player);
        console.log(players);

        // Optional: Clear inputs after adding
        inputs.forEach(input => input.value = '');
    };
});
