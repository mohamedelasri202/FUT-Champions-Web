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
    }

    // If all validations pass
    console.log('Form is valid');
    // Add your form submission logic here
});
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