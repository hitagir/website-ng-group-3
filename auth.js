document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // On dashboard pages, check if user is logged in
    if (window.location.pathname.includes('-dashboard.html')) {
        checkLogin();
        const logoutButton = document.getElementById('logout-button');
        if (logoutButton) {
            logoutButton.addEventListener('click', handleLogout);
        }
    }
});

const users = [
    { username: 'superadmin', password: 'password', role: 'Super Admin', dashboard: 'superadmin-dashboard.html' },
    { username: 'intakeclerk', password: 'password', role: 'Application Intake Clerk', dashboard: 'intakeclerk-dashboard.html' },
    { username: 'verifyingofficer', password: 'password', role: 'Verifying Officer', dashboard: 'verifyingofficer-dashboard.html' },
    { username: 'processingclerk', password: 'password', role: 'Processing and Recording Clerk', dashboard: 'processingclerk-dashboard.html' },
    { username: 'cashier', password: 'password', role: 'Cashier', dashboard: 'cashier-dashboard.html' },
    { username: 'printingofficer', password: 'password', role: 'Document Printing and Signing Officer', dashboard: 'printingofficer-dashboard.html' },
    { username: 'releasingclerk', password: 'password', role: 'Releasing Clerk', dashboard: 'releasingclerk-dashboard.html' },
    { username: 'reportsofficer', password: 'password', role: 'Reports and Statistics Officer', dashboard: 'reportsofficer-dashboard.html' },
    { username: 'feedbackofficer', password: 'password', role: 'Feedback and Complaints Officer', dashboard: 'feedbackofficer-dashboard.html' },
    { username: 'systemadmin', password: 'password', role: 'System Administrator', dashboard: 'systemadmin-dashboard.html' }
];

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = user.dashboard;
    } else {
        errorMessage.textContent = 'Invalid username or password.';
        errorMessage.style.display = 'block';
    }
}

function handleLogout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'employee-login.html';
}

function checkLogin() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) {
        window.location.href = 'employee-login.html';
    } else {
        // Optional: display user's name/role on the dashboard
        const welcomeMessage = document.getElementById('welcome-message');
        if (welcomeMessage) {
            welcomeMessage.textContent = `Welcome, ${user.role}`;
        }
    }
} 