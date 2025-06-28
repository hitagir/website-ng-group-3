
//accessibility
function saveAccessibilityState() {
    localStorage.setItem('accessibility_lightTheme', isLightTheme);
    localStorage.setItem('accessibility_highContrast', highContrast);
    localStorage.setItem('accessibility_underlineLinks', underlineLinks);
    localStorage.setItem('accessibility_largeFonts', largeFonts);
}

function loadAccessibilityState() {
    // Load saved states
    isLightTheme = localStorage.getItem('accessibility_lightTheme') === 'true';
    highContrast = localStorage.getItem('accessibility_highContrast') === 'true';
    underlineLinks = localStorage.getItem('accessibility_underlineLinks') === 'true';
    largeFonts = localStorage.getItem('accessibility_largeFonts') === 'true';
    
    // Apply saved states
    if (isLightTheme) {
        document.body.classList.add('light-theme');
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) themeToggle.classList.add('active');
    }
    
    if (highContrast) {
        document.body.classList.add('high-contrast');
        // Reset theme if high contrast is on
        isLightTheme = false;
        document.body.classList.remove('light-theme');
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) themeToggle.classList.remove('active');
    }
    
    if (underlineLinks) {
        document.body.classList.add('underline-links');
    }
    
    if (largeFonts) {
        document.body.classList.remove('font-normal');
        document.body.classList.add('font-large');
    } else {
        document.body.classList.add('font-normal');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    loadAccessibilityState();
});

function updateAccessibilityToggles() {

    const themeToggle = document.getElementById('themeToggle');
    

    if (themeToggle) {
        if (isLightTheme && !highContrast) {
            themeToggle.classList.add('active');
        } else {
            themeToggle.classList.remove('active');
        }
    }
    
}


//sidebar
const toggleButton = document.getElementById('toggle-btn')
const sidebar = document.getElementById('sidebar')

function toggleSidebar() {
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')

    closeAllsubMenus()
}

function toggleSubMenu(button) {
    // Check if the submenu is already open
    const submenu = button.nextElementSibling
    const isShown = submenu.classList.contains('show')

    closeAllsubMenus()

    // Only toggle if it was not already open
    if (!isShown) {
        submenu.classList.add('show')
        button.classList.add('rotate')

        if (sidebar.classList.contains('close')) {
            sidebar.classList.remove('close')
            toggleButton.classList.remove('rotate')
        }
    }
}

function closeAllsubMenus() {
    Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
        ul.classList.remove('show')
        if (ul.previousElementSibling) {
            ul.previousElementSibling.classList.remove('rotate')
        }
    })
}


//accessibility
let accessibilityPanelOpen = false;
let isLightTheme = false;
let highContrast = false;
let underlineLinks = false;
let largeFonts = false;

function toggleAccessibilityPanel() {
    const panel = document.getElementById('accessibilityPanel');
    const trigger = document.querySelector('.accessibility-trigger');
    
    accessibilityPanelOpen = !accessibilityPanelOpen;
    
    if (accessibilityPanelOpen) {
        trigger.classList.add('hide');
        setTimeout(() => {
            panel.classList.add('show');
        }, 100);
    } else {
        panel.classList.remove('show');
        setTimeout(() => {
            trigger.classList.remove('hide');
        }, 300);
    }
}

function adjustFontSize() {
    largeFonts = !largeFonts;
    const body = document.body;
    
    if (largeFonts) {
        body.classList.remove('font-normal');
        body.classList.add('font-large');
    } else {
        body.classList.remove('font-large');
        body.classList.add('font-normal');
    }
    
    saveAccessibilityState(); // Add this line
}

function toggleHighContrast() {
    highContrast = !highContrast;
    if (highContrast) {
        document.body.classList.add('high-contrast');
        // Reset theme toggle when high contrast is enabled
        isLightTheme = false;
        document.body.classList.remove('light-theme');
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) themeToggle.classList.remove('active');
    } else {
        document.body.classList.remove('high-contrast');
    }
    
    saveAccessibilityState(); // Add this line
}

function toggleUnderlineLinks() {
    underlineLinks = !underlineLinks;
    if (underlineLinks) {
        document.body.classList.add('underline-links');
    } else {
        document.body.classList.remove('underline-links');
    }
    
    saveAccessibilityState(); // Add this line
}

function toggleTheme() {
    isLightTheme = !isLightTheme;
    const toggle = document.getElementById('themeToggle');
    
    if (isLightTheme) {
        document.body.classList.add('light-theme');
        if (toggle) toggle.classList.add('active');
    } else {
        document.body.classList.remove('light-theme');
        if (toggle) toggle.classList.remove('active');
    }
    
    saveAccessibilityState(); // Add this line
}

function resetAccessibility() {
    // Reset all settings
    isLightTheme = false;
    highContrast = false;
    underlineLinks = false;
    largeFonts = false;
    
    // Reset classes
    document.body.className = 'font-normal';
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) themeToggle.classList.remove('active');
    
    saveAccessibilityState(); // Add this line
}

function showAccessibilityStatement() {
    // Remove existing statement if any
    const existing = document.querySelector('.accessibility-statement');
    if (existing) {
        existing.remove();
        return;
    }

    const statement = document.createElement('div');
    statement.className = 'accessibility-statement';
    statement.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--container-bg);
        border: 1px solid var(--line-clr);
        border-radius: 1em;
        padding: 2rem;
        max-width: 500px;
        z-index: 1002;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        color: var(--text-clr);
    `;
    statement.innerHTML = `
        <h3>Accessibility Statement</h3>
        <p>This website is designed to be accessible to all users, including those with disabilities. We have implemented various features to enhance usability and comply with accessibility standards including:</p>
        <ul style="margin: 1rem 0; padding-left: 1.5rem; color: var(--secondary-text-clr);">
            <li>Adjustable font sizes</li>
            <li>High contrast mode</li>
            <li>Link underline options</li>
        </ul>
        <button class="close-btn btn-blue" onclick="this.parentElement.remove()" style="margin-top: 1rem;">Close</button>
    `;
    document.body.appendChild(statement);
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

// Close accessibility panel when clicking outside
document.addEventListener('click', function(event) {
    const panel = document.getElementById('accessibilityPanel');
    const trigger = document.querySelector('.accessibility-trigger');
    
    if (!panel.contains(event.target) && !trigger.contains(event.target) && accessibilityPanelOpen) {
        toggleAccessibilityPanel();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && accessibilityPanelOpen) {
        toggleAccessibilityPanel();
    }
});

document.getElementById('termsLink').addEventListener('click', function(e) {
    e.preventDefault();
    showTermsPopup();
});

function showTermsPopup() {
    const termsPopup = document.createElement('div');
    termsPopup.className = 'terms-popup';
    termsPopup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--container-bg);
        border: 1px solid var(--line-clr);
        border-radius: 1em;
        padding: 2rem;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        z-index: 1002;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        color: var(--text-clr);
    `;
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'terms-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(2px);
        z-index: 1001;
    `;
    

    //popup
    termsPopup.innerHTML = `
        <h3 style="margin-top: 0; color: var(--accent-clr);">Terms and Conditions</h3>
        
        <div style="color: var(--secondary-text-clr);">
            <h4 style="margin: 1.5rem 0 0.5rem; color: var(--text-clr);">1. Acceptance of Terms</h4>
            <p>By accessing and using this Civil Registry Information System, you accept and agree to be bound by these terms and conditions.</p>
            
            <h4 style="margin: 1.5rem 0 0.5rem; color: var(--text-clr);">2. Proper Use</h4>
            <p>You agree to use this system only for lawful purposes and in accordance with all applicable laws and regulations.</p>
            
            <h4 style="margin: 1.5rem 0 0.5rem; color: var(--text-clr);">3. Data Privacy</h4>
            <p>All personal information collected through this system will be handled in accordance with the Data Privacy Act of 2012.</p>
            
            <h4 style="margin: 1.5rem 0 0.5rem; color: var(--text-clr);">4. System Availability</h4>
            <p>We cannot guarantee uninterrupted access to the system and reserve the right to suspend access for maintenance or other reasons.</p>
            
            <h4 style="margin: 1.5rem 0 0.5rem; color: var(--text-clr);">5. Limitation of Liability</h4>
            <p>The Polytechnic University of the Philippines shall not be liable for any damages resulting from the use of this system.</p>
        </div>
        
        <button class="close-btn btn-blue" style="margin-top: 1.5rem;">I Accept</button>
    `;
    
    // Add click handler for the accept button
    const acceptBtn = termsPopup.querySelector('.close-btn');
    acceptBtn.addEventListener('click', function() {
        document.body.removeChild(overlay);
        document.body.removeChild(termsPopup);
    });
    
    // Add click handler for overlay
    overlay.addEventListener('click', function() {
        document.body.removeChild(overlay);
        document.body.removeChild(termsPopup);
    });
    
    document.body.appendChild(overlay);
    document.body.appendChild(termsPopup);
}


// Function to handle menu item clicks
function handleMenuItemClick() {
    // Remove active class from all menu items
    document.querySelectorAll('#sidebar ul li').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to the clicked menu item
    this.parentElement.classList.add('active');
}

// Add click event listeners to all menu items that aren't working
document.querySelectorAll('#sidebar a:not([href="home.html"]):not([href="notice.html"])').forEach(menuItem => {
    menuItem.addEventListener('click', handleMenuItemClick);
});

// For dropdown items (Check Status, Check E-Receipt, Correction)
document.querySelectorAll('#sidebar .sub-menu a').forEach(dropdownItem => {
    dropdownItem.addEventListener('click', function() {
        // Remove active class from all menu items
        document.querySelectorAll('#sidebar ul li').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to parent dropdown button's li
        this.closest('li').classList.add('active');
    });
});


//check status
document.addEventListener('DOMContentLoaded', function() {
    const checkStatusBtn = document.getElementById('checkStatusBtn');
    const certificateRefInput = document.getElementById('certificateRef');
    const statusResults = document.getElementById('statusResults');
    const statusModal = document.getElementById('statusModal');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const confirmBtn = document.getElementById('confirmBtn');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');


    const certificateData = {
        'BC2024001234': {
            type: 'Birth Certificate',
            status: 'Pending Review',
            submitted: '2 days ago',
            note: 'Your application is under initial review. Please allow 3-5 business days for processing.',
            statusClass: 'pending'
        },
        'MC2024005678': {
            type: 'Marriage Certificate',
            status: 'Processing',
            submitted: '1 day ago',
            expected: '3 days',
            note: 'Your documents are being verified. Expected completion in 3 business days.',
            statusClass: 'processing'
        },
        'DC2024009012': {
            type: 'Death Certificate',
            status: 'Ready for Pickup',
            submitted: '5 days ago',
            note: 'Your certificate is ready for collection at the main office during business hours.',
            location: 'Main Office, Room 205',
            statusClass: 'ready'
        }
    };

    // Check status button click handler
    checkStatusBtn.addEventListener('click', function() {
        const refNumber = certificateRefInput.value.trim();
        
        if (!refNumber) {
            showModal('Error', 'Please enter a reference number');
            return;
        }
        
        // Since there's no PHP yet, we'll use the sample data
        setTimeout(() => {
            checkCertificateStatus(refNumber);
        }, 500);
    });

    // Check certificate status
    function checkCertificateStatus(refNumber) {
        if (certificateData[refNumber]) {
            displayStatusResult(certificateData[refNumber]);
        } else {
            showModal('Not Found', `No certificate found with reference number: ${refNumber}`);
        }
    }

    // Display status result
    function displayStatusResult(certificate) {
        let statusHtml = `
            <div class="status-card ${certificate.statusClass}">
                <div class="status-header">
                    <div class="status-icon">
                        ${certificate.statusClass === 'pending' ? '<i class="fas fa-hourglass-half"></i>' : ''}
                        ${certificate.statusClass === 'processing' ? '<i class="fas fa-cog fa-spin"></i>' : ''}
                        ${certificate.statusClass === 'ready' ? '<i class="fas fa-check"></i>' : ''}
                    </div>
                    <div class="status-title">${certificate.status}</div>
                </div>
                <div class="status-details">
                    <div class="status-meta">
                        <i class="far fa-file-alt"></i>
                        <span>${certificate.type}</span>
                    </div>
                    <div class="status-meta">
                        <i class="far fa-clock"></i>
                        <span>Submitted ${certificate.submitted}</span>
                    </div>
        `;

        if (certificate.expected) {
            statusHtml += `
                <div class="status-meta">
                    <i class="far fa-calendar-check"></i>
                    <span>Expected completion: ${certificate.expected}</span>
                </div>
            `;
        }

        if (certificate.location) {
            statusHtml += `
                <div class="status-meta">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${certificate.location}</span>
                </div>
            `;
        }

        statusHtml += `
                    <div class="status-note">${certificate.note}</div>
                </div>
            </div>
        `;

        statusResults.innerHTML = statusHtml;
    }

    // Show modal
    function showModal(title, message) {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        statusModal.style.display = 'flex';
    }

    // Close modal
    function closeModalHandler() {
        statusModal.style.display = 'none';
    }

    // Event listeners for modal
    closeModal.addEventListener('click', closeModalHandler);
    cancelBtn.addEventListener('click', closeModalHandler);
    confirmBtn.addEventListener('click', closeModalHandler);
    statusModal.addEventListener('click', function(e) {
        if (e.target === statusModal) {
            closeModalHandler();
        }
    });

    // Add Font Awesome if not already loaded
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(faLink);
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && typeof accessibilityPanelOpen !== 'undefined' && accessibilityPanelOpen) {
        toggleAccessibilityPanel();
    }
});

document.getElementById('faqLink').addEventListener('click', function(e) {
    e.preventDefault();
    showFAQPopup();
});

function showFAQPopup() {
    const faqPopup = document.createElement('div');
    faqPopup.className = 'faq-popup';
    faqPopup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--container-bg);
        border: 1px solid var(--line-clr);
        border-radius: 1em;
        padding: 2rem;
        max-width: 700px;
        max-height: 80vh;
        overflow-y: auto;
        z-index: 1002;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        color: var(--text-clr);
    `;

    const overlay = document.createElement('div');
    overlay.className = 'faq-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(2px);
        z-index: 1001;
    `;

    faqPopup.innerHTML = `
        <h3 style="margin-top: 0; color: var(--accent-clr);">Frequently Asked Questions</h3>
        <div style="color: var(--secondary-text-clr);">
            <h4 style="margin: 1.5rem 0 0.5rem; color: var(--text-clr);">1. What is the Civil Registry Information System?</h4>
            <p>The Civil Registry Information System is a digital platform designed to manage and store civil registry documents such as birth certificates, marriage certificates, and death certificates for efficient record-keeping and retrieval.</p>

            <h4 style="margin: 1.5rem 0 0.5rem; color: var(--text-clr);">2. What documents can I request through this system?</h4>
            <p>You can request certified copies of birth certificates, marriage certificates, death certificates through this system.</p>

            <h4 style="margin: 1.5rem 0 0.5rem; color: var(--text-clr);">3. What are the requirements for requesting documents?</h4>
            <p>You need to provide valid identification, complete the request form with accurate information, and pay the required fees. Additional requirements may apply depending on the type of document requested.</p>

            <h4 style="margin: 1.5rem 0 0.5rem; color: var(--text-clr);">4. How long does it take to process document requests?</h4>
            <p>Processing time varies depending on the type of document and verification requirements. Typically, it takes 3-5 business days for standard requests and up to 10 business days for documents requiring additional verification.</p>

            <h4 style="margin: 1.5rem 0 0.5rem; color: var(--text-clr);">5. Can I track the status of my request?</h4>
            <p>Yes, you can track your request status using the tracking number provided when you submit your application. The system will show real-time updates on your document processing status.</p>

            <h4 style="margin: 1.5rem 0 0.5rem; color: var(--text-clr);">6. What payment methods are accepted?</h4>
            <p>The system accepts various payment methods including online banking, credit/debit cards, GCash, PayMaya, and over-the-counter payments at authorized payment centers.</p>

            <h4 style="margin: 1.5rem 0 0.5rem; color: var(--text-clr);">7. Is my personal information secure?</h4>
            <p>Yes, all personal information is protected under the Data Privacy Act of 2012. The system uses encryption and secure protocols to protect your data from unauthorized access.</p>

            <h4 style="margin: 1.5rem 0 0.5rem; color: var(--text-clr);">8. Can I request documents for someone else?</h4>
            <p>You can request documents for immediate family members (spouse, children, parents) with proper authorization and valid identification. For other relatives, additional documentation proving relationship may be required.</p>

            <h4 style="margin: 1.5rem 0 0.5rem; color: var(--text-clr);">9. What if there's an error in my document?</h4>
            <p>If you find errors in your civil registry document, you can file a petition for correction through the system. Supporting documents and affidavits may be required depending on the type of correction needed.</p>

            <h4 style="margin: 1.5rem 0 0.5rem; color: var(--text-clr);">10. Who can I contact for technical support?</h4>
            <p>For technical issues, you can contact our support team through the help desk feature in the system or email support@civilregistry.pup.edu.ph during business hours (8:00 AM - 5:00 PM, Monday to Friday).</p>
        </div>
        <button class="close-btn btn-blue" style="margin-top: 1.5rem;">Close</button>
    `;

    const closeBtn = faqPopup.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(overlay);
        document.body.removeChild(faqPopup);
    });

    overlay.addEventListener('click', () => {
        document.body.removeChild(overlay);
        document.body.removeChild(faqPopup);
    });

    document.body.appendChild(overlay);
    document.body.appendChild(faqPopup);
}
//end of pop-up faq

//birth
 //birth
//CITY. REGION, PROVINCE DROPDOWM
const dropdownoptn = {
      "NCR": {
        provinces: ["Metro Manila"],
        cities: {
            "Metro Manila":["Binondo", "Caloocan", "Ermita", "Intramuros", "Las Piñas", "Makati", "Malabon",
             "Malate", "Mandaluyong", "Marikina", "Muntinlupa", "Navotas", "Paco", "Pandacan",
              "Parañaque", "Pasay City", "Pasig", "Pateros", "Port Area", "Quezon City", "Quiapo",
               "San Juan", "San Miguel", "San Nicolas", "Sampaloc", "Santa Ana", "Santa Cruz", "Taguig",
               "Tondo", "Valenzuela"]
            }
        },

      "CAR": {
        provinces: ["Abra", "Apayao", "Benguet", "Ifugao", "Kalinga", "Mountain Province"],
        cities: {
            "Abra":["Bangued","Bucay","Dolores","Lagangilang","Peñarrubia","Pilar","San Juan","Tayum","Villaviciosa"],
            "Apayao":["Calanasan","Conner","Flora","Kabugao","Luna","Pudtol","Santa Marcela"],
            "Benguet":["City of Baguio", "La Trinidad","Itogon","Tublay","Sablan","Kapangan","Kibungan","Bokod","Buguias","Manyakan","Atok"],
            "Ifugao":["Aguinaldo","Alfonso Lista","Asipulo","Banaue","Hingyon","Hungduan","Klangan","Lagawe","Lamut","Bokod","Lamut","Mayoyao","Tinoc"],
            "Kalinga":["City of Tabuk","Balbalan","Lubuagan","Pasil","Pinukpuk","Rizal","Tanudan","Tinglayan"],
            "Mountain Province":["Barlig","Bauko","Besao","Bontoc","Natonin","Paracells","Sabangan","Sadanga","Sadaga","Tadian"]            
        }
    },
      "Region I": {
        provinces: ["Ilocos Norte", "Ilocos Sur", "La Union", "Pangasinan"],
        cities: {
            "Ilocos Norte":["Laoag","Batac","Adams","Bacarra","Bangil","Banna","Burgos","Carasi","Currimao","Dingras","Dumalneg","Marcos","Nueva Era","Padudpud","Paoay","Pasuquin","Piddig","Pinili","San Nicolas","Sarrat","Solsona","Vintar"],
            "Ilocos Sur":["Vigan","Candon","Alilem","Banayoyo","Burgos","Cabugao","Caoyan","Carvantes","Galimuyod","Gregorio del Pilar","Lidlidda","Magsingal","Nagbukel","Narvacan","Quirino","Salcedo","San Emilio"," San Esteban","San Ildefonso","San Juan","San Vicente","Santa","Santa Catalina","Santa Cruz","Santa Lucia","Santa Maria","Santiago","Santo Domingo","Sigay","Sinait","Sugpon","Suyo","Tagudin"],
            "La Union":["San Fernando","Agoo","Aringay","Bacnotan","Bagulin","Balaoan","Bangar","Bauang","Burgos","Caba","Luna","Naguilian","Pugo","Rosario","San Gabriel","San Juan","Santo Tomas","Santol","Sudipen","Tubao"],
            "Pangasinan":["Alaminos", "Dagupan","San Carlos","Urdaneta","Agno","Aguilar","Alcala","Anda","Asingan","Balungao","Basista","Bautista","Bayambang","Binalonan","Binmaley","Bolinao","Bugallon","Burgos","Calasiao","Dasol","Infanta","Mapandan","Natividad","Pozorrubio","Rosales","San Fabian","San Jacinto","San Manuel","San Nicolas","San Quintin","Santa Barbara","Santo Tomas","Sison","Sual","Tayug","Umingan","Urbiztondo",'Villasis']
        }
      }, 

    "Region II": {
        provinces: ["Batanes", "Cagayan", "Isabela", "Nueva Vizcaya", "Quirino"],
        cities: {
            "Batanes":["Basco","Itbayat","Ivana","Mahatao","Sabtang","Uyugan"],
            "Cagayan":["Tuguegarao City","Abulug","Allacapan","Amulung","Aparri","Baggao","Ballesteros","Buguey","Calayan","Camalaniugan",'Claveria',"Enrile","Gattaran","Gonzaga","Iguig","Lal-lo","Lasam","Pampalona","Peñablanca","Piat","Rizal","Santa Ana","Santa Praxedes","Sanra Teresite"," Santo Niño","Solana","Tau"],
            "Isabela":["City of Ilagan","City of Cauayan","City of Santiago","Tumauini"],
            "Nueva Vizcaya": ["Bayombong", "Solano", "Alfonso Castaneda", "Ambaguio"],
            "Quirino": ["Cabarroguis", "Diffun", "Maddela", "Nagtipunan"]
            
        }
    },

    "Region III": {
        provinces: ["Aurora", "Bataan", "Bulacan", "Nueva Ecija", "Pampanga", "Tarlac", "Zambales"],
        cities: {
            "Aurora": ["Baler", "Casiguran", "Dilasag", "Dinalungan", "Dingalan", "Dipaculao", "Maria Aurora", "San Luis"],
            "Bataan": ["Abucay", "Bagac", "Balanga City", "Dinalupihan", "Hermosa", "Limay", "Mariveles", "Morong", "Orani", "Orion", "Pilar", "Samal"],
            "Bulacan": ["Angat", "Balagtas", "Baliuag", "Bocaue", "Bulakan", "Bustos", "Calumpit", "Guiguinto", "Hagonoy", "Malolos City", "Marilao", "Meycauayan City", "Norzagaray", "Obando", "Pandi", "Paombong", "Plaridel", "Pulilan", "San Ildefonso", "San Jose del Monte City", "San Miguel", "San Rafael", "Santa Maria"],
            "Nueva Ecija": ["Aliaga", "Bongabon", "Cabanatuan City", "Cabiao", "Carranglan", "Gabaldon", "Gapan City", "General Mamerto Natividad", "General Tinio", "Guimba", "Jaen", "Laur", "Licab", "Llanera", "Lupao", "Nampicuan", "Palayan City", "Pantabangan", "Peñaranda", "Quezon", "Rizal", "San Antonio", "San Isidro", "San Jose City", "San Leonardo", "Santa Rosa", "Santo Domingo", "Talavera", "Talugtug", "Zaragoza"],
            "Pampanga": ["Angeles City", "Apalit", "Arayat", "Bacolor", "Candaba", "Floridablanca", "Guagua", "Lubao", "Mabalacat City", "Macabebe", "Magalang", "Masantol", "Mexico", "Minalin", "Porac", "San Fernando City", "San Luis", "San Simon", "Santa Ana", "Santa Rita", "Santo Tomas", "Sasmuan"],
        }
    },

  "Region IV-A": {
        provinces: ["Batangas", "Cavite", "Laguna", "Quezon", "Rizal"],
        cities: {
            "Batangas": ["Agoncillo", "Balayan", "Balete", "Bauan", "Calaca", "Calatagan", "Cuenca", "Lemery", "Lipa", "Mataasnakahoy", "Nasugbu", "Padre Garcia", "Rosario", "San Jose", "Santo Tomas", "Taal", "Tanauan", "Tuy"],
            "Cavite": ["Alfonso", "Amadeo", "Carmona", "Cavite City", "Dasmariñas", "General Trias", "Imus", "Indang", "Mendez", "Naic", "Noveleta", "Rosario", "Silang", "Tagaytay", "Tanza", "Trece Martires"],
            "Laguna": ["Alaminos", "Bay", "Biñan", "Cabuyao", "Calamba", "Los Baños", "Lumban", "Magdalena", "Nagcarlan", "Paete", "Pagsanjan", "Pakil", "Pangil", "San Pablo", "San Pedro", "Santa Cruz", "Santa Rosa", "Siniloan", "Victoria"],
            "Quezon": ["Agdangan", "Candelaria", "Dolores", "Gumaca", "Infanta", "Lucena", "Mauban", "Mulanay", "Pagbilao", "Pitogo", "Quezon", "Real", "Sampaloc", "San Antonio", "San Narciso", "Sariaya", "Tagkawayan", "Tayabas", "Tiaong", "Unisan"],
            "Rizal": ["Angono", "Antipolo", "Binangonan", "Cardona", "Jalajala", "Morong", "Pililla", "Rodriguez", "San Mateo", "Tanay", "Teresa"]
        }
  },

  "Region IV-B": {
        provinces: ["Marinduque", "Occidental Mindoro", "Oriental Mindoro", "Palawan", "Romblon"],
        cities: {
            "Marinduque": ["Boac", "Buenavista", "Gasan", "Mogpog", "Santa Cruz", "Torrijos"],
            "Occidental Mindoro": ["Abra de Ilog", "Calintaan", "Looc", "Lubang", "Magsaysay", "Mamburao", "Paluan", "Rizal", "Sablayan", "San Jose", "Santa Cruz"],
            "Oriental Mindoro": ["Baco", "Bansud", "Bulalacao", "Calapan", "Gloria", "Mansalay", "Naujan", "Pinamalayan", "Pola", "Puerto Galera", "Roxas", "San Teodoro", "Socorro", "Victoria"],
            "Palawan": ["Aborlan", "Balabac", "Bataraza", "Brooke's Point", "Coron", "Culion", "Cuyo", "El Nido", "Linapacan", "Narra", "Puerto Princesa", "Quezon", "Rizal", "Roxas", "San Vicente", "Sofronio Española", "Taytay"],
            "Romblon": ["Alcantara", "Banton", "Cajidiocan", "Calatrava", "Ferrol", "Looc", "Odiongan", "Romblon", "San Agustin", "San Andres", "San Fernando", "Santa Fe", "Santa Maria"]
        }
    },


  "Region V": {
        provinces: ["Albay", "Camarines Norte", "Camarines Sur", "Catanduanes", "Masbate", "Sorsogon"],
        cities: {
            "Albay": ["Bacacay", "Camalig", "Daraga", "Guinobatan", "Jovellar", "Legazpi", "Libon", "Ligao", "Malilipot", "Malinao", "Manito", "Oas", "Pio Duran", "Polangui", "Rapu-Rapu", "Santo Domingo", "Tabaco", "Tiwi"],
            "Camarines Norte": ["Basud", "Capalonga", "Daet", "Jose Panganiban", "Labo", "Mercedes", "Paracale", "San Lorenzo Ruiz", "San Vicente", "Santa Elena", "Talisay", "Vinzons"],
            "Camarines Sur": ["Baao", "Balatan", "Bato", "Bombon", "Buhi", "Bula", "Cabusao", "Calabanga", "Camaligan", "Canaman", "Caramoan", "Del Gallego", "Gainza", "Garchitorena", "Goa", "Iriga", "Lagonoy", "Libmanan", "Lupi", "Magarao", "Milaor", "Minalabac", "Nabua", "Naga", "Ocampo", "Pamplona", "Pasacao", "Pili", "Presentacion", "Ragay", "Sagñay", "San Fernando", "San Jose", "Sipocot", "Siruma", "Tigaon", "Tinambac"],
            "Catanduanes": ["Bagamanoc", "Baras", "Bato", "Caramoran", "Gigmoto", "Pandan", "Panganiban", "San Andres", "San Miguel", "Viga", "Virac"],
            "Masbate": ["Aroroy", "Baleno", "Balud", "Batuan", "Cataingan", "Cawayan", "Claveria", "Dimasalang", "Esperanza", "Mandaon", "Masbate City", "Milagros", "Mobo", "Monreal", "Palanas", "Pio V. Corpuz", "Placer", "San Fernando", "San Jacinto", "San Pascual", "Uson"],
            "Sorsogon": ["Barcelona", "Bulan", "Bulusan", "Casiguran", "Castilla", "Donsol", "Gubat", "Irosin", "Juban", "Magallanes", "Matnog", "Pilar", "Prieto Diaz", "Santa Magdalena", "Sorsogon City"]
        }
    },

  "Region VI": {
        provinces: ["Aklan", "Antique", "Capiz", "Guimaras", "Iloilo", "Negros Occidental"],
        cities: {
            "Aklan": ["Altavas", "Balete", "Banga", "Batan", "Ibajay", "Kalibo", "Lezo", "Libacao", "Madalag", "Makato", "Malay", "Malinao", "Nabas", "New Washington", "Numancia", "Tangalan"],
            "Antique": ["Anini-y", "Barbaza", "Belison", "Bugasong", "Caluya", "Culasi", "Hamtic", "Laua-an", "Libertad", "Pandan", "Patnongon", "San Jose de Buenavista", "San Remigio", "Sebaste", "Sibalom", "Tibiao", "Tobias Fornier", "Valderrama"],
            "Capiz": ["Cuartero", "Dao", "Dumalag", "Dumarao", "Ivisan", "Jamindan", "Maayon", "Mambusao", "Panay", "Panitan", "Pilar", "Pontevedra", "President Roxas", "Roxas City", "Sapian", "Sigma", "Tapaz"],
            "Guimaras": ["Buenavista", "Jordan", "Nueva Valencia", "San Lorenzo", "Sibunag"],
            "Iloilo": ["Ajuy", "Alimodian", "Anilao", "Badiangan", "Balasan", "Banate", "Barotac Nuevo", "Barotac Viejo", "Batad", "Bingawan", "Cabatuan", "Calinog", "Carles", "Concepcion", "Dingle", "Dumangas", "Estancia", "Guimbal", "Igbaras", "Iloilo City", "Janiuay", "Lambunao", "Leganes", "Leon", "Maasin", "Miagao", "Mina", "New Lucena", "Oton", "Passi City", "Pavia", "Pototan", "San Dionisio", "San Enrique", "San Joaquin", "San Miguel", "San Rafael", "Santa Barbara", "Sara", "Tigbauan", "Tubungan", "Zarraga"],
            "Negros Occidental": ["Bacolod City", "Bago City", "Cadiz City", "Escalante City", "Himamaylan City", "Kabankalan City", "La Carlota City", "Sagay City", "San Carlos City", "Silay City", "Sipalay City", "Talisay City", "Victorias City", "Calatrava", "Candoni", "Enrique B. Magalona", "Hinigaran", "Hinoba-an", "Ilog", "Isabela", "La Castellana", "Manapla", "Moises Padilla", "Murcia", "Pontevedra", "Pulupandan", "Salvador Benedicto", "San Enrique", "Toboso", "Valladolid"]
        }
    },

  "Region VII": {
        provinces: ["Bohol", "Cebu", "Negros Oriental", "Siquijor"],
        cities: {
            "Bohol": ["Alburquerque", "Alicia", "Anda", "Antequera", "Baclayon", "Batuan", "Bilar", "Candijay", "Carmen", "Catigbian", "Clarin", "Dauis", "Dimiao", "Duero", "Garcia Hernandez", "Getafe", "Guindulman", "Inabanga", "Jagna", "Lila", "Loboc", "Loon", "Mabini", "Maribojoc", "Panglao", "Pilar", "Sagbayan", "San Isidro", "San Miguel", "Sevilla", "Sierra Bullones", "Sikatuna", "Tagbilaran", "Talibon", "Trinidad", "Tubigon", "Ubay", "Valencia"],
            "Cebu": ["Balamban", "Bantayan", "Barili", "Consolacion", "Cordova", "Danao", "Lapu-Lapu", "Mandaue", "Naga", "Talisay", "Toledo"],
            "Negros Oriental": ["Bayawan", "Canlaon", "Dumaguete", "Guihulngan", "Tanjay"],
            "Siquijor": ["Enrique Villanueva", "Larena", "Lazi", "Maria", "San Juan", "Siquijor"]
        }
    },

  "Region VIII": {
        provinces: ["Biliran", "Eastern Samar", "Leyte", "Northern Samar", "Samar", "Southern Leyte"],
        cities: {
            "Biliran": ["Almeria", "Biliran", "Cabucgayan", "Caibiran", "Culaba", "Kawayan", "Maripipi", "Naval"],
            "Eastern Samar": ["Arteche", "Balangiga", "Balangkayan", "Borongan City", "Can-Avid", "Dolores", "General MacArthur", "Giporlos", "Guiuan", "Hernani", "Jipapad", "Lawaan", "Llorente", "Maslog", "Maydolong", "Oras", "Quinapondan", "Salcedo", "San Julian", "San Policarpo", "Sulat", "Taft"],
            "Leyte": ["Abuyog", "Alangalang", "Albuera", "Babatngon", "Barugo", "Baybay City", "Burauen", "Calubian", "Capoocan", "Carigara", "Dagami", "Dulag", "Hilongos", "Hindang", "Inopacan", "Isabel", "Jaro", "Javier", "Julita", "Kananga", "La Paz", "Leyte", "MacArthur", "Mahaplag", "Matag-ob", "Matalom", "Mayorga", "Merida", "Ormoc City", "Palo", "Palompon", "Pastrana", "San Isidro", "San Miguel", "Santa Fe", "Tabango", "Tabontabon", "Tanauan", "Tolosa", "Tunga"],
            "Northern Samar": ["Allen", "Biri", "Bobon", "Capul", "Catarman", "Catubig", "Gamay", "Laoang", "Lapinig", "Las Navas", "Lavezares", "Lope de Vega", "Mapanas", "Mondragon", "Palapag", "Pambujan", "Rosario", "San Antonio", "San Isidro", "San Jose", "San Roque", "San Vicente", "Silvino Lobos"],
            "Samar": ["Almagro", "Basey", "Calbayog City", "Calbiga", "Daram", "Gandara", "Hinabangan", "Jiabong", "Marabut", "Matuguinao", "Motiong", "Paranas", "Pinabacdao", "San Jorge", "San Jose de Buan", "Santa Margarita", "Santa Rita", "Santo Niño", "Tagapul-an", "Talalora", "Tarangnan", "Villareal", "Zumarraga"],
            "Southern Leyte": ["Anahawan", "Hinunangan", "Hinundayan", "Libagon", "Liloan", "Limasawa", "Maasin City", "Macrohon", "Malitbog", "Padre Burgos", "Pintuyan", "San Francisco", "San Juan", "San Ricardo", "Silago", "Sogod", "St. Bernard", "Tomas Oppus"]
        }
    },

  "Region IX": {
        provinces: ["Zamboanga del Norte", "Zamboanga del Sur", "Zamboanga Sibugay"],
        cities: {
            "Zamboanga del Norte": ["City of Dapitan", "City of Dipolog", "Bacungan (Leon T. Postigo)", "Baliguian", "Godod", "Gutalac", "Jose Dalman (Ponot)", "Kalawit", "Katipunan", "La Libertad", "Labason", "Liloy", "Manukan", "Mutia", "Piñan (New Piñan)", "Polanco", "Pres. Manuel A. Roxas", "Rizal", "Salug", "Sergio Osmeña Sr.", "Siayan", "Sibuco", "Sibutad", "Sindangan", "Siocon", "Sirawai", "Tampilisan"],
            "Zamboanga del Sur": ["City of Pagadian", "Aurora", "Bayog", "Dimataling", "Dinas", "Dumalinao", "Dumingag", "Guipos", "Josefina", "Kumalarang", "Lakewood", "Lapuyan", "Mahayag", "Margosatubig", "Midsalip", "Molave", "Pitogo", "Ramon Magsaysay (Liargo)", "San Miguel", "San Pablo", "Sominot (Don Mariano Marcos)", "Tabina", "Tambulig", "Tigbao", "Tukuran", "Vincenzo A. Sagun"],
            "Zamboanga Sibugay": ["Ipil", "Alicia", "Buug", "Diplahan", "Imelda", "Kabasalan", "Mabuhay", "Malangas", "Naga", "Olutanga", "Payao", "Roseller Lim", "Siay", "Talusan", "Titay", "Tungawan"]
        }
    },

  "Region X": {
        provinces: ["Bukidnon", "Camiguin", "Lanao del Norte", "Misamis Occidental", "Misamis Oriental"],
        cities:  {
            "Bukidnon": ["Baungon", "Cabanglasan", "Damulog", "Dangcagan", "Don Carlos", "Impasug-Ong", "Kadingilan", "Kalilangan", "Kibawe", "Lantapan", "Libona", "Malaybalay City", "Manolo Fortich", "Maramag", "Pangantucan", "Quezon", "San Fernando", "Sumilao", "Talakag", "Valencia City"],
            "Camiguin": ["Catarman", "Guinsiliban", "Mahinog", "Mambajao", "Sagay"],
            "Lanao del Norte": ["Bacolod", "Baloi", "Baroy", "Kapatagan", "Kauswagan", "Kolambugan", "Lala", "Linamon", "Magsaysay", "Maigo", "Munai", "Nunungan", "Pantao Ragat", "Pantar", "Poona Piagapo", "Salvador", "Sapad", "Sultan Naga Dimaporo", "Tagoloan", "Tangcal", "Tubod"],
            "Misamis Occidental": ["Aloran", "Baliangao", "Bonifacio", "Calamba", "Clarin", "Concepcion", "Jimenez", "Lopez Jaena", "Oroquieta City", "Ozamis City", "Panaon", "Plaridel", "Sapang Dalaga", "Sinacaban", "Tangub City", "Tudela"],
            "Misamis Oriental": ["Alubijid", "Balingasag", "Balingoan", "Binuangan", "Cagayan de Oro City", "El Salvador City", "Gingoog City", "Gitagum", "Initao", "Jasaan", "Kinoguitan", "Lagonglong", "Laguindingan", "Libertad", "Lugait", "Magsaysay (Linugos)", "Manticao", "Medina", "Naawan", "Opol", "Salay", "Sugbongcogon", "Tagoloan", "Talisayan", "Villanueva"]
        }
    },


  "Region XI": {
        provinces: ["Davao de Oro", "Davao del Norte", "Davao del Sur", "Davao Occidental", "Davao Oriental"],
        cities: {
            "Davao de Oro": ["Compostela", "Laak (San Vicente)", "Mabini (Doña Alicia)", "Maco", "Maragusan (San Mariano)", "Mawab", "Monkayo", "Montevista", "Nabunturan (Capital)", "New Bataan", "Pantukan"],
            "Davao del Norte": ["Asuncion (Saug)", "Braulio E. Dujali", "Carmen", "City of Panabo", "City of Tagum (Capital)", "Island Garden City of Samal", "Kapalong", "New Corella", "San Isidro", "Santo Tomas", "Talaingod"],
            "Davao del Sur": ["Bansalan", "City of Digos (Capital)", "Hagonoy", "Kiblawan", "Magsaysay", "Malalag", "Matanao", "Padada", "Santa Cruz", "Sulop"],
            "Davao Occidental": ["Don Marcelino", "Jose Abad Santos (Trinidad)", "Malita (Capital)", "Santa Maria", "Sarangani"],
            "Davao Oriental": ["Baganga", "Banaybanay", "Boston", "Caraga", "Cateel", "City of Mati (Capital)", "Governor Generoso", "Lupon", "Manay", "San Isidro", "Tarragona"]
        }
    },


  "Region XII": {
        provinces: ["Cotabato", "Sarangani", "South Cotabato", "Sultan Kudarat"],
        cities: {
            "Cotabato": ["Alamada", "Aleosan", "Antipas", "Arakan", "Carmen", "City of Kidapawan (Capital)", "Kabacan", "Libungan", "M'lang", "Magpet", "Makilala", "Matalam", "Midsayap", "Pigkawayan", "Pikit", "President Roxas", "Tulunan"],
            "Sarangani": ["Alabel (Capital)", "Glan", "Kiamba", "Maasim", "Maitum", "Malapatan", "Malungon"],
            "South Cotabato": ["Banga", "City of Koronadal (Capital)", "Lake Sebu", "Norala", "Polomolok", "Santo Niño", "Surallah", "T'boli", "Tampakan", "Tantangan", "Tupi"],
            "Sultan Kudarat": ["Bagumbayan", "Columbio", "Esperanza", "Isulan (Capital)", "Kalamansig", "Lambayong (Mariano Marcos)", "Lebak", "Lutayan", "Palimbang", "City of Tacurong", "Sen. Ninoy Aquino"]
        }
    },


  "Region XIII": {
        provinces: ["Agusan del Norte", "Agusan del Sur", "Dinagat Islands", "Surigao del Norte", "Surigao del Sur"],
        cities: {
            "Agusan del Norte": ["Buenavista", "Carmen", "City of Butuan", "City of Cabadbaran", "Jabonga", "Kitcharao", "Las Nieves", "Magallanes", "Nasipit", "Remedios T. Romualdez", "Santiago", "Tubay"],
            "Agusan del Sur": ["Bayugan City", "Bunawan", "Esperanza", "La Paz", "Loreto", "Prosperidad", "Rosario", "San Francisco", "San Luis", "Santa Josefa", "Talacogon", "Trento", "Veruela"],
            "Dinagat Islands": ["Basilisa", "Cagdianao", "Dinagat", "Libjo", "San Jose", "Tubajon"],
            "Surigao del Norte": ["Alegria", "Bacuag", "Burgos", "Claver", "Dapa", "Del Carmen", "General Luna", "Gigaquit", "Mainit", "Malimono", "Pilar", "Placer", "San Benito", "San Isidro", "Santa Monica", "Sison", "Socorro", "Surigao City", "Tagana-An", "Tubod"],
            "Surigao del Sur": ["Barobo", "Bayabas", "Bislig City", "Cagwait", "Cantilan", "Carrascal", "Cortes", "Hinatuan", "Lanuza", "Lianga", "Lingig", "Madrid", "Marihatag", "San Agustin", "San Miguel", "Tagbina", "Tago", "Tandag City"]
        }
    },

  "BARMM": {
    provinces: ["Basilan", "Lanao del Sur", "Maguindanao del Norte", "Maguindanao del Sur", "Sulu", "Tawi-Tawi"],
    cities: {
        "Basilan": ["Akbar", "Al-Barka", "Hadji Mohammad Ajul", "Hadji Muhtamad", "Isabela City", "Lamitan City", "Lantawan", "Maluso", "Sumisip", "Tabuan-Lasa", "Tipo-Tipo", "Tuburan", "Ungkaya Pukan"],
        "Lanao del Sur": ["Amai Manabilang (Bumbaran)", "Bacolod-Kalawi (Bacolod Grande)", "Balabagan", "Balindong (Watu)", "Bayang", "Binidayan", "Buadiposo-Buntong", "Bubong", "Butig", "Calanogas", "City of Marawi (Capital)", "Ditsaan-Ramain", "Ganassi", "Kapai", "Kapatagan", "Lumba-Bayabao (Maguing)", "Lumbaca-Unayan", "Lumbatan", "Lumbayanague", "Madalum", "Madamba", "Maguing", "Malabang", "Marantao", "Marogong", "Masiu", "Mulondo", "Pagayawan (Tatarikan)", "Piagapo", "Picong (Sultan Gumander)", "Poona Bayabao (Gata)", "Pualas", "Saguiaran", "Sultan Dumalondong", "Tagoloan II", "Tamparan", "Taraka", "Tubaran", "Tugaya", "Wao"],
        "Maguindanao del Norte": ["Barira", "Buldon", "Datu Blah T. Sinsuat", "Datu Odin Sinsuat (Dinaig)", "Kabuntalan (Tumbao)", "Matanog", "Northern Kabuntalan", "Parang", "Sultan Kudarat (Nuling)", "Sultan Mastura", "Upi"],
        "Maguindanao del Sur": ["Ampatuan", "Buluan", "City of Cotabato", "Datu Abdullah Sangki", "Datu Anggal Midtimbang", "Datu Hoffer Ampatuan", "Datu Paglas", "Datu Piang", "Datu Salibo", "Datu Saudi-Ampatuan", "Datu Unsay", "Gen. S.K. Pendatun", "Guindulungan", "Mamasapano", "Mangudadatu", "Pagagawan", "Pagalungan", "Paglat", "Pandag", "Rajah Buayan", "Shariff Aguak (Maganoy) (Capital)", "Shariff Saydona Mustapha", "South Upi", "Sultan Sa Barongis (Lambayong)", "Talayan", "Talitay"],
        "Sulu": ["Hadji Panglima Tahil (Marunggas)", "Indanan", "Jolo (Capital)", "Kalingalan Caluang", "Lugus", "Luuk", "Maimbung", "Old Panamao", "Omar", "Pandami", "Panglima Estino (New Panamao)", "Parang", "Pata", "Patikul", "Siasi", "Talipao", "Tapul"],
        "Tawi-Tawi": ["Bongao (Capital)", "Languyan", "Mapun (Cagayan De Tawi-Tawi)", "Panglima Sugala (Balimbing)", "Pangutaran", "Sapa-Sapa", "Sibutu", "Simunul", "Sitangkai", "South Ubian", "Tandubas", "Turtle Islands"]
    }
}
};

function updatelocations() {
  const region = document.getElementById("region").value;
  const provinceSelect = document.getElementById("province");
  const citySelect = document.getElementById("city");

  // Reset downstream selects
  provinceSelect.innerHTML = '<option value="">-- Select Province --</option>';
  citySelect.innerHTML = '<option value="">-- Select City --</option>';
  citySelect.disabled = true;

  if (!region || !dropdownoptn[region]) {
    provinceSelect.disabled = true;
    return;
  }

  // Enable and populate provinces
  provinceSelect.disabled = false;
  dropdownoptn[region].provinces.forEach(prov => {
    const opt = document.createElement("option");
    opt.value = prov;
    opt.textContent = prov;
    provinceSelect.appendChild(opt);
  });

  // Add province change listener
  provinceSelect.onchange = function() {
    const selectedProvince = this.value;
    citySelect.innerHTML = '<option value="">-- Select City --</option>';
    
    if (selectedProvince && dropdownoptn[region].cities[selectedProvince]) {
      citySelect.disabled = false;
      dropdownoptn[region].cities[selectedProvince].forEach(city => {
        const opt = document.createElement("option");
        opt.value = city;
        opt.textContent = city;
        citySelect.appendChild(opt);
      });
    } else {
      citySelect.disabled = true;
    }
  };
}
//end of birth certificate



//marriage
const locationData = {
      "NCR": {
        provinces: ["Metro Manila"],
        cities: ["Binondo", "Caloocan", "Ermita", "Intramuros", "Las Piñas", "Makati", "Malabon",
             "Malate", "Mandaluyong", "Marikina", "Muntinlupa", "Navotas", "Paco", "Pandacan",
              "Parañaque", "Pasay City", "Pasig", "Pateros", "Port Area", "Quezon City", "Quiapo",
               "San Juan", "San Miguel", "San Nicolas", "Sampaloc", "Santa Ana", "Santa Cruz", "Taguig",
               "Tondo", "Valenzuela"]
      },
      "CAR": {
        provinces: ["Abra", "Apayao", "Benguet", "Ifugao", "Kalinga", "Mountain Province"],
        cities: ["Aguinaldo","Alfonso Lista", "Asipulo", " Atok", "Bakun", "Balbalan", "Banaue",
            "Bangued", "Barlig", "Bauko", "Besao", "Bokod", "Boliney", "Bontoc", "Bucay", "Bucloc",
        "Buguias", "Calanasan", "City of Baguio", "City of Tabuk", "Conner", "Daguioman", "Danglas",
    "Dolores", "Flora", "Hingyon", "Hungduan", "Itogon", "Kabayan", "Kabugao", "Kapangan", "Kiangan",
        "Kibungan", "Lapaz", "La Trinidad", "Lacub", "Lagangilang", "Lagawe", "Lagayan", "Lamut", "Langiden",
        "Licuan-Baay", "Luba", "Lubuagan", "Luna", "Malibcong", "Manabo", "Manyakan", "Mayoyao", "Natonin",
        "Paracelis", "Pasil", "Peñarrubia", "Pidigan", "Pilar", "Pinukpuk", "Pudtol", "Rizal", "Sabangan",
        "Sablan", "Sadanga", "Sallapadan", "San Isidro", "San juan", "San Quintin", "Santa Marcela", "Tadian",
        "Tanudan", "Tayum", "Tineg", "Tinglayan", "Tinoc", "Tuba", "Tublay", "Tubo", "Villaviciosa" ]
      },
      "Region I": {
        provinces: ["Ilocos Norte", "Ilocos Sur", "La Union", "Pangasinan"],
        cities: ["Adams","Agno", "Agoo", "Aguilar", "Alcala", "Alilem", "Anda",
            "Aringay", "Asingan", "Bacarra", "Bacnotan", "Badoc", "Bagulin",
        "Balaoan", "Balungao", "Banayoyo", "Bangar", "Bangui", "Bani", "Banna",
        "Bantay", "Basista", "Bauang", "Bautista", "Bayambang", "Binalonan",
        "Binmaley", "Bolinao", "Bugallon", "Burgos", "Caba", "Cabugao", "Calasiao",
        "Caoayan", "Carasi", "Cervantes", "City of Alaminos", "City of Batac", "City of Candon",
        "City of Dagupan", "City of Laoag", "City of San Carlos", "City of San Fernando",
        "City of Urdaneta", "City of Vigan", "Currimao", "Dasol", "Dingras", "Dumalneg",
        "Galimuyod", "Gregorio del Pilar", "Infanta", "Labrador", "Laoac", "Lidlidda",
        "Lingayen", "Luna", "Mabini", "Magsingal", "Malasiqui", "Manaoag", "Mangaldan",
        "Mangatarem", "Mapandan", "Marcos", "Nagbukel", "Naguilian", "Narvacan", "Natividad",
        "Nueva Era", "Pagudpud", "Paoay", "Pasuquin", "Paddig", "Pinili", "Pozorrubio",
        "Pugo", "Quirino", "Rosales", "Salcedo", "San Emilio", "San Esteban", "San Fabian",
        "San Gabriel", "San Ildefonso", "San Jacinto", "San Juan", "San Manuel", "San Nicolas",
        "San Quintin", "San Vicente", "Santa", "Santa Barbara", " Santa Catalina", "Santa Cruz",
        "Santa Lucia", "Santa Maria", "Santiago", "Santo Domingo", "Santo Tomas", "Santol", "Sarrat",
        "Sigay", "Sinait", "Sison", "Solsona", "Sual", "Sudipen", "Sugpon", "Suyo", "Tagudin", "Tayug",
        "Tubao", "Umingan", "Urbiztondo", "Villasis", "Vintar"]
      },
    "Region II": {
        provinces: ["Batanes", "Cagayan", "Isabela", "Nueva Vizcaya", "Quirino"],
        cities: [ "Abulug", "Alcala", "Allacapan", "Amulung", "Aparri", "Baggao", "Ballesteros", "Basco",
      "Buguey", "Calayan", "Camalaniugan", "Claveria", "City of Ilagan", "City of Cauayan", "City of Santiago",
      "Enrile", "Gattaran", "Gonzaga", "Iguig","Itbayat", "Ivana", "Lal-lo", "Lasam", "Mahatao", "Pamplona",
      "Peñablanca", "Piat", "Rizal", "Sabtang", "Santa Ana", "Santa Praxedes", "Santa Teresita", "Santo Niño",
      "Solana", "Tuao", "Uyugan", "Tuguegarao City", "Tumauini", "Villaverde"]
    },
    "Region III": {
        provinces: ["Aurora", "Bataan", "Bulacan", "Nueva Ecija", "Pampanga", "Tarlac", "Zambales"],
        cities: ["Abucay", "Angat", "Angeles City", "Arayat", "Bacolor", "Bagac", "Balanga City", "Balagtas",
      "Baliuag", "Bocaue", "Bulakan", "Bustos", "Cabanatuan City", "Calumpit", "Candaba", "Capas",
      "Casiguran", "Concepcion", "Dilasag", "Dinalungan", "Dinalupihan", "Dingalan", "Doña Remedios Trinidad",
      "Floridablanca", "Gabaldon", "Gapan City", "General Mamerto Natividad", "General Tinio", "Guagua",
      "Guiguinto", "Guimba", "Hermosa", "Iba", "Jaen", "Laur", "Licab", "Limay", "Lubao", "Macabebe",
      "Mabalacat", "Magalang", "Malolos City", "Mariveles", "Marilao", "Mexico", "Meycauayan City",
      "Minalin", "Moncada", "Morong", "Nampicuan", "Norzagaray", "Obando", "Olongapo City", "Orani",
      "Orion", "Palayan City", "Pampanga", "Paniqui", "Pantabangan", "Paombong", "Peñaranda", "Pilar",
      "Plaridel", "Porac", "Pura", "Quezon", "Ramos", "Rizal", "Rosales", "Samal", "San Antonio",
      "San Fernando City", "San Ildefonso", "San Isidro", "San Jose City", "San Jose del Monte City",
      "San Leonardo", "San Luis", "San Manuel", "San Marcelino", "San Miguel", "San Narciso",
      "San Rafael", "San Simon", "Santa Ana", "Santa Cruz", "Santa Maria", "Santa Rita", "Santa Rosa",
      "Santo Domingo", "Santo Tomas", "Sasmuan", "Subic", "Tarlac City", "Talavera", "Talugtug",
      "Tayug", "Victoria", "Zambales", "Zaragoza"]
    },
  "Region IV-A": {
        provinces: ["Batangas", "Cavite", "Laguna", "Quezon", "Rizal"],
        cities: [ "Agdangan", "Agoncillo", "Alaminos", "Alfonso", "Amadeo", "Angono", "Antipolo", "Balayan", "Balete",
      "Bauan", "Bay", "Biñan", "Binangonan", "Cabuyao", "Calaca", "Calamba", "Calatagan", "Candelaria",
      "Carmona", "Cavite City", "Cuenca", "Dasmariñas", "General Trias", "Imus", "Indang", "Lemery",
      "Lipa", "Los Baños", "Lucena", "Lumban", "Magdalena", "Mataasnakahoy", "Morong", "Nasugbu",
      "Padre Garcia", "Rosario", "Rizal", "Rodriguez", "San Juan", "San Pablo", "San Pedro", "Santa Cruz", "Santa Rosa",
      "Santo Tomas", "San jose", "San Mateo",  "Tagaytay", "Tanauan", "Tayabas", "Trece Martires", "Tuy", "Quezon",
      "Victoria"]
    },
  "Region IV-B": {
        provinces: ["Marinduque", "Occidental Mindoro", "Oriental Mindoro", "Palawan", "Romblon"],
        cities: [ "Aborlan", "Abra de Ilog", "Alcantara", "Baco", "Balabac", "Bansud", "Basco", "Bataraza",
      "Boac", "Brooke's Point", "Buenavista", "Bulalacao", "Calapan", "Calatrava", "Cajidiocan",
      "Camarines Norte", "Camarines Sur", "Candelaria", "Catanduanes", "Coron", "Culion", "Cuyo",
      "Gasan", "Ilog", "Looc", "Lubang", "Magsaysay", "Mamburao", "Mansalay", "Marinduque",
      "Mogpog", "Naujan", "Odiongan", "Palawan", "Pinamalayan", "Puerto Galera", "Puerto Princesa",
      "Rizal", "Romblon", "Roxas", "Sablayan", "San Agustin", "San Andres", "San Fernando",
      "San Jose", "San Teodoro", "Santa Cruz", "Santa Fe", "Sofronio Española", "Taytay", "Torrijos"]
    },
  "Region V": {
        provinces: ["Albay", "Camarines Norte", "Camarines Sur", "Catanduanes", "Masbate", "Sorsogon"],
        cities: ["Aroroy", "Bacacay", "Baleno", "Balud", "Basud", "Bato", "Bulan", "Bulusan", "Calabanga",
      "Camaligan", "Canaman", "Caramoan", "Castilla", "Catanduanes", "Cataingan", "Claveria",
      "Donsol", "Garchitorena", "Gubat", "Iriga", "Irosin", "Jovellar", "Legazpi", "Libmanan",
      "Ligao", "Lupi", "Magallanes", "Malilipot", "Malinao", "Malungon", "Masbate", "Milagros",
      "Mobo", "Naga", "Oas", "Panganiban", "Pio Duran", "Polangui", "Prieto Diaz", "Rapu-Rapu",
      "San Fernando", "San Jacinto", "San Jose", "San Pascual", "Santo Domingo", "Sorsogon",
      "Tabaco", "Tigaon", "Tiwi", "Tobias Fornier", "Uson", "Vinzons"]
    },
  "Region VI": {
        provinces: ["Aklan", "Antique", "Capiz", "Guimaras", "Iloilo", "Negros Occidental"],
        cities: ["Altavas", "Anini-y", "Bacolod", "Balasan", "Banate", "Barotac Nuevo", "Barotac Viejo",
      "Bingawan", "Bugasong", "Cabatuan", "Cadiz", "Calinog", "Carles", "Cauayan", "Concepcion",
      "Culasi", "Dingle", "Dumangas", "Estancia", "Guimbal", "Hamtic", "Iloilo City", "Janiuay",
      "Jaro", "Kalibo", "La Paz", "La Carlota", "Lambunao", "Leganes", "Leon", "Maasin", "Mambusao",
      "Miagao", "Mina", "New Lucena", "Numancia", "Oton", "Passi", "Pavia", "Pototan", "Roxas",
      "San Enrique", "San Joaquin", "San Miguel", "San Rafael", "Santa Barbara", "Sara", "Silay",
      "Sibalom", "Tigbauan", "Tubungan", "Valderrama", "Victorias", "Zarraga"]
    },
  "Region VII": {
        provinces: ["Bohol", "Cebu", "Negros Oriental", "Siquijor"],
        cities: ["Alburquerque", "Alicia", "Anda", "Antequera", "Baclayon", "Balamban", "Bantayan", "Barili",
      "Batuan", "Bayawan", "Bilar", "Candijay", "Carmen", "Catigbian", "Clarin", "Consolacion",
      "Cordova", "Danao", "Dauis", "Dimiao", "Duero", "Garcia Hernandez", "Getafe", "Guindulman",
      "Inabanga", "Jagna", "Lapu-Lapu", "Lila", "Loboc", "Loon", "Mabini", "Mandaue", "Maribojoc",
      "Panglao", "Pilar", "Sagbayan", "San Isidro", "San Miguel", "Sevilla", "Sierra Bullones",
      "Sikatuna", "Tagbilaran", "Talibon", "Trinidad", "Tubigon", "Ubay", "Valencia"]
    },
  "Region VIII": {
        provinces: ["Biliran", "Eastern Samar", "Leyte", "Northern Samar", "Samar", "Southern Leyte"],
        cities: [ "Abuyog", "Alangalang", "Albuera", "Allen", "Almagro", "Almeria", "Anahawan", "Arteche", "Babatngon",
    "Balangiga", "Balangkayan", "Barugo", "Basey", "Bato", "Biliran", "Biri", "Bobon", "Bontoc", "Burauen",
    "Cabucgayan", "Caibiran", "Calbiga", "Calubian", "Can-Avid", "Capoocan", "Capul", "Carigara", "Catarman",
    "Catubig", "City Of Baybay", "City Of Borongan (Capital)", "City Of Calbayog", "City Of Catbalogan (Capital)",
    "City Of Maasin (Capital)", "City Of Tacloban (Capital)", "Culaba", "Dagami", "Daram", "Dolores", "Dulag",
    "Gamay", "Gandara", "General Macarthur", "Giporlos", "Guiuan", "Hernani", "Hilongos", "Hinabangan", "Hindang",
    "Hinunangan", "Hinundayan", "Inopacan", "Isabel", "Jaro", "Javier (Bugho)", "Jiabong", "Jipapad", "Julita",
    "Kananga", "Kawayan", "La Paz", "Laoang", "Lapinig", "Las Navas", "Lavezares", "Lawaan", "Leyte", "Libagon",
    "Liloan", "Limasawa", "Llorente", "Lope De Vega", "Macarthur", "Macrohon", "Mahaplag", "Malitbog", "Mapanas",
    "Marabut", "Maripipi", "Maslog", "Matag-Ob", "Matalom", "Matuguinao", "Maydolong", "Mayorga", "Mercedes",
    "Merida", "Mondragon", "Motiong", "Naval", "Oras", "Ormoc City", "Padre Burgos", "Pagsanghan", "Palapag",
    "Palo", "Palompon", "Pambujan", "Paranas (Wright)", "Pastrana", "Pinabacdao", "Pintuyan", "Quinapondan",
    "Rosario", "Saint Bernard", "Salcedo", "San Antonio", "San Francisco", "San Isidro", "San Jorge", "San Jose",
    "San Jose De Buan", "San Juan (Cabalian)", "San Julian", "San Miguel", "San Policarpo", "San Ricardo",
    "San Roque", "San Sebastian", "San Vicente", "Santa Fe", "Santa Margarita", "Santa Rita", "Santo Niño",
    "Silago", "Silvino Lobos", "Sogod", "Sulat", "Tabango", "Tabontabon", "Taft", "Tagapul-An", "Talalora",
    "Tanauan", "Tarangnan", "Tolosa", "Tomas Oppus", "Tunga", "Victoria", "Villaba", "Villareal", "Zumarraga"]
    },
  "Region IX": {
        provinces: ["Zamboanga del Norte", "Zamboanga del Sur", "Zamboanga Sibugay"],
        cities: ["Alicia", "Aurora", "Bacungan (Leon T. Postigo)", "Baliguian", "Bayog", "Buug",
    "City Of Dapitan", "City Of Dipolog (Capital)", "City Of Pagadian (Capital)", "City Of Zamboanga",
    "Dimataling", "Dinas", "Diplahan", "Dumalinao", "Dumingag", "Godod", "Guipos", "Gutalac", "Imelda",
    "Ipil (Capital)", "Jose Dalman (Ponot)", "Josefina", "Kabasalan", "Kalawit", "Katipunan", "Kumalarang",
    "La Libertad", "Labangan", "Labason", "Lakewood", "Lapuyan", "Liloy", "Mabuhay", "Mahayag", "Malangas",
    "Manukan", "Margosatubig", "Midsalip", "Molave", "Mutia", "Naga", "Olutanga", "Payao", "Pitogo",
    "Piñan (New Piñan)", "Polanco", "Pres. Manuel A. Roxas", "Ramon Magsaysay (Liargo)", "Rizal",
    "Roseller Lim", "Salug", "San Miguel", "San Pablo", "Sergio Osmeña Sr.", "Siay", "Siayan", "Sibuco",
    "Sibutad", "Sindangan", "Siocon", "Sirawai", "Sominot (Don Mariano Marcos)", "Tabina", "Talusan",
    "Tambulig", "Tampilisan", "Tigbao", "Titay", "Tukuran", "Tungawan", "Vincenzo A. Sagun"]
    },
  "Region X": {
        provinces: ["Bukidnon", "Camiguin", "Lanao del Norte", "Misamis Occidental", "Misamis Oriental"],
        cities: ["Aloran", "Alubijid", "Bacolod", "Baliangao", "Balingasag", "Balingoan", "Baloi", "Baroy", "Baungon",
    "Binuangan", "Bonifacio", "Cabanglasan", "Calamba", "Catarman", "City Of Cagayan De Oro (Capital)",
    "City Of El Salvador", "City Of Gingoog", "City Of Iligan", "City Of Malaybalay (Capital)",
    "City Of Oroquieta (Capital)", "City Of Ozamiz", "City Of Tangub", "City Of Valencia", "Clarin",
    "Claveria", "Concepcion", "Damulog", "Dangcagan", "Don Carlos", "Don Victoriano Chiongbian (Don Mariano Marcos)",
    "Gitagum", "Guinsiliban", "Impasug-Ong", "Initao", "Jasaan", "Jimenez", "Kadingilan", "Kalilangan",
    "Kapatagan", "Kauswagan", "Kibawe", "Kinoguitan", "Kitaotao", "Kolambugan", "Lagonglong", "Laguindingan",
    "Lala", "Lantapan", "Libertad", "Libona", "Linamon", "Lopez Jaena", "Lugait", "Magsaysay",
    "Magsaysay (Linugos)", "Mahinog", "Maigo", "Malitbog", "Mambajao (Capital)", "Manolo Fortich", "Manticao",
    "Maramag", "Matungao", "Medina", "Munai", "Naawan", "Nunungan", "Opol", "Panaon", "Pangantucan",
    "Pantao Ragat", "Pantar", "Plaridel", "Poona Piagapo", "Quezon", "Sagay", "Salay", "Salvador",
    "San Fernando", "Sapad", "Sapang Dalaga", "Sinacaban", "Sugbongcogon", "Sultan Naga Dimaporo (Karomatan)",
    "Sumilao", "Tagoloan", "Talakag", "Talisayan", "Tangcal", "Tubod (Capital)", "Tudela", "Villanueva"]
    },
  "Region XI": {
        provinces: ["Davao de Oro", "Davao del Norte", "Davao del Sur", "Davao Occidental", "Davao Oriental"],
        cities: ["Asuncion (Saug)", "Baganga", "Banaybanay", "Bansalan", "Boston", "Braulio E. Dujali", "Caraga", "Carmen",
    "Cateel", "City Of Davao", "City Of Digos (Capital)", "City Of Mati (Capital)", "City Of Panabo",
    "City Of Tagum (Capital)", "Compostela", "Don Marcelino", "Governor Generoso", "Hagonoy",
    "Island Garden City Of Samal", "Jose Abad Santos (Trinidad)", "Kapalong", "Kiblawan", "Laak (San Vicente)",
    "Lupon", "Mabini (Doña Alicia)", "Maco", "Magsaysay", "Malalag", "Malita (Capital)", "Manay",
    "Maragusan (San Mariano)", "Matanao", "Mawab", "Monkayo", "Montevista", "Nabunturan (Capital)", "New Bataan",
    "New Corella", "Padada", "Pantukan", "San Isidro", "Santa Cruz", "Santa Maria", "Santo Tomas", "Sarangani",
    "Sulop", "Talaingod", "Tarragona"]
    },
  "Region XII": {
        provinces: ["Cotabato", "Sarangani", "South Cotabato", "Sultan Kudarat"],
        cities: ["Alabel (Capital)", "Alamada", "Aleosan", "Antipas", "Arakan", "Bagumbayan", "Banga", "Banisilan",
    "Carmen", "City Of General Santos (Dadiangas)", "City Of Kidapawan (Capital)", "City Of Koronadal (Capital)",
    "City Of Tacurong", "Columbio", "Esperanza", "Glan", "Isulan (Capital)", "Kabacan", "Kalamansig",
    "Kiamba", "Lake Sebu", "Lambayong (Mariano Marcos)", "Lebak", "Libungan", "Lutayan", "M'lang",
    "Maasim", "Magpet", "Maitum", "Makilala", "Malapatan", "Malungon", "Matalam", "Midsayap", "Norala",
    "Palimbang", "Pigkawayan", "Pikit", "Polomolok", "President Quirino", "President Roxas", "Santo Niño",
    "Sen. Ninoy Aquino", "Surallah", "T'boli", "Tampakan", "Tantangan", "Tulunan", "Tupi"]
    },
  "Region XIII": {
        provinces: ["Agusan del Norte", "Agusan del Sur", "Dinagat Islands", "Surigao del Norte", "Surigao del Sur"],
        cities: ["Alegria", "Bacuag", "Barobo", "Basilisa", "Bayabas", "Buenavista", "Bunawan", "Burgos", "Cagdianao",
            "Cagwait", "Cantilan", "Carmen", "Carrascal", "City of Bayugan", "City of Bislig", "City of Butuan", "City of Cabadbaran",
            "City of Surigao", "City of Tandag", "Claver", "Cortes", "Dapa", "Del Carmen", "Dinagat", "Esperanza", "General Luna",
            "Gigaquit", "Hinatuan", "Jabonga", "Kitcharao", "La Paz", "Lanuza", "Las Nieves", "Lianga", "Libjo", "Lingig", "Loreto",
            "Madrid", "Magallanes", "Mainit", "Malimono", "Marihatag", "Nasipit", "Pilar", "Placer", "Prosperidad", "Remedios T. Romualdez",
            "Rosario", "San Agustin", "San Benito", "San Francisco", "San Isidro", "San Jose", "San Miguel", "Santa Josefa", "Santa Monica",
            "Santiago", "Sibagat", "Sison", "Socorro", "Tagana-An", "Tagbina", "Tago", "Talacogon", "Trento", "Tubajon", "Tubay", "Tubod",
            "Veruela"]
    },
  "Bangsamoro Autonomous Region in Muslim Mindanao": {
        provinces: ["Basilan", "Lanao del Sur", "Maguindanao del Norte", "Maguindanao del Sur", "Sulu", "Tawi-Tawi"],
        cities: [ "Akbar", "Al-Barka", "Amai Manabilang (Bumbaran)", "Ampatuan", "Bacolod-Kalawi (Bacolod Grande)",
    "Balabagan", "Balindong (Watu)", "Barira", "Bayang", "Binidayan", "Bongao (Capital)",
    "Buadiposo-Buntong", "Bubong", "Buldon", "Buluan", "Butig", "Calanogas", "City Of Lamitan (Capital)",
    "City Of Marawi (Capital)", "Cotabato City", "Datu Abdullah Sangki", "Datu Anggal Midtimbang",
    "Datu Blah T. Sinsuat", "Datu Hoffer Ampatuan", "Datu Odin Sinsuat (Dinaig)", "Datu Paglas",
    "Datu Piang", "Datu Salibo", "Datu Saudi-Ampatuan", "Datu Unsay", "Ditsaan-Ramain", "Ganassi",
    "Gen. S.K. Pendatun", "Guindulungan", "Hadji Mohammad Ajul", "Hadji Muhtamad", "Hadji Panglima Tahil (Marunggas)",
    "Indanan", "Isabela", "Jolo (Capital)", "Kabuntalan (Tumbao)", "Kalingalan Caluang", "Kapai", "Kapatagan",
    "Languyan", "Lantawan", "Lugus", "Lumba-Bayabao (Maguing)", "Lumbaca-Unayan", "Lumbatan", "Lumbayanague",
    "Luuk", "Madalum", "Madamba", "Maguing", "Maimbung", "Malabang", "Maluso", "Mamasapano", "Mangudadatu",
    "Mapun (Cagayan De Tawi-Tawi)", "Marantao", "Marogong", "Masiu", "Matanog", "Mulondo", "Northern Kabuntalan",
    "Old Panamao", "Omar", "Pagagawan", "Pagalungan", "Pagayawan (Tatarikan)", "Paglat", "Pandag", "Pandami",
    "Panglima Estino (New Panamao)", "Panglima Sugala (Balimbing)", "Pangutaran", "Parang", "Pata", "Patikul",
    "Piagapo", "Picong (Sultan Gumander)", "Poona Bayabao (Gata)", "Pualas", "Rajah Buayan", "Saguiaran",
    "Sapa-Sapa", "Shariff Aguak (Maganoy) (Capital)", "Shariff Saydona Mustapha", "Siasi", "Sibutu",
    "Simunul", "Sitangkai", "South Ubian", "South Upi", "Sultan Dumalondong", "Sultan Kudarat (Nuling)",
    "Sultan Mastura", "Sultan Sa Barongis (Lambayong)", "Sumisip", "Tabuan-Lasa", "Tagoloan Ii", "Talayan",
    "Talipao", "Talitay", "Tamparan", "Tandubas", "Tapul", "Taraka", "Tipo-Tipo", "Tongkil", "Tubaran",
    "Tuburan", "Tugaya", "Turtle Islands", "Ungkaya Pukan", "Upi", "Wao"]
  }
}

    function updateLocationOptions() {
      const region = document.getElementById("region").value;
      const provinceSelect = document.getElementById("province");
      const citySelect = document.getElementById("city");

      provinceSelect.innerHTML = '<option value="">-- Select Province --</option>';
      citySelect.innerHTML = '<option value="">-- Select City/Municipality --</option>';

      if (region && locationData[region]) {
        locationData[region].provinces.forEach(prov => {
          const opt = document.createElement("option");
          opt.value = prov;
          opt.textContent = prov;
          provinceSelect.appendChild(opt);
        });

        locationData[region].cities.forEach(city => {
          const opt = document.createElement("option");
          opt.value = city;
          opt.textContent = city;
          citySelect.appendChild(opt);
        });
      }
    }
//end of marriage certificate


//death
const dropdownoption = {
      "NCR": {
        provinces: ["Metro Manila"],
        cities: {
            "Metro Manila":["Binondo", "Caloocan", "Ermita", "Intramuros", "Las Piñas", "Makati", "Malabon",
             "Malate", "Mandaluyong", "Marikina", "Muntinlupa", "Navotas", "Paco", "Pandacan",
              "Parañaque", "Pasay City", "Pasig", "Pateros", "Port Area", "Quezon City", "Quiapo",
               "San Juan", "San Miguel", "San Nicolas", "Sampaloc", "Santa Ana", "Santa Cruz", "Taguig",
               "Tondo", "Valenzuela"]
            }
        },

      "CAR": {
        provinces: ["Abra", "Apayao", "Benguet", "Ifugao", "Kalinga", "Mountain Province"],
        cities: {
            "Abra":["Bangued","Bucay","Dolores","Lagangilang","Peñarrubia","Pilar","San Juan","Tayum","Villaviciosa"],
            "Apayao":["Calanasan","Conner","Flora","Kabugao","Luna","Pudtol","Santa Marcela"],
            "Benguet":["City of Baguio", "La Trinidad","Itogon","Tublay","Sablan","Kapangan","Kibungan","Bokod","Buguias","Manyakan","Atok"],
            "Ifugao":["Aguinaldo","Alfonso Lista","Asipulo","Banaue","Hingyon","Hungduan","Klangan","Lagawe","Lamut","Bokod","Lamut","Mayoyao","Tinoc"],
            "Kalinga":["City of Tabuk","Balbalan","Lubuagan","Pasil","Pinukpuk","Rizal","Tanudan","Tinglayan"],
            "Mountain Province":["Barlig","Bauko","Besao","Bontoc","Natonin","Paracells","Sabangan","Sadanga","Sadaga","Tadian"]            
        }
    },
      "Region I": {
        provinces: ["Ilocos Norte", "Ilocos Sur", "La Union", "Pangasinan"],
        cities: {
            "Ilocos Norte":["Laoag","Batac","Adams","Bacarra","Bangil","Banna","Burgos","Carasi","Currimao","Dingras","Dumalneg","Marcos","Nueva Era","Padudpud","Paoay","Pasuquin","Piddig","Pinili","San Nicolas","Sarrat","Solsona","Vintar"],
            "Ilocos Sur":["Vigan","Candon","Alilem","Banayoyo","Burgos","Cabugao","Caoyan","Carvantes","Galimuyod","Gregorio del Pilar","Lidlidda","Magsingal","Nagbukel","Narvacan","Quirino","Salcedo","San Emilio"," San Esteban","San Ildefonso","San Juan","San Vicente","Santa","Santa Catalina","Santa Cruz","Santa Lucia","Santa Maria","Santiago","Santo Domingo","Sigay","Sinait","Sugpon","Suyo","Tagudin"],
            "La Union":["San Fernando","Agoo","Aringay","Bacnotan","Bagulin","Balaoan","Bangar","Bauang","Burgos","Caba","Luna","Naguilian","Pugo","Rosario","San Gabriel","San Juan","Santo Tomas","Santol","Sudipen","Tubao"],
            "Pangasinan":["Alaminos", "Dagupan","San Carlos","Urdaneta","Agno","Aguilar","Alcala","Anda","Asingan","Balungao","Basista","Bautista","Bayambang","Binalonan","Binmaley","Bolinao","Bugallon","Burgos","Calasiao","Dasol","Infanta","Mapandan","Natividad","Pozorrubio","Rosales","San Fabian","San Jacinto","San Manuel","San Nicolas","San Quintin","Santa Barbara","Santo Tomas","Sison","Sual","Tayug","Umingan","Urbiztondo",'Villasis']
        }
      }, 

    "Region II": {
        provinces: ["Batanes", "Cagayan", "Isabela", "Nueva Vizcaya", "Quirino"],
        cities: {
            "Batanes":["Basco","Itbayat","Ivana","Mahatao","Sabtang","Uyugan"],
            "Cagayan":["Tuguegarao City","Abulug","Allacapan","Amulung","Aparri","Baggao","Ballesteros","Buguey","Calayan","Camalaniugan",'Claveria',"Enrile","Gattaran","Gonzaga","Iguig","Lal-lo","Lasam","Pampalona","Peñablanca","Piat","Rizal","Santa Ana","Santa Praxedes","Sanra Teresite"," Santo Niño","Solana","Tau"],
            "Isabela":["City of Ilagan","City of Cauayan","City of Santiago","Tumauini"],
            "Nueva Vizcaya": ["Bayombong", "Solano", "Alfonso Castaneda", "Ambaguio"],
            "Quirino": ["Cabarroguis", "Diffun", "Maddela", "Nagtipunan"]
            
        }
    },

    "Region III": {
        provinces: ["Aurora", "Bataan", "Bulacan", "Nueva Ecija", "Pampanga", "Tarlac", "Zambales"],
        cities: {
            "Aurora": ["Baler", "Casiguran", "Dilasag", "Dinalungan", "Dingalan", "Dipaculao", "Maria Aurora", "San Luis"],
            "Bataan": ["Abucay", "Bagac", "Balanga City", "Dinalupihan", "Hermosa", "Limay", "Mariveles", "Morong", "Orani", "Orion", "Pilar", "Samal"],
            "Bulacan": ["Angat", "Balagtas", "Baliuag", "Bocaue", "Bulakan", "Bustos", "Calumpit", "Guiguinto", "Hagonoy", "Malolos City", "Marilao", "Meycauayan City", "Norzagaray", "Obando", "Pandi", "Paombong", "Plaridel", "Pulilan", "San Ildefonso", "San Jose del Monte City", "San Miguel", "San Rafael", "Santa Maria"],
            "Nueva Ecija": ["Aliaga", "Bongabon", "Cabanatuan City", "Cabiao", "Carranglan", "Gabaldon", "Gapan City", "General Mamerto Natividad", "General Tinio", "Guimba", "Jaen", "Laur", "Licab", "Llanera", "Lupao", "Nampicuan", "Palayan City", "Pantabangan", "Peñaranda", "Quezon", "Rizal", "San Antonio", "San Isidro", "San Jose City", "San Leonardo", "Santa Rosa", "Santo Domingo", "Talavera", "Talugtug", "Zaragoza"],
            "Pampanga": ["Angeles City", "Apalit", "Arayat", "Bacolor", "Candaba", "Floridablanca", "Guagua", "Lubao", "Mabalacat City", "Macabebe", "Magalang", "Masantol", "Mexico", "Minalin", "Porac", "San Fernando City", "San Luis", "San Simon", "Santa Ana", "Santa Rita", "Santo Tomas", "Sasmuan"],
        }
    },

  "Region IVA": {
        provinces: ["Batangas", "Cavite", "Laguna", "Quezon", "Rizal"],
        cities: {
            "Batangas": ["Agoncillo", "Balayan", "Balete", "Bauan", "Calaca", "Calatagan", "Cuenca", "Lemery", "Lipa", "Mataasnakahoy", "Nasugbu", "Padre Garcia", "Rosario", "San Jose", "Santo Tomas", "Taal", "Tanauan", "Tuy"],
            "Cavite": ["Alfonso", "Amadeo", "Carmona", "Cavite City", "Dasmariñas", "General Trias", "Imus", "Indang", "Mendez", "Naic", "Noveleta", "Rosario", "Silang", "Tagaytay", "Tanza", "Trece Martires"],
            "Laguna": ["Alaminos", "Bay", "Biñan", "Cabuyao", "Calamba", "Los Baños", "Lumban", "Magdalena", "Nagcarlan", "Paete", "Pagsanjan", "Pakil", "Pangil", "San Pablo", "San Pedro", "Santa Cruz", "Santa Rosa", "Siniloan", "Victoria"],
            "Quezon": ["Agdangan", "Candelaria", "Dolores", "Gumaca", "Infanta", "Lucena", "Mauban", "Mulanay", "Pagbilao", "Pitogo", "Quezon", "Real", "Sampaloc", "San Antonio", "San Narciso", "Sariaya", "Tagkawayan", "Tayabas", "Tiaong", "Unisan"],
            "Rizal": ["Angono", "Antipolo", "Binangonan", "Cardona", "Jalajala", "Morong", "Pililla", "Rodriguez", "San Mateo", "Tanay", "Teresa"]
        }
  },

  "Region IVB": {
        provinces: ["Marinduque", "Occidental Mindoro", "Oriental Mindoro", "Palawan", "Romblon"],
        cities: {
            "Marinduque": ["Boac", "Buenavista", "Gasan", "Mogpog", "Santa Cruz", "Torrijos"],
            "Occidental Mindoro": ["Abra de Ilog", "Calintaan", "Looc", "Lubang", "Magsaysay", "Mamburao", "Paluan", "Rizal", "Sablayan", "San Jose", "Santa Cruz"],
            "Oriental Mindoro": ["Baco", "Bansud", "Bulalacao", "Calapan", "Gloria", "Mansalay", "Naujan", "Pinamalayan", "Pola", "Puerto Galera", "Roxas", "San Teodoro", "Socorro", "Victoria"],
            "Palawan": ["Aborlan", "Balabac", "Bataraza", "Brooke's Point", "Coron", "Culion", "Cuyo", "El Nido", "Linapacan", "Narra", "Puerto Princesa", "Quezon", "Rizal", "Roxas", "San Vicente", "Sofronio Española", "Taytay"],
            "Romblon": ["Alcantara", "Banton", "Cajidiocan", "Calatrava", "Ferrol", "Looc", "Odiongan", "Romblon", "San Agustin", "San Andres", "San Fernando", "Santa Fe", "Santa Maria"]
        }
    },


  "Region V": {
        provinces: ["Albay", "Camarines Norte", "Camarines Sur", "Catanduanes", "Masbate", "Sorsogon"],
        cities: {
            "Albay": ["Bacacay", "Camalig", "Daraga", "Guinobatan", "Jovellar", "Legazpi", "Libon", "Ligao", "Malilipot", "Malinao", "Manito", "Oas", "Pio Duran", "Polangui", "Rapu-Rapu", "Santo Domingo", "Tabaco", "Tiwi"],
            "Camarines Norte": ["Basud", "Capalonga", "Daet", "Jose Panganiban", "Labo", "Mercedes", "Paracale", "San Lorenzo Ruiz", "San Vicente", "Santa Elena", "Talisay", "Vinzons"],
            "Camarines Sur": ["Baao", "Balatan", "Bato", "Bombon", "Buhi", "Bula", "Cabusao", "Calabanga", "Camaligan", "Canaman", "Caramoan", "Del Gallego", "Gainza", "Garchitorena", "Goa", "Iriga", "Lagonoy", "Libmanan", "Lupi", "Magarao", "Milaor", "Minalabac", "Nabua", "Naga", "Ocampo", "Pamplona", "Pasacao", "Pili", "Presentacion", "Ragay", "Sagñay", "San Fernando", "San Jose", "Sipocot", "Siruma", "Tigaon", "Tinambac"],
            "Catanduanes": ["Bagamanoc", "Baras", "Bato", "Caramoran", "Gigmoto", "Pandan", "Panganiban", "San Andres", "San Miguel", "Viga", "Virac"],
            "Masbate": ["Aroroy", "Baleno", "Balud", "Batuan", "Cataingan", "Cawayan", "Claveria", "Dimasalang", "Esperanza", "Mandaon", "Masbate City", "Milagros", "Mobo", "Monreal", "Palanas", "Pio V. Corpuz", "Placer", "San Fernando", "San Jacinto", "San Pascual", "Uson"],
            "Sorsogon": ["Barcelona", "Bulan", "Bulusan", "Casiguran", "Castilla", "Donsol", "Gubat", "Irosin", "Juban", "Magallanes", "Matnog", "Pilar", "Prieto Diaz", "Santa Magdalena", "Sorsogon City"]
        }
    },

  "Region VI": {
        provinces: ["Aklan", "Antique", "Capiz", "Guimaras", "Iloilo", "Negros Occidental"],
        cities: {
            "Aklan": ["Altavas", "Balete", "Banga", "Batan", "Ibajay", "Kalibo", "Lezo", "Libacao", "Madalag", "Makato", "Malay", "Malinao", "Nabas", "New Washington", "Numancia", "Tangalan"],
            "Antique": ["Anini-y", "Barbaza", "Belison", "Bugasong", "Caluya", "Culasi", "Hamtic", "Laua-an", "Libertad", "Pandan", "Patnongon", "San Jose de Buenavista", "San Remigio", "Sebaste", "Sibalom", "Tibiao", "Tobias Fornier", "Valderrama"],
            "Capiz": ["Cuartero", "Dao", "Dumalag", "Dumarao", "Ivisan", "Jamindan", "Maayon", "Mambusao", "Panay", "Panitan", "Pilar", "Pontevedra", "President Roxas", "Roxas City", "Sapian", "Sigma", "Tapaz"],
            "Guimaras": ["Buenavista", "Jordan", "Nueva Valencia", "San Lorenzo", "Sibunag"],
            "Iloilo": ["Ajuy", "Alimodian", "Anilao", "Badiangan", "Balasan", "Banate", "Barotac Nuevo", "Barotac Viejo", "Batad", "Bingawan", "Cabatuan", "Calinog", "Carles", "Concepcion", "Dingle", "Dumangas", "Estancia", "Guimbal", "Igbaras", "Iloilo City", "Janiuay", "Lambunao", "Leganes", "Leon", "Maasin", "Miagao", "Mina", "New Lucena", "Oton", "Passi City", "Pavia", "Pototan", "San Dionisio", "San Enrique", "San Joaquin", "San Miguel", "San Rafael", "Santa Barbara", "Sara", "Tigbauan", "Tubungan", "Zarraga"],
            "Negros Occidental": ["Bacolod City", "Bago City", "Cadiz City", "Escalante City", "Himamaylan City", "Kabankalan City", "La Carlota City", "Sagay City", "San Carlos City", "Silay City", "Sipalay City", "Talisay City", "Victorias City", "Calatrava", "Candoni", "Enrique B. Magalona", "Hinigaran", "Hinoba-an", "Ilog", "Isabela", "La Castellana", "Manapla", "Moises Padilla", "Murcia", "Pontevedra", "Pulupandan", "Salvador Benedicto", "San Enrique", "Toboso", "Valladolid"]
        }
    },

  "Region VII": {
        provinces: ["Bohol", "Cebu", "Negros Oriental", "Siquijor"],
        cities: {
            "Bohol": ["Alburquerque", "Alicia", "Anda", "Antequera", "Baclayon", "Batuan", "Bilar", "Candijay", "Carmen", "Catigbian", "Clarin", "Dauis", "Dimiao", "Duero", "Garcia Hernandez", "Getafe", "Guindulman", "Inabanga", "Jagna", "Lila", "Loboc", "Loon", "Mabini", "Maribojoc", "Panglao", "Pilar", "Sagbayan", "San Isidro", "San Miguel", "Sevilla", "Sierra Bullones", "Sikatuna", "Tagbilaran", "Talibon", "Trinidad", "Tubigon", "Ubay", "Valencia"],
            "Cebu": ["Balamban", "Bantayan", "Barili", "Consolacion", "Cordova", "Danao", "Lapu-Lapu", "Mandaue", "Naga", "Talisay", "Toledo"],
            "Negros Oriental": ["Bayawan", "Canlaon", "Dumaguete", "Guihulngan", "Tanjay"],
            "Siquijor": ["Enrique Villanueva", "Larena", "Lazi", "Maria", "San Juan", "Siquijor"]
        }
    },

  "Region VIII": {
        provinces: ["Biliran", "Eastern Samar", "Leyte", "Northern Samar", "Samar", "Southern Leyte"],
        cities: {
            "Biliran": ["Almeria", "Biliran", "Cabucgayan", "Caibiran", "Culaba", "Kawayan", "Maripipi", "Naval"],
            "Eastern Samar": ["Arteche", "Balangiga", "Balangkayan", "Borongan City", "Can-Avid", "Dolores", "General MacArthur", "Giporlos", "Guiuan", "Hernani", "Jipapad", "Lawaan", "Llorente", "Maslog", "Maydolong", "Oras", "Quinapondan", "Salcedo", "San Julian", "San Policarpo", "Sulat", "Taft"],
            "Leyte": ["Abuyog", "Alangalang", "Albuera", "Babatngon", "Barugo", "Baybay City", "Burauen", "Calubian", "Capoocan", "Carigara", "Dagami", "Dulag", "Hilongos", "Hindang", "Inopacan", "Isabel", "Jaro", "Javier", "Julita", "Kananga", "La Paz", "Leyte", "MacArthur", "Mahaplag", "Matag-ob", "Matalom", "Mayorga", "Merida", "Ormoc City", "Palo", "Palompon", "Pastrana", "San Isidro", "San Miguel", "Santa Fe", "Tabango", "Tabontabon", "Tanauan", "Tolosa", "Tunga"],
            "Northern Samar": ["Allen", "Biri", "Bobon", "Capul", "Catarman", "Catubig", "Gamay", "Laoang", "Lapinig", "Las Navas", "Lavezares", "Lope de Vega", "Mapanas", "Mondragon", "Palapag", "Pambujan", "Rosario", "San Antonio", "San Isidro", "San Jose", "San Roque", "San Vicente", "Silvino Lobos"],
            "Samar": ["Almagro", "Basey", "Calbayog City", "Calbiga", "Daram", "Gandara", "Hinabangan", "Jiabong", "Marabut", "Matuguinao", "Motiong", "Paranas", "Pinabacdao", "San Jorge", "San Jose de Buan", "Santa Margarita", "Santa Rita", "Santo Niño", "Tagapul-an", "Talalora", "Tarangnan", "Villareal", "Zumarraga"],
            "Southern Leyte": ["Anahawan", "Hinunangan", "Hinundayan", "Libagon", "Liloan", "Limasawa", "Maasin City", "Macrohon", "Malitbog", "Padre Burgos", "Pintuyan", "San Francisco", "San Juan", "San Ricardo", "Silago", "Sogod", "St. Bernard", "Tomas Oppus"]
        }
    },

  "Region IX": {
        provinces: ["Zamboanga del Norte", "Zamboanga del Sur", "Zamboanga Sibugay"],
        cities: {
            "Zamboanga del Norte": ["City of Dapitan", "City of Dipolog", "Bacungan (Leon T. Postigo)", "Baliguian", "Godod", "Gutalac", "Jose Dalman (Ponot)", "Kalawit", "Katipunan", "La Libertad", "Labason", "Liloy", "Manukan", "Mutia", "Piñan (New Piñan)", "Polanco", "Pres. Manuel A. Roxas", "Rizal", "Salug", "Sergio Osmeña Sr.", "Siayan", "Sibuco", "Sibutad", "Sindangan", "Siocon", "Sirawai", "Tampilisan"],
            "Zamboanga del Sur": ["City of Pagadian", "Aurora", "Bayog", "Dimataling", "Dinas", "Dumalinao", "Dumingag", "Guipos", "Josefina", "Kumalarang", "Lakewood", "Lapuyan", "Mahayag", "Margosatubig", "Midsalip", "Molave", "Pitogo", "Ramon Magsaysay (Liargo)", "San Miguel", "San Pablo", "Sominot (Don Mariano Marcos)", "Tabina", "Tambulig", "Tigbao", "Tukuran", "Vincenzo A. Sagun"],
            "Zamboanga Sibugay": ["Ipil", "Alicia", "Buug", "Diplahan", "Imelda", "Kabasalan", "Mabuhay", "Malangas", "Naga", "Olutanga", "Payao", "Roseller Lim", "Siay", "Talusan", "Titay", "Tungawan"]
        }
    },

  "Region X": {
        provinces: ["Bukidnon", "Camiguin", "Lanao del Norte", "Misamis Occidental", "Misamis Oriental"],
        cities:  {
            "Bukidnon": ["Baungon", "Cabanglasan", "Damulog", "Dangcagan", "Don Carlos", "Impasug-Ong", "Kadingilan", "Kalilangan", "Kibawe", "Lantapan", "Libona", "Malaybalay City", "Manolo Fortich", "Maramag", "Pangantucan", "Quezon", "San Fernando", "Sumilao", "Talakag", "Valencia City"],
            "Camiguin": ["Catarman", "Guinsiliban", "Mahinog", "Mambajao", "Sagay"],
            "Lanao del Norte": ["Bacolod", "Baloi", "Baroy", "Kapatagan", "Kauswagan", "Kolambugan", "Lala", "Linamon", "Magsaysay", "Maigo", "Munai", "Nunungan", "Pantao Ragat", "Pantar", "Poona Piagapo", "Salvador", "Sapad", "Sultan Naga Dimaporo", "Tagoloan", "Tangcal", "Tubod"],
            "Misamis Occidental": ["Aloran", "Baliangao", "Bonifacio", "Calamba", "Clarin", "Concepcion", "Jimenez", "Lopez Jaena", "Oroquieta City", "Ozamis City", "Panaon", "Plaridel", "Sapang Dalaga", "Sinacaban", "Tangub City", "Tudela"],
            "Misamis Oriental": ["Alubijid", "Balingasag", "Balingoan", "Binuangan", "Cagayan de Oro City", "El Salvador City", "Gingoog City", "Gitagum", "Initao", "Jasaan", "Kinoguitan", "Lagonglong", "Laguindingan", "Libertad", "Lugait", "Magsaysay (Linugos)", "Manticao", "Medina", "Naawan", "Opol", "Salay", "Sugbongcogon", "Tagoloan", "Talisayan", "Villanueva"]
        }
    },


  "Region XI": {
        provinces: ["Davao de Oro", "Davao del Norte", "Davao del Sur", "Davao Occidental", "Davao Oriental"],
        cities: {
            "Davao de Oro": ["Compostela", "Laak (San Vicente)", "Mabini (Doña Alicia)", "Maco", "Maragusan (San Mariano)", "Mawab", "Monkayo", "Montevista", "Nabunturan (Capital)", "New Bataan", "Pantukan"],
            "Davao del Norte": ["Asuncion (Saug)", "Braulio E. Dujali", "Carmen", "City of Panabo", "City of Tagum (Capital)", "Island Garden City of Samal", "Kapalong", "New Corella", "San Isidro", "Santo Tomas", "Talaingod"],
            "Davao del Sur": ["Bansalan", "City of Digos (Capital)", "Hagonoy", "Kiblawan", "Magsaysay", "Malalag", "Matanao", "Padada", "Santa Cruz", "Sulop"],
            "Davao Occidental": ["Don Marcelino", "Jose Abad Santos (Trinidad)", "Malita (Capital)", "Santa Maria", "Sarangani"],
            "Davao Oriental": ["Baganga", "Banaybanay", "Boston", "Caraga", "Cateel", "City of Mati (Capital)", "Governor Generoso", "Lupon", "Manay", "San Isidro", "Tarragona"]
        }
    },


  "Region XII": {
        provinces: ["Cotabato", "Sarangani", "South Cotabato", "Sultan Kudarat"],
        cities: {
            "Cotabato": ["Alamada", "Aleosan", "Antipas", "Arakan", "Carmen", "City of Kidapawan (Capital)", "Kabacan", "Libungan", "M'lang", "Magpet", "Makilala", "Matalam", "Midsayap", "Pigkawayan", "Pikit", "President Roxas", "Tulunan"],
            "Sarangani": ["Alabel (Capital)", "Glan", "Kiamba", "Maasim", "Maitum", "Malapatan", "Malungon"],
            "South Cotabato": ["Banga", "City of Koronadal (Capital)", "Lake Sebu", "Norala", "Polomolok", "Santo Niño", "Surallah", "T'boli", "Tampakan", "Tantangan", "Tupi"],
            "Sultan Kudarat": ["Bagumbayan", "Columbio", "Esperanza", "Isulan (Capital)", "Kalamansig", "Lambayong (Mariano Marcos)", "Lebak", "Lutayan", "Palimbang", "City of Tacurong", "Sen. Ninoy Aquino"]
        }
    },


  "Region XIII": {
        provinces: ["Agusan del Norte", "Agusan del Sur", "Dinagat Islands", "Surigao del Norte", "Surigao del Sur"],
        cities: {
            "Agusan del Norte": ["Buenavista", "Carmen", "City of Butuan", "City of Cabadbaran", "Jabonga", "Kitcharao", "Las Nieves", "Magallanes", "Nasipit", "Remedios T. Romualdez", "Santiago", "Tubay"],
            "Agusan del Sur": ["Bayugan City", "Bunawan", "Esperanza", "La Paz", "Loreto", "Prosperidad", "Rosario", "San Francisco", "San Luis", "Santa Josefa", "Talacogon", "Trento", "Veruela"],
            "Dinagat Islands": ["Basilisa", "Cagdianao", "Dinagat", "Libjo", "San Jose", "Tubajon"],
            "Surigao del Norte": ["Alegria", "Bacuag", "Burgos", "Claver", "Dapa", "Del Carmen", "General Luna", "Gigaquit", "Mainit", "Malimono", "Pilar", "Placer", "San Benito", "San Isidro", "Santa Monica", "Sison", "Socorro", "Surigao City", "Tagana-An", "Tubod"],
            "Surigao del Sur": ["Barobo", "Bayabas", "Bislig City", "Cagwait", "Cantilan", "Carrascal", "Cortes", "Hinatuan", "Lanuza", "Lianga", "Lingig", "Madrid", "Marihatag", "San Agustin", "San Miguel", "Tagbina", "Tago", "Tandag City"]
        }
    },

  "BARMM": {
    provinces: ["Basilan", "Lanao del Sur", "Maguindanao del Norte", "Maguindanao del Sur", "Sulu", "Tawi-Tawi"],
    cities: {
        "Basilan": ["Akbar", "Al-Barka", "Hadji Mohammad Ajul", "Hadji Muhtamad", "Isabela City", "Lamitan City", "Lantawan", "Maluso", "Sumisip", "Tabuan-Lasa", "Tipo-Tipo", "Tuburan", "Ungkaya Pukan"],
        "Lanao del Sur": ["Amai Manabilang (Bumbaran)", "Bacolod-Kalawi (Bacolod Grande)", "Balabagan", "Balindong (Watu)", "Bayang", "Binidayan", "Buadiposo-Buntong", "Bubong", "Butig", "Calanogas", "City of Marawi (Capital)", "Ditsaan-Ramain", "Ganassi", "Kapai", "Kapatagan", "Lumba-Bayabao (Maguing)", "Lumbaca-Unayan", "Lumbatan", "Lumbayanague", "Madalum", "Madamba", "Maguing", "Malabang", "Marantao", "Marogong", "Masiu", "Mulondo", "Pagayawan (Tatarikan)", "Piagapo", "Picong (Sultan Gumander)", "Poona Bayabao (Gata)", "Pualas", "Saguiaran", "Sultan Dumalondong", "Tagoloan II", "Tamparan", "Taraka", "Tubaran", "Tugaya", "Wao"],
        "Maguindanao del Norte": ["Barira", "Buldon", "Datu Blah T. Sinsuat", "Datu Odin Sinsuat (Dinaig)", "Kabuntalan (Tumbao)", "Matanog", "Northern Kabuntalan", "Parang", "Sultan Kudarat (Nuling)", "Sultan Mastura", "Upi"],
        "Maguindanao del Sur": ["Ampatuan", "Buluan", "City of Cotabato", "Datu Abdullah Sangki", "Datu Anggal Midtimbang", "Datu Hoffer Ampatuan", "Datu Paglas", "Datu Piang", "Datu Salibo", "Datu Saudi-Ampatuan", "Datu Unsay", "Gen. S.K. Pendatun", "Guindulungan", "Mamasapano", "Mangudadatu", "Pagagawan", "Pagalungan", "Paglat", "Pandag", "Rajah Buayan", "Shariff Aguak (Maganoy) (Capital)", "Shariff Saydona Mustapha", "South Upi", "Sultan Sa Barongis (Lambayong)", "Talayan", "Talitay"],
        "Sulu": ["Hadji Panglima Tahil (Marunggas)", "Indanan", "Jolo (Capital)", "Kalingalan Caluang", "Lugus", "Luuk", "Maimbung", "Old Panamao", "Omar", "Pandami", "Panglima Estino (New Panamao)", "Parang", "Pata", "Patikul", "Siasi", "Talipao", "Tapul"],
        "Tawi-Tawi": ["Bongao (Capital)", "Languyan", "Mapun (Cagayan De Tawi-Tawi)", "Panglima Sugala (Balimbing)", "Pangutaran", "Sapa-Sapa", "Sibutu", "Simunul", "Sitangkai", "South Ubian", "Tandubas", "Turtle Islands"]
    }
}
};

function updatelocations() {
  const region = document.getElementById("region").value;
  const provinceSelect = document.getElementById("province");
  const citySelect = document.getElementById("city");

  // Reset downstream selects
  provinceSelect.innerHTML = '<option value="">-- Select Province --</option>';
  citySelect.innerHTML = '<option value="">-- Select City --</option>';
  citySelect.disabled = true;

  if (!region || !dropdownoption[region]) {
    provinceSelect.disabled = true;
    return;
  }

  // Enable and populate provinces
  provinceSelect.disabled = false;
  dropdownoption[region].provinces.forEach(prov => {
    const opt = document.createElement("option");
    opt.value = prov;
    opt.textContent = prov;
    provinceSelect.appendChild(opt);
  });

  // Add province change listener
  provinceSelect.onchange = function() {
    const selectedProvince = this.value;
    citySelect.innerHTML = '<option value="">-- Select City --</option>';
    
    if (selectedProvince && dropdownoption[region].cities[selectedProvince]) {
      citySelect.disabled = false;
      dropdownoption[region].cities[selectedProvince].forEach(city => {
        const opt = document.createElement("option");
        opt.value = city;
        opt.textContent = city;
        citySelect.appendChild(opt);
      });
    } else {
      citySelect.disabled = true;
    }
  };
}

//end of death certificate

//correction
// Correction form functionality
    const correctionForm = document.getElementById('correctionForm');
    const searchSection = document.getElementById('searchSection');
    const referenceInput = document.getElementById('referenceNumber');

    if (correctionForm && searchSection) {
        // Function to handle reference number search
        window.handleReferenceSearch = function() {
            const refNumber = referenceInput.value;
            if (refNumber === 'CR24001234') {
                correctionForm.style.display = 'block';
                searchSection.style.display = 'none';
            } else {
                alert('Invalid reference number. Please try again.');
            }
        };

        // Function to handle correction form submission
        window.handleCorrectionSubmit = function(event) {
            event.preventDefault();
            
            // Get form values
            const certificateType = document.getElementById('certificateType').value;
            const correctionDetails = document.getElementById('correctionDetails').value;
            const requesterName = document.getElementById('requesterName').value;
            const relationship = document.getElementById('relationship').value;
            const contactNumber = document.getElementById('contactNumber').value;
            const email = document.getElementById('email').value;

            // Basic validation
            if (!certificateType || !correctionDetails || !requesterName || !relationship || !contactNumber || !email) {
                alert('Please fill in all required fields.');
                return;
            }

            // Show success message
            alert('Your request has been submitted successfully!\nReference Number: CR24001234');
            
            // Redirect to thank you page
            window.location.href = 'thankyou(correction).html';
        };
    }

//receipt
const receiptDatabase = {
    'BC2024001234': {
        type: 'Birth Certificate',
        amount: '₱155.00',
        date: '2024-02-15'
    },
    'MC2024005678': {
        type: 'Marriage Certificate',
        amount: '₱155.00',
        date: '2024-02-14'
    },
    'DC2024009012': {
        type: 'Death Certificate',
        amount: '₱155.00',
        date: '2024-02-13'
    },
    'CR2024001234': {
        type: 'Correction Request',
        amount: '₱105.00',
        date: '2024-02-12'
    }
};

function validateReferenceNumber(refNumber) {
    // Check if it matches the expected format: 2 letters + 4 digits + 6 digits
    // Example: BC2024005678, MC2024003456, etc.
    const pattern = /^(BC|MC|DC|CR)20\d{8}$/;
    return pattern.test(refNumber);
}

function showError(message) {
    const input = document.getElementById('referenceNumber');
    const errorMessage = document.getElementById('errorMessage');
    const resultContainer = document.getElementById('receiptResult');

    // Add error class to input
    input.classList.add('error');
    
    // Show error message
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    
    // Hide any previous results
    resultContainer.classList.remove('show');

    // Remove error state after 5 seconds
    setTimeout(() => {
        input.classList.remove('error');
        errorMessage.classList.remove('show');
    }, 5000);
}

function searchReceipt() {
    const referenceNumber = document.getElementById('referenceNumber').value.trim();
    const resultContainer = document.getElementById('receiptResult');
    const errorMessage = document.getElementById('errorMessage');
    
    // Clear previous error states
    errorMessage.classList.remove('show');
    document.getElementById('referenceNumber').classList.remove('error');

    // Validate empty input
    if (!referenceNumber) {
        showError('Please enter a reference number.');
        return;
    }

    // Validate format
    if (!validateReferenceNumber(referenceNumber)) {
        showError('Invalid reference number format. Please use the format: XX2024XXXXXX (e.g., BC2024005678)');
        return;
    }

    const receipt = receiptDatabase[referenceNumber];
    
    // Check if receipt exists
    if (!receipt) {
        showError('Receipt not found. Please check your reference number and try again.');
        return;
    }

    // Display receipt details
    resultContainer.innerHTML = `
        <div class="receipt-details">
            <h3>Receipt Details</h3>
            <p>Reference Number: <strong>${referenceNumber}</strong></p>
            <p>Type: <strong>${receipt.type}</strong></p>
            <p class="amount">Amount: ${receipt.amount}</p>
            <p class="date">Date: ${receipt.date}</p>
        </div>
    `;
    resultContainer.classList.add('show');

    /* Simulate download start after a short delay
    setTimeout(() => {
        // Create receipt content
        const receiptContent = `
            Civil Registry Information System
            ================================
            Receipt Details
            ---------------
            Reference Number: ${referenceNumber}
            Type: ${receipt.type}
            Amount: ${receipt.amount}
            Date: ${receipt.date}
            ================================
            This is an official receipt.
            Please keep this for your records.
        `;
        
        // Create a Blob and download it
        const blob = new Blob([receiptContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `receipt_${referenceNumber}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }, 1000); */
}





//admin
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registryForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const serviceType = form.dataset.service;
    const prefixMap = {
      birth: 'BC',
      marriage: 'MC',
      death: 'DC',
      correction: 'CO'
    };

    const prefix = prefixMap[serviceType] || 'XX';
    const fname = document.getElementById('fname').value.trim();
    const mname = document.getElementById('mname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const fullName = `${fname} ${mname} ${lname}`.trim();

    const year = new Date().getFullYear();
    const random = Math.floor(100000 + Math.random() * 900000);
    const refNumber = `${prefix}${year}${random}`;
    const dateSubmitted = new Date().toISOString().split('T')[0];

    const newEntry = {
      type: refNumber,
      name: fullName,
      date: dateSubmitted
    };

    const storageKey = `${serviceType}Data`;
    const registryData = JSON.parse(localStorage.getItem(storageKey) || '[]');
    registryData.push(newEntry);
    localStorage.setItem(storageKey, JSON.stringify(registryData));

    window.location.href = `${serviceType}2.html`;
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const tableBody = document.querySelector('#adminTable tbody');
  if (!tableBody) return;

  const page = location.pathname.toLowerCase();

let storageKey = 'registryData';

const pageName = location.pathname.toLowerCase();

if (pageName.includes('admin-birth')) {
  storageKey = 'birthData';
} else if (pageName.includes('admin-marriage')) {
  storageKey = 'marriageData';
} else if (pageName.includes('admin-death')) {
  storageKey = 'deathData';
} else if (pageName.includes('admin-correction')) {
  storageKey = 'correctionData';
}

  function loadData() {
    const data = JSON.parse(localStorage.getItem(storageKey) || '[]');
    tableBody.innerHTML = '';

    data.forEach((item, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.type}</td>
        <td>${item.name}</td>
        <td>${item.date}</td>
        <td>
          <button onclick="toggleEdit(this, ${index})">Edit</button>
          <button onclick="deleteEntry(${index})">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  window.toggleEdit = function (button, index) {
    const row = tableBody.children[index];
    const isEditing = button.textContent === 'Save';

    const data = JSON.parse(localStorage.getItem(storageKey) || '[]');

    if (isEditing) {
      data[index] = {
        type: row.children[0].textContent,
        name: row.children[1].textContent,
        date: row.children[2].textContent
      };
      localStorage.setItem(storageKey, JSON.stringify(data));
      row.children[0].setAttribute('contenteditable', false);
      row.children[1].setAttribute('contenteditable', false);
      row.children[2].setAttribute('contenteditable', false);
      button.textContent = 'Edit';
      alert('Changes saved!');
    } else {
      row.children[0].setAttribute('contenteditable', true);
      row.children[1].setAttribute('contenteditable', true);
      row.children[2].setAttribute('contenteditable', true);
      button.textContent = 'Save';
    }
  };

  window.deleteEntry = function (index) {
    const data = JSON.parse(localStorage.getItem(storageKey) || '[]');
    data.splice(index, 1);
    localStorage.setItem(storageKey, JSON.stringify(data));
    loadData();
  };

  loadData();
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
  document.getElementById('thankyou-cenomar-all').textContent = localStorage.getItem('thankyou_cenomar_count') || '0';

  document.getElementById('thankyou-birth-today').textContent = localStorage.getItem('thankyou_birth_today_' + getTodayStr()) || '0';
  document.getElementById('thankyou-marriage-today').textContent = localStorage.getItem('thankyou_marriage_today_' + getTodayStr()) || '0';
  document.getElementById('thankyou-death-today').textContent = localStorage.getItem('thankyou_death_today_' + getTodayStr()) || '0';
  document.getElementById('thankyou-cenomar-today').textContent = localStorage.getItem('thankyou_cenomar_today_' + getTodayStr()) || '0';
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
  document.getElementById('thankyou-cenomar-all').textContent = localStorage.getItem('thankyou_cenomar_count') || '0';

  document.getElementById('thankyou-birth-today').textContent = localStorage.getItem('thankyou_birth_today_' + getTodayStr()) || '0';
  document.getElementById('thankyou-marriage-today').textContent = localStorage.getItem('thankyou_marriage_today_' + getTodayStr()) || '0';
  document.getElementById('thankyou-death-today').textContent = localStorage.getItem('thankyou_death_today_' + getTodayStr()) || '0';
  document.getElementById('thankyou-cenomar-all').textContent = localStorage.getItem('thankyou_cenomar_today_' + getTodayStr()) || '0';
});
