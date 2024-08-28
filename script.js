// SIDEBAR DROPDOWN
const allDropdown = document.querySelectorAll('#sidebar .side-menu .side-dropdown'); // Adjusted selector to target dropdowns properly
const sidebar = document.getElementById('sidebar');

allDropdown.forEach(item => {
    const a = item.parentElement.querySelector('a:first-child');
    a.addEventListener('click', function (e) {
        e.preventDefault();

        if (!this.classList.contains('active')) {
            allDropdown.forEach(i => {
                const aLink = i.parentElement.querySelector('a:first-child');
                aLink.classList.remove('active');
                i.classList.remove('show');
            });
        }

        this.classList.toggle('active');
        item.classList.toggle('show');
    });
});

// SIDEBAR COLLAPSE (removed, as sidebar is now fixed and always visible)

// PROFILE DROPDOWN
const profile = document.querySelector('header .nav-link');
const dropdownProfile = document.querySelector('.profile-link');

if (profile) { // Added check to ensure profile element exists
    profile.addEventListener('click', function () {
        dropdownProfile.classList.toggle('show');
    });
}

// MENU (if applicable for other sections, adapt to your layout)
const allMenu = document.querySelectorAll('main .content-data .head .menu');

allMenu.forEach(item => {
    const icon = item.querySelector('.icon');
    const menuLink = item.querySelector('.menu-link');

    if (icon) { // Added check to ensure icon element exists
        icon.addEventListener('click', function () {
            menuLink.classList.toggle('show');
        });
    }
});

window.addEventListener('click', function (e) {
    if (e.target !== profile && e.target !== dropdownProfile) {
        if (dropdownProfile && dropdownProfile.classList.contains('show')) { // Added check to ensure dropdownProfile exists
            dropdownProfile.classList.remove('show');
        }
    }

    allMenu.forEach(item => {
        const icon = item.querySelector('.icon');
        const menuLink = item.querySelector('.menu-link');

        if (e.target !== icon && e.target !== menuLink) {
            if (menuLink && menuLink.classList.contains('show')) { // Added check to ensure menuLink exists
                menuLink.classList.remove('show');
            }
        }
    });
});

// PROGRESSBAR
const allProgress = document.querySelectorAll('main .card .progress');

allProgress.forEach(item => {
    if (item.dataset.value) { // Added check to ensure data-value exists
        item.style.setProperty('--value', item.dataset.value);
    }
});

// APEXCHART
var options = {
    series: [{
        name: 'Available Rooms',
        data: [10, 20, 15, 30, 25, 50, 40]
    }, {
        name: 'Reserved Rooms',
        data: [5, 10, 8, 20, 15, 30, 25]
    }],
    chart: {
        height: 350,
        type: 'area'
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },
    xaxis: {
        type: 'datetime',
        categories: ["2024-08-01T00:00:00.000Z", "2024-08-02T00:00:00.000Z", "2024-08-03T00:00:00.000Z", "2024-08-04T00:00:00.000Z", "2024-08-05T00:00:00.000Z", "2024-08-06T00:00:00.000Z", "2024-08-07T00:00:00.000Z"]
    },
    tooltip: {
        x: {
            format: 'dd/MM/yy'
        }
    },
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
if (chart) { // Added check to ensure chart element exists
    chart.render();
}

// Handle "Reserve" button click to redirect to reservation form
const reserveButtons = document.querySelectorAll('.btn-reserve');

reserveButtons.forEach(button => {
    button.addEventListener('click', function () {
        const roomId = this.getAttribute('data-room-id'); // Use getAttribute to get data-room-id
        if (roomId) { // Check if roomId exists
            window.location.href = 'reservation-form.html?roomId=' + roomId;
        }
    });
});

// Handle login icon click
const loginIcon = document.getElementById('login-icon');
if (loginIcon) { // Added check to ensure loginIcon element exists
    loginIcon.addEventListener('click', function() {
        window.location.href = 'login-signup.html';
    });
}
