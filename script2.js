// Selecting the elements from HTML
const container = document.getElementById('cardsContainer');
const loading = document.getElementById('loading');
const errorMsg = document.getElementById('error');

// This function gets the data from my website
async function getMyData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const allData = await response.json();

        //to get first 20 items
        const limitedList = allData.slice(0, 20);

        // Hide the loading message 
        loading.style.display = 'none';

        // Loop through each item and make card
        limitedList.forEach(item => {
            makeCard(item);
        });

    } catch (err) {
        // If something breaks, show error message 
        loading.style.display = 'none';
        errorMsg.innerHTML = "Could not load the tasks.";
        console.log("Error logic:", err);
    }
}

// Function to build the card HTML
function makeCard(task) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    let statusClass = task.completed ? 'status-completed' : 'status-pending';
    let statusText = task.completed ? 'COMPLETED' : 'PENDING';

    cardDiv.innerHTML = `
        <div class="card-header">
            <span class="id-badge">ID: ${task.id}</span>
            <span class="status-badge ${statusClass}">${statusText}</span>
        </div>
        <h3>${task.title}</h3>
        <span class="user-id">User #${task.userId}</span>
    `;

    container.appendChild(cardDiv);
}

// Run the function
getMyData();
