// JS for Thank You Page Visits stat cards on dashboard
function getTodayStr() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('thankyou-birth-all').textContent = localStorage.getItem('thankyou_birth_count') || '0';
  document.getElementById('thankyou-marriage-all').textContent = localStorage.getItem('thankyou_marriage_count') || '0';
  document.getElementById('thankyou-death-all').textContent = localStorage.getItem('thankyou_death_count') || '0';

  document.getElementById('thankyou-birth-today').textContent = localStorage.getItem('thankyou_birth_today_' + getTodayStr()) || '0';
  document.getElementById('thankyou-marriage-today').textContent = localStorage.getItem('thankyou_marriage_today_' + getTodayStr()) || '0';
  document.getElementById('thankyou-death-today').textContent = localStorage.getItem('thankyou_death_today_' + getTodayStr()) || '0';
});



// Custom JS for Get Alerted, Feedback, and Download sections

// --- Get Alerted Section ---
function showAlertedPopup(contact) {
    // Create popup overlay
    const overlay = document.createElement('div');
    overlay.className = 'get-alerted-overlay';

    // Popup box
    const popup = document.createElement('div');
    popup.className = 'get-alerted-popup';
    popup.innerHTML = `
        <div style="font-size:2.5em; margin-bottom:0.5em;">
            <!-- Notification Bell SVG -->
            <svg xmlns='http://www.w3.org/2000/svg' height='64' viewBox='0 -960 960 960' width='64' fill='currentColor'><path d='M480-120q-33 0-56.5-23.5T400-200h160q0 33-23.5 56.5T480-120Zm280-160v-40H200v40h560ZM480-800q-83 0-141.5 58.5T280-600v120q0 33-23.5 56.5T200-400v40h560v-40q-33 0-56.5-23.5T680-480v-120q0-83-58.5-141.5T480-800Zm0 80q50 0 85 35t35 85v120q0 33 23.5 56.5T680-480v40H280v-40q33 0 56.5-23.5T360-600v-120q0-50 35-85t85-35Z'/></svg>
        </div>
        <div style="font-size:1.2em; margin-bottom:1em;">
            All requests and notifications connected to <b>${contact}</b> will be sent here.
        </div>
        <button class="btn-blue" id="alertedGoBtn">Go</button>
    `;
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    document.getElementById('alertedGoBtn').onclick = function() {
        window.location.href = 'thank you(alert).html';
    };
}

// --- Feedback Section ---
// Star rating logic
function setupStarRating() {
    const stars = document.querySelectorAll('.star');
    let rating = 0;
    stars.forEach((star, idx) => {
        star.onclick = () => {
            rating = idx + 1;
            stars.forEach((s, i) => {
                s.classList.toggle('selected', i < rating);
            });
        };
    });
}
// Feedback form submission
function setupFeedbackForm() {
    const form = document.getElementById('feedbackForm');
    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            window.location.href = 'thankyou(feedback).html';
        };
    }
}

// --- Download Section ---
function setupDownloadForm() {
    const validRefs = {
        'BC2024001234': 'Birth Certificate',
        'MC2024005678': 'Marriage Certificate',
        'DC2024009012': 'Death Certificate',
        'CR2024001234': 'Correction Certificate'
    };
    const form = document.getElementById('downloadForm');
    if (!form) return;
    form.onsubmit = function(e) {
        e.preventDefault();
        const ref = document.getElementById('refNumber').value.trim().toUpperCase();
        const errorDiv = document.getElementById('downloadError');
        const resultDiv = document.getElementById('downloadResult');
        errorDiv.style.display = 'none';
        resultDiv.style.display = 'none';
        errorDiv.classList.remove('show');
        if (validRefs[ref]) {
            resultDiv.innerHTML = `<div class='download-result-card'><div style='font-size:2em; margin-bottom:0.5em;'>✔️</div><div style='font-size:1.2em; margin-bottom:1em;'>${validRefs[ref]}</div><button class='btn-blue' onclick='alert("This is a mock download. No real file will be downloaded.")'>Download</button></div>`;
            resultDiv.style.display = 'block';
        } else {
            errorDiv.textContent = 'Invalid reference number. Please enter a valid one.';
            errorDiv.style.display = 'block';
            errorDiv.classList.add('show');
            errorDiv.classList.add('shake');
            setTimeout(()=>errorDiv.classList.remove('shake'), 500);
        }
    };
} 

// === Civil Registry Dashboard Logic ===

// Example mock data for monthly stats
const dashboardData = {
    months: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    births:   [32, 28, 40, 35, 38, 42, 39, 41, 36, 30, 29, 33],
    deaths:   [12, 15, 10, 14, 13, 16, 12, 11, 13, 15, 14, 12],
    marriages:[8,  10, 12, 15, 14, 13, 12, 11, 10, 9,  8,  7]
  };
  
  // Render stat cards
  function renderStatCards() {
    const totalBirths = dashboardData.births.reduce((a, b) => a + b, 0);
    const totalDeaths = dashboardData.deaths.reduce((a, b) => a + b, 0);
    const totalMarriages = dashboardData.marriages.reduce((a, b) => a + b, 0);
  
    const birthsElem = document.getElementById('stat-births');
    const deathsElem = document.getElementById('stat-deaths');
    const marriagesElem = document.getElementById('stat-marriages');
    if (birthsElem) birthsElem.textContent = totalBirths;
    if (deathsElem) deathsElem.textContent = totalDeaths;
    if (marriagesElem) marriagesElem.textContent = totalMarriages;
  }
  
  // Render a simple bar chart (no external libraries)
  function renderDashboardChart() {
    const chart = document.getElementById('dashboardChart');
    if (!chart) return;
    chart.innerHTML = '';
    const max = Math.max(
      ...dashboardData.births,
      ...dashboardData.deaths,
      ...dashboardData.marriages
    );
  
    dashboardData.months.forEach((month, i) => {
      const barBirth = (dashboardData.births[i] / max) * 100;
      const barDeath = (dashboardData.deaths[i] / max) * 100;
      const barMarriage = (dashboardData.marriages[i] / max) * 100;
  
      const barRow = document.createElement('div');
      barRow.style.display = 'flex';
      barRow.style.alignItems = 'center';
      barRow.style.marginBottom = '0.5em';
  
      const label = document.createElement('div');
      label.textContent = month;
      label.style.width = '3em';
      label.style.color = 'var(--secondary-text-clr)';
      label.style.fontWeight = 'bold';
  
      const barContainer = document.createElement('div');
      barContainer.style.display = 'flex';
      barContainer.style.gap = '4px';
      barContainer.style.flex = '1';
  
      // Birth bar
      const birthBar = document.createElement('div');
      birthBar.style.height = '18px';
      birthBar.style.width = barBirth + '%';
      birthBar.style.background = '#5e63ff';
      birthBar.style.borderRadius = '4px';
  
      // Death bar
      const deathBar = document.createElement('div');
      deathBar.style.height = '18px';
      deathBar.style.width = barDeath + '%';
      deathBar.style.background = '#ff6b6b';
      deathBar.style.borderRadius = '4px';
  
      // Marriage bar
      const marriageBar = document.createElement('div');
      marriageBar.style.height = '18px';
      marriageBar.style.width = barMarriage + '%';
      marriageBar.style.background = '#43e6b0';
      marriageBar.style.borderRadius = '4px';
  
      barContainer.appendChild(birthBar);
      barContainer.appendChild(deathBar);
      barContainer.appendChild(marriageBar);
  
      barRow.appendChild(label);
      barRow.appendChild(barContainer);
  
      chart.appendChild(barRow);
    });
  }
  
  // === Initialization for All Sections ===
  function initAllFeatures() {
    // Get Alerted Section
    const alertedBtn = document.getElementById('getAlertedBtn');
    if (alertedBtn) {
        alertedBtn.onclick = function() {
            const contact = document.getElementById('alertedContact')?.value || 'your contact';
            showAlertedPopup(contact);
        };
    }

    // Feedback Section
    if (document.querySelector('.star')) setupStarRating();
    if (document.getElementById('feedbackForm')) setupFeedbackForm();

    // Download Section
    if (document.getElementById('downloadForm')) setupDownloadForm();

    // Dashboard Section
    if (document.getElementById('stat-births') || document.getElementById('dashboardChart')) {
        renderStatCards();
        renderDashboardChart();
    }
  }

  document.addEventListener('DOMContentLoaded', initAllFeatures);

document.addEventListener('DOMContentLoaded', function() {
    const chatContainer = document.getElementById('chat-container');
    if (!chatContainer) {
        return; // Don't do anything if there's no chat container on the page
    }

    const officeHoursStatus = document.getElementById('office-hours-status');
    const chatWindow = document.getElementById('chat-window');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');

    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleSendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatInput.value = '';

            setTimeout(() => {
                const reply = "Thank you for your message. We are connecting you to an available support agent. Please wait a moment.";
                addMessage(reply, 'bot');
            }, 1000);
        }
    }

    // Logic for livechat.html (with office hours)
    if (window.location.pathname.includes('livechat.html')) {
        function checkOfficeHours() {
            const now = new Date();
            const day = now.getDay(); // 0 = Sunday, 6 = Saturday
            const hour = now.getHours(); // 0-23
            const isOfficeHours = day >= 1 && day <= 5 && hour >= 9 && hour < 17;

            if (isOfficeHours) {
                officeHoursStatus.textContent = "Live chat is online. We are ready to help!";
                officeHoursStatus.classList.add('open');
                officeHoursStatus.classList.remove('closed');
                chatWindow.style.display = 'flex';
            } else {
                officeHoursStatus.textContent = "Live chat is currently offline. Office hours are Mon-Fri, 9am - 5pm.";
                officeHoursStatus.classList.add('closed');
                officeHoursStatus.classList.remove('open');
                chatWindow.style.display = 'none';
            }
        }
        
        checkOfficeHours();
        setInterval(checkOfficeHours, 60000);
    }

    // Logic for live2.html (24/7)
    if (window.location.pathname.includes('live2.html')) {
        if (officeHoursStatus && chatWindow) {
            officeHoursStatus.textContent = "Live chat is online 24/7. We are ready to help!";
            officeHoursStatus.classList.add('open');
            officeHoursStatus.classList.remove('closed');
            chatWindow.style.display = 'flex';
        }
    }

    // Shared message sending logic
    if (sendBtn) {
        sendBtn.addEventListener('click', handleSendMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        });
    }
});

// JS for Thank You Page Visits stat cards on dashboard
function getTodayStr() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('thankyou-birth-all').textContent = localStorage.getItem('thankyou_birth_count') || '0';
  document.getElementById('thankyou-marriage-all').textContent = localStorage.getItem('thankyou_marriage_count') || '0';
  document.getElementById('thankyou-death-all').textContent = localStorage.getItem('thankyou_death_count') || '0';

  document.getElementById('thankyou-birth-today').textContent = localStorage.getItem('thankyou_birth_today_' + getTodayStr()) || '0';
  document.getElementById('thankyou-marriage-today').textContent = localStorage.getItem('thankyou_marriage_today_' + getTodayStr()) || '0';
  document.getElementById('thankyou-death-today').textContent = localStorage.getItem('thankyou_death_today_' + getTodayStr()) || '0';
});
