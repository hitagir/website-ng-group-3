// Payment Page JavaScript

let selectedPaymentMethod = null;

// Initialize payment page
document.addEventListener('DOMContentLoaded', function() {
    initializePaymentPage();
    // Set up payment method card click listeners
    document.querySelectorAll('.payment-method-card').forEach(card => {
        card.addEventListener('click', function() {
            selectPaymentMethod(this.dataset.method);
        });
    });
});

function initializePaymentPage() {
    // Add event listeners
    document.getElementById('paymentForm').addEventListener('submit', handlePaymentSubmission);
    document.getElementById('closePaymentModal').addEventListener('click', closePaymentModal);
    document.getElementById('cancelPaymentBtn').addEventListener('click', closePaymentModal);
    document.getElementById('confirmPaymentBtn').addEventListener('click', confirmPayment);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('paymentModal');
        if (event.target === modal) {
            closePaymentModal();
        }
    });
}

// Payment method selection
function selectPaymentMethod(method) {
    selectedPaymentMethod = method;
    // Remove selected class from all cards
    document.querySelectorAll('.payment-method-card').forEach(card => {
        card.classList.remove('selected');
    });
    // Add selected class to the correct card
    const selectedCard = document.querySelector(`.payment-method-card[data-method="${method}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
    // Show payment form
    showPaymentForm(method);
}

function showPaymentForm(method) {
    const formSection = document.getElementById('paymentFormSection');
    const paymentMethodInput = document.getElementById('paymentMethod');
    const proofUploadGroup = document.getElementById('proofUploadGroup');
    const bankDetailsGroup = document.getElementById('bankDetailsGroup');
    const otcDetailsGroup = document.getElementById('otcDetailsGroup');
    
    // Set payment method
    paymentMethodInput.value = getPaymentMethodDisplayName(method);
    
    // Show/hide relevant sections based on payment method
    proofUploadGroup.style.display = 'none';
    bankDetailsGroup.style.display = 'none';
    otcDetailsGroup.style.display = 'none';
    
    switch(method) {
        case 'gcash':
        case 'paymaya':
            proofUploadGroup.style.display = 'block';
            break;
        case 'bank':
            proofUploadGroup.style.display = 'block';
            bankDetailsGroup.style.display = 'block';
            break;
        case 'otc':
            otcDetailsGroup.style.display = 'block';
            break;
    }
    
    // Show form section
    formSection.style.display = 'block';
    
    // Scroll to form
    formSection.scrollIntoView({ behavior: 'smooth' });
}

function getPaymentMethodDisplayName(method) {
    const methodNames = {
        'gcash': 'GCash',
        'paymaya': 'PayMaya',
        'bank': 'Bank Transfer',
        'otc': 'Municipal Cashier (Over-the-Counter)'
    };
    return methodNames[method] || method;
}

function cancelPayment() {
    selectedPaymentMethod = null;
    
    // Remove selected class from all cards
    document.querySelectorAll('.payment-method-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Hide form section
    document.getElementById('paymentFormSection').style.display = 'none';
    
    // Reset form
    document.getElementById('paymentForm').reset();
}

// Handle payment form submission
function handlePaymentSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const paymentData = {
        referenceNumber: formData.get('referenceNumber'),
        amount: formData.get('amount'),
        paymentMethod: formData.get('paymentMethod'),
        proofOfPayment: formData.get('proofOfPayment')
    };
    
    // Validate form data
    if (!validatePaymentData(paymentData)) {
        return;
    }
    
    // Show payment modal
    showPaymentModal(paymentData);
}

function validatePaymentData(data) {
    if (!data.referenceNumber || data.referenceNumber.trim() === '') {
        showError('Please enter a valid reference number.');
        return false;
    }
    
    if (!data.amount || parseFloat(data.amount) <= 0) {
        showError('Please enter a valid amount.');
        return false;
    }
    
    if (!data.paymentMethod) {
        showError('Please select a payment method.');
        return false;
    }
    
    // Check if proof of payment is required but not provided
    if ((data.paymentMethod === 'GCash' || data.paymentMethod === 'PayMaya' || data.paymentMethod === 'Bank Transfer')) {
        if (!data.proofOfPayment || data.proofOfPayment.size === 0) {
            showError('Please upload proof of payment. This is required for online payments and bank transfers.');
            return false;
        }
        
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
        if (!allowedTypes.includes(data.proofOfPayment.type)) {
            showError('Please upload a valid file type. Accepted formats: JPG, PNG, GIF, or PDF.');
            return false;
        }
        
        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (data.proofOfPayment.size > maxSize) {
            showError('File size too large. Please upload a file smaller than 5MB.');
            return false;
        }
    }
    
    return true;
}

function showError(message) {
    showPaymentModal({
        type: 'error',
        message: message
    });
}

// Payment modal functions
function showPaymentModal(data) {
    const modal = document.getElementById('paymentModal');
    const modalTitle = document.getElementById('paymentModalTitle');
    const modalBody = document.getElementById('paymentModalBody');
    const confirmBtn = document.getElementById('confirmPaymentBtn');
    const cancelBtn = document.getElementById('cancelPaymentBtn');
    
    if (data.type === 'error') {
        // Show error modal
        modalTitle.textContent = 'Error';
        modalBody.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <div style="color: #dc3545; font-size: 3rem; margin-bottom: 15px;">⚠️</div>
                <p style="color: #721c24; font-size: 1.1rem;">${data.message}</p>
            </div>
        `;
        confirmBtn.style.display = 'none';
        cancelBtn.textContent = 'OK';
    } else {
        // Show payment confirmation modal
        modalTitle.textContent = 'Confirm Payment';
        modalBody.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <div style="color: #28a745; font-size: 3rem; margin-bottom: 15px;">💳</div>
                <h4 style="color: #2c3e50; margin-bottom: 20px;">Payment Summary</h4>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: left;">
                    <p><strong>Reference Number:</strong> ${data.referenceNumber}</p>
                    <p><strong>Amount:</strong> ₱${parseFloat(data.amount).toFixed(2)}</p>
                    <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
                    <p><strong>Processing Fee:</strong> ₱0.00</p>
                    <hr style="margin: 15px 0;">
                    <p><strong>Total Amount:</strong> ₱${parseFloat(data.amount).toFixed(2)}</p>
                </div>
                <p style="margin-top: 20px; color: #6c757d; font-size: 0.9rem;">
                    By confirming, you agree to proceed with the payment using the selected method.
                </p>
            </div>
        `;
        confirmBtn.style.display = 'inline-block';
        cancelBtn.textContent = 'Cancel';
    }
    
    modal.style.display = 'block';
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

function confirmPayment() {
    const modalBody = document.getElementById('paymentModalBody');
    // Retrieve payment data from modal (hacky, but works for this context)
    const refMatch = modalBody.innerHTML.match(/Reference Number:<\/strong> ([^<]+)/);
    const amtMatch = modalBody.innerHTML.match(/Amount:<\/strong> ₱([0-9.]+)/);
    const methodMatch = modalBody.innerHTML.match(/Payment Method:<\/strong> ([^<]+)/);
    let referenceNumber = refMatch ? refMatch[1] : '';
    let amount = amtMatch ? amtMatch[1] : '';
    let paymentMethod = methodMatch ? methodMatch[1] : '';
    // Save to localStorage
    if(referenceNumber && amount && paymentMethod) {
        const paymentData = {
            referenceNumber,
            amount,
            paymentMethod,
            date: new Date().toLocaleString(),
            status: 'processing' // default status
        };
        localStorage.setItem('payment_' + referenceNumber, JSON.stringify(paymentData));
    }
    // Show processing state
    modalBody.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div class="loading-spinner" style="margin: 0 auto 20px;"></div>
            <h4 style="color: #2c3e50; margin-bottom: 15px;">Processing Payment...</h4>
            <p style="color: #6c757d;">Please wait while we process your payment.</p>
        </div>
    `;
    setTimeout(() => {
        showPaymentSuccess();
    }, 3000);
}

function showPaymentSuccess() {
    const modalTitle = document.getElementById('paymentModalTitle');
    const modalBody = document.getElementById('paymentModalBody');
    const confirmBtn = document.getElementById('confirmPaymentBtn');
    const cancelBtn = document.getElementById('cancelPaymentBtn');
    // Retrieve last payment from localStorage for receipt
    let lastPayment = null;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('payment_')) {
            const data = JSON.parse(localStorage.getItem(key));
            if (!lastPayment || new Date(data.date) > new Date(lastPayment.date)) {
                lastPayment = data;
            }
        }
    }
    modalTitle.textContent = 'Payment Successful!';
    modalBody.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <div style="color: #28a745; font-size: 4rem; margin-bottom: 20px;">✅</div>
            <h4 style="color: #155724; margin-bottom: 15px;">Payment Completed</h4>
            <p style="color: #155724; margin-bottom: 20px;">Your payment has been successfully processed.</p>
            <div style="background: #d4edda; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 0; color: #155724;"><strong>Reference Number:</strong> ${lastPayment ? lastPayment.referenceNumber : ''}</p>
                <p style="margin: 0; color: #155724;"><strong>Payment Method:</strong> ${lastPayment ? lastPayment.paymentMethod : ''}</p>
                <p style="margin: 0; color: #155724;"><strong>Amount:</strong> ₱${lastPayment ? parseFloat(lastPayment.amount).toFixed(2) : ''}</p>
                <p style="margin: 0; color: #155724;"><strong>Date:</strong> ${lastPayment ? lastPayment.date : ''}</p>
            </div>
            <button id="downloadEReceiptBtn" style="margin-bottom: 15px; padding: 10px 24px; background: #007bff; color: #fff; border: none; border-radius: 6px; font-size: 1rem; cursor: pointer;">Download E-Receipt</button>
            <p style="color: #6c757d; font-size: 0.9rem;">You will receive a confirmation email shortly. You can track your payment status using the reference number.</p>
        </div>
    `;
    // Download e-receipt logic
    setTimeout(() => {
        const btn = document.getElementById('downloadEReceiptBtn');
        if (btn && lastPayment) {
            btn.onclick = function() {
                // Use jsPDF to generate PDF
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                doc.setFontSize(16);
                doc.text('Civil Registry Information System', 20, 20);
                doc.setFontSize(12);
                doc.text('===============================', 20, 30);
                doc.text('E-Receipt', 20, 40);
                doc.text('---------------', 20, 50);
                doc.text(`Reference Number: ${lastPayment.referenceNumber}`, 20, 60);
                doc.text(`Payment Method: ${lastPayment.paymentMethod}`, 20, 70);
                doc.text(`Amount: ₱${parseFloat(lastPayment.amount).toFixed(2)}`, 20, 80);
                doc.text(`Date: ${lastPayment.date}`, 20, 90);
                doc.text('===============================', 20, 100);
                doc.text('This is your official e-receipt. Please keep this for your records.', 20, 110);
                doc.save(`e-receipt_${lastPayment.referenceNumber}.pdf`);
            };
        }
    }, 100);
    confirmBtn.style.display = 'none';
    cancelBtn.textContent = 'Close';
    cancelBtn.onclick = function() {
        closePaymentModal();
        resetPaymentForm();
    };
}

function generateTransactionId() {
    return 'TXN' + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase();
}

function resetPaymentForm() {
    document.getElementById('paymentForm').reset();
    cancelPayment();
}

// Payment status checking
function checkPaymentStatus() {
    const referenceNumber = document.getElementById('paymentRef').value.trim();
    const resultsDiv = document.getElementById('paymentStatusResults');
    
    if (!referenceNumber) {
        showPaymentStatusResult('error', 'Please enter a reference number.');
        return;
    }
    
    // Show loading state
    resultsDiv.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <div class="loading-spinner" style="margin: 0 auto 10px;"></div>
            <p>Checking payment status...</p>
        </div>
    `;
    resultsDiv.className = 'status-results info';
    resultsDiv.style.display = 'block';
    
    // Simulate API call
    setTimeout(() => {
        const status = getMockPaymentStatus(referenceNumber);
        showPaymentStatusResult(status.type, status.message, status.data);
    }, 2000);
}

function getMockPaymentStatus(referenceNumber) {
    // Randomize status for demo
    const statuses = ['completed', 'processing', 'pending'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    // Try to get real payment data from localStorage first
    const stored = localStorage.getItem('payment_' + referenceNumber);
    if (stored) {
        const data = JSON.parse(stored);
        return {
            type: 'success',
            message: 'Payment Status Found',
            data: {
                status: randomStatus,
                amount: '₱' + parseFloat(data.amount).toFixed(2),
                date: data.date,
                method: data.paymentMethod
            }
        };
    }
    // Fallback to mock logic if not found
    // Mock payment status based on reference number
    const lastDigit = referenceNumber.slice(-1);
    
    // Create a completely deterministic payment method
    // Use the sum of all character codes in the reference number
    const charSum = referenceNumber.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const methodIndex = charSum % 4; // This ensures same reference = same method every time
    
    const methods = ['GCash', 'PayMaya', 'Bank Transfer', 'Municipal Cashier (Over-the-Counter)'];
    const paymentMethod = methods[methodIndex];
    
    // Debug logging to verify consistency
    console.log(`Reference: ${referenceNumber}, CharSum: ${charSum}, MethodIndex: ${methodIndex}, Method: ${paymentMethod}`);
    
    // Determine status based on last digit
    let status, amount, date;
    switch(lastDigit) {
        case '0':
        case '1':
            status = 'completed';
            amount = '₱150.00';
            date = '2024-01-15';
            break;
        case '2':
        case '3':
            status = 'processing';
            amount = '₱200.00';
            date = '2024-01-16';
            break;
        case '4':
        case '5':
            status = 'pending';
            amount = '₱100.00';
            date = '2024-01-17';
            break;
        default:
            return {
                type: 'error',
                message: 'No payment found with this reference number. Please check and try again.'
            };
    }
    
    return {
        type: 'success',
        message: 'Payment Status Found',
        data: {
            status: randomStatus,
            amount: amount,
            date: date,
            method: paymentMethod
        }
    };
}

function showPaymentStatusResult(type, message, data = null) {
    const resultsDiv = document.getElementById('paymentStatusResults');
    
    let html = '';
    
    if (type === 'success' && data) {
        const statusClass = `status-${data.status}`;
        const statusText = data.status.charAt(0).toUpperCase() + data.status.slice(1);
        
        html = `
            <div style="padding: 20px;">
                <h4 style="margin-bottom: 15px; color: #2c3e50;">Payment Details</h4>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                    <p><strong>Reference Number:</strong> ${document.getElementById('paymentRef').value}</p>
                    <p><strong>Amount:</strong> ${data.amount}</p>
                    <p><strong>Payment Method:</strong> ${data.method}</p>
                    <p><strong>Payment Date:</strong> ${data.date}</p>
                    <p><strong>Status:</strong> <span class="status-indicator ${statusClass}">${statusText}</span></p>
                </div>
                ${getStatusDescription(data.status)}
            </div>
        `;
    } else {
        html = `<p>${message}</p>`;
    }
    
    resultsDiv.innerHTML = html;
    resultsDiv.className = `status-results ${type}`;
    resultsDiv.style.display = 'block';
}

function getStatusDescription(status) {
    const descriptions = {
        'completed': '<p style="color: #155724; margin-top: 15px;"><strong>✅ Payment completed successfully.</strong> Your document request is being processed and will be ready for pickup within 3-5 business days.</p>',
        'processing': '<p style="color: #004085; margin-top: 15px;"><strong>⏳ Payment is being processed.</strong> Please allow 1-2 business days for the payment to be confirmed.</p>',
        'pending': '<p style="color: #856404; margin-top: 15px;"><strong>⏸️ Payment is pending verification.</strong> Please ensure you have uploaded proof of payment if required.</p>'
    };
    
    return descriptions[status] || '';
}

// Loading spinner CSS
const style = document.createElement('style');
style.textContent = `
    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #007bff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// File upload preview
document.getElementById('proofOfPayment')?.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const fileSize = file.size / 1024 / 1024; // Convert to MB
        
        if (fileSize > 5) {
            alert('File size must be less than 5MB');
            event.target.value = '';
            return;
        }
        
        // Show file info
        const fileInfo = document.createElement('div');
        fileInfo.style.cssText = 'margin-top: 10px; padding: 10px; background: #d4edda; border-radius: 5px; color: #155724;';
        fileInfo.innerHTML = `
            <strong>Selected file:</strong> ${file.name}<br>
            <small>Size: ${fileSize.toFixed(2)} MB</small>
        `;
        
        // Remove previous file info
        const prevInfo = event.target.parentNode.querySelector('div');
        if (prevInfo) {
            prevInfo.remove();
        }
        
        event.target.parentNode.appendChild(fileInfo);
    }
});

// Auto-generate reference number for demo purposes
document.getElementById('referenceNumber')?.addEventListener('focus', function() {
    if (!this.value) {
        this.value = 'REF' + Date.now().toString().slice(-8);
    }
});

// Amount validation
document.getElementById('amount')?.addEventListener('input', function() {
    const value = parseFloat(this.value);
    if (value < 0) {
        this.value = 0;
    }
});

// Test function to verify consistency
function testPaymentMethodConsistency() {
    const testRefs = ['REF12345670', 'REF12345671', 'REF12345672', 'REF12345673'];
    
    console.log('Testing payment method consistency:');
    testRefs.forEach(ref => {
        console.log(`\nTesting ${ref}:`);
        for (let i = 0; i < 3; i++) {
            const result = getMockPaymentStatus(ref);
            console.log(`  Attempt ${i + 1}: ${result.data.method}`);
        }
    });
}

// Run test when page loads (for debugging)
document.addEventListener('DOMContentLoaded', function() {
    // Uncomment the line below to test consistency
    // testPaymentMethodConsistency();
}); 