// Initialize audit progress
let auditDaysRemaining = 5; // Days until the next audit
const totalAuditTimeInSeconds = 5 * 24 * 60 * 60; // Total time for 5 days in seconds
const updateInterval = (totalAuditTimeInSeconds * 1000) / 100; // Update the progress 100 times over the total time
let auditInterval = setInterval(updateAuditProgress, updateInterval); // Update based on new interval

function updateAuditProgress() {
    const progressBar = document.querySelector('.progress');
    const auditDaysDisplay = document.querySelector('.audit-days');

    if (auditDaysRemaining > 0) {
        // Calculate decrement for each interval
        const decrement = 5 / 100; // Fill 5 days over 100 updates
        auditDaysRemaining -= decrement; // Simulate countdown
        const progressPercentage = ((5 - auditDaysRemaining) / 5) * 100;
        progressBar.style.width = progressPercentage + '%';
        auditDaysDisplay.textContent = Math.ceil(auditDaysRemaining); // Update displayed days
    } else {
        clearInterval(auditInterval);
        alert("It's time for your safety audit!");
    }
}

// Function to view handling procedures
document.querySelector('.procedure-button').addEventListener('click', function() {
    alert("Special Handling Procedures:\n1. Wear appropriate PPE.\n2. Use designated containers.\n3. Follow labeling guidelines.\n4. Report spills immediately.");
});

// Inventory management functionality
const inventoryTable = document.querySelector('.inventory-table');
const inventoryForm = document.getElementById('inventory-form');
const searchInput = document.getElementById('search');
const filterHazardousButton = document.getElementById('filter-hazardous');
const filterNonHazardousButton = document.getElementById('filter-non-hazardous');
const showAllButton = document.getElementById('show-all');

inventoryForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const itemName = document.getElementById('itemName').value;
    const itemQuantity = document.getElementById('itemQuantity').value;
    const itemStatus = document.getElementById('itemStatus').value;

    // Add new row to inventory table
    const newRow = inventoryTable.insertRow();
    newRow.innerHTML = `
        <td>${itemName}</td>
        <td>${itemQuantity}</td>
        <td>${itemStatus}</td>
        <td>
            <button class="hazardous-button">Mark as Hazardous</button>
            <button class="non-hazardous-button">Mark as Non-Hazardous</button>
            <button class="delete-button">Delete</button>
        </td>
    `;

    // Add event listeners for the new buttons
    newRow.querySelector('.hazardous-button').addEventListener('click', function() {
        if (confirm(`Are you sure you want to mark "${itemName}" as Hazardous?`)) {
            newRow.classList.add('hazardous');
            newRow.classList.remove('non-hazardous');
            alert(`${itemName} has been marked as Hazardous.`);
        }
    });

    newRow.querySelector('.non-hazardous-button').addEventListener('click', function() {
        if (confirm(`Are you sure you want to mark "${itemName}" as Non-Hazardous?`)) {
            newRow.classList.add('non-hazardous');
            newRow.classList.remove('hazardous');
            alert(`${itemName} has been marked as Non-Hazardous.`);
        }
    });

    // Add event listener for delete button
    newRow.querySelector('.delete-button').addEventListener('click', function() {
        if (confirm(`Are you sure you want to delete "${itemName}"?`)) {
            inventoryTable.deleteRow(newRow.rowIndex);
            alert(`${itemName} has been deleted.`);
        }
    });

    // Clear the input fields
    inventoryForm.reset();
});

// Search functionality
searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();
    Array.from(inventoryTable.rows).forEach((row, index) => {
        if (index === 0) return; // Skip header row
        const itemName = row.cells[0].textContent.toLowerCase();
        row.style.display = itemName.includes(searchTerm) ? '' : 'none';
    });
});

// Filter hazardous items
filterHazardousButton.addEventListener('click', function() {
    Array.from(inventoryTable.rows).forEach((row, index) => {
        if (index === 0) return; // Skip header row
        row.style.display = row.classList.contains('hazardous') ? '' : 'none';
    });
});

// Filter non-hazardous items
filterNonHazardousButton.addEventListener('click', function() {
    Array.from(inventoryTable.rows).forEach((row, index) => {
        if (index === 0) return; // Skip header row
        row.style.display = row.classList.contains('non-hazardous') ? '' : 'none';
    });
});

// Show all items
showAllButton.addEventListener('click', function() {
    Array.from(inventoryTable.rows).forEach((row, index) => {
        row.style.display = ''; // Show all rows
    });
});

// Emergency response functionality
document.querySelector('.emergency-button').addEventListener('click', function() {
    const protocol = "Emergency Protocol:\n1. Evacuate the area immediately.\n2. Notify emergency services.\n3. Follow safety procedures for hazardous material handling.";
    alert(protocol);
});
