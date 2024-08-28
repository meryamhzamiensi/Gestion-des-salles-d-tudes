// script.js

document.addEventListener('DOMContentLoaded', () => {
    const requests = [
        { id: 1, room: 'Room 101', requester: 'John Doe', date: '2024-08-25', status: 'Pending' },
        { id: 2, room: 'Room 102', requester: 'Jane Smith', date: '2024-08-26', status: 'Pending' },
    ];

    const tableBody = document.querySelector('#requests-table tbody');

    requests.forEach(request => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${request.id}</td>
            <td>${request.room}</td>
            <td>${request.requester}</td>
            <td>${request.date}</td>
            <td>${request.status}</td>
            <td>
                <button class="approve" onclick="handleApprove(${request.id})">Approve</button>
                <button class="decline" onclick="handleDecline(${request.id})">Decline</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
});

function handleApprove(id) {
    alert(`Approved request with ID: ${id}`);
}

function handleDecline(id) {
    alert(`Declined request with ID: ${id}`);
}
