// ULTRA-STRICT FORM VALIDATION SYSTEM
// Civil Registry Information System

class UltraStrictValidator {
    constructor() {
        this.errors = [];
        this.errorElements = new Map();
        this.validFields = new Set();
        this.submitButton = null;
        this.form = null;
        this.errorSummary = null;
        
        this.init();
    }

    init() {
        // Find the form and submit button
        this.form = document.getElementById('registryForm') || document.querySelector('form');
        if (!this.form) {
            console.log('No form found for validation');
            return;
        }

        this.submitButton = this.form.querySelector('button[type="submit"], .btn-blue, input[type="submit"]');
        
        // Remove any existing submit event listeners
        this.removeExistingSubmitHandlers();
        
        // Create error summary element
        this.createErrorSummary();
        
        // Add required attributes to all fields
        this.addRequiredAttributes();
        
        // Set up validation for all fields
        this.setupFieldValidation();
        
        // Set up form submission
        this.setupFormSubmission();
        
        // Initial validation
        this.validateAllFields();
        
        console.log('UltraStrictValidator initialized for form:', this.form.id);
    }

    removeExistingSubmitHandlers() {
        // Clone the form to remove all event listeners
        const newForm = this.form.cloneNode(true);
        this.form.parentNode.replaceChild(newForm, this.form);
        this.form = newForm;
    }

    createErrorSummary() {
        this.errorSummary = document.createElement('div');
        this.errorSummary.id = 'error-summary';
        this.errorSummary.className = 'error-summary';
        this.errorSummary.style.cssText = `
            display: none;
            background: #fee;
            border: 2px solid #f00;
            border-radius: 8px;
            padding: 15px;
            margin: 10px 0;
            color: #c00;
            font-weight: bold;
            text-align: center;
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 300px;
        `;
        
        if (this.form) {
            this.form.insertBefore(this.errorSummary, this.form.firstChild);
        }
    }

    addRequiredAttributes() {
        // Add required attribute to all input, select, and textarea elements
        const fields = this.form.querySelectorAll('input, select, textarea');
        fields.forEach(field => {
            if (field.type !== 'submit' && field.type !== 'button' && field.type !== 'reset' && field.type !== 'file') {
                field.setAttribute('required', 'true');
            }
        });
    }

    setupFieldValidation() {
        const fields = this.form.querySelectorAll('input, select, textarea');
        
        fields.forEach(field => {
            if (field.type === 'submit' || field.type === 'button' || field.type === 'reset') return;
            
            // Add validation on blur (when user leaves field)
            field.addEventListener('blur', () => this.validateField(field));
            
            // Add validation on input (real-time feedback)
            field.addEventListener('input', () => this.validateField(field));
            
            // Add validation on change (for select elements)
            field.addEventListener('change', () => this.validateField(field));
        });
    }

    setupFormSubmission() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Form submission intercepted');
            
            if (!this.validateAllFields()) {
                this.showErrorSummary();
                this.scrollToFirstError();
                return false;
            }
            
            // If all valid, proceed with original form logic
            this.handleValidSubmission();
        });
    }

    validateField(field) {
        const fieldId = field.id || field.name || 'field-' + Math.random();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        this.removeFieldError(field);

        // Special handling for AGE AT THE TIME OF DEATH (death1.html)
        if (["age-years", "age-months", "age-days", "age-hours", "age-minutes"].includes(field.id)) {
            const years = this.form.querySelector('#age-years');
            const months = this.form.querySelector('#age-months');
            const days = this.form.querySelector('#age-days');
            const hours = this.form.querySelector('#age-hours');
            const minutes = this.form.querySelector('#age-minutes');
            // If any group is filled, others are not required
            const yearsFilled = years && years.value.trim() !== '';
            const monthsDaysFilled = months && months.value.trim() !== '' && days && days.value.trim() !== '';
            const hoursMinutesFilled = hours && hours.value.trim() !== '' && minutes && minutes.value.trim() !== '';
            if (yearsFilled || monthsDaysFilled || hoursMinutesFilled) {
                // Mark all as valid
                [years, months, days, hours, minutes].forEach(f => {
                    if (f) {
                        this.removeFieldError(f);
                        this.validFields.add(f.id);
                    }
                });
                this.updateSubmitButton();
                return true;
            } else {
                // Only show error for the current group
                if (field.id === 'age-years') {
                    if (!yearsFilled) {
                        this.showFieldError(field, 'This field is required');
                        this.validFields.delete(field.id);
                        this.updateSubmitButton();
                        return false;
                    }
                } else if (field.id === 'age-months' || field.id === 'age-days') {
                    if (!monthsDaysFilled) {
                        this.showFieldError(field, 'This field is required');
                        this.validFields.delete(field.id);
                        this.updateSubmitButton();
                        return false;
                    }
                } else if (field.id === 'age-hours' || field.id === 'age-minutes') {
                    if (!hoursMinutesFilled) {
                        this.showFieldError(field, 'This field is required');
                        this.validFields.delete(field.id);
                        this.updateSubmitButton();
                        return false;
                    }
                }
            }
        }

        // Special handling for checkbox/radio groups
        if ((field.type === 'checkbox' || field.type === 'radio') && field.name) {
            // Only validate the first in the group to avoid duplicate errors
            const group = this.form.querySelectorAll(`[name='${field.name}']`);
            if (group[0] !== field) return true;
            // Validate group
            const anyChecked = Array.from(group).some(f => f.checked);
            if (!anyChecked) {
                this.showFieldError(field, 'Please select at least one option');
                this.validFields.delete(field.name);
                this.updateSubmitButton();
                return false;
            } else {
                this.validFields.add(field.name);
                this.updateSubmitButton();
                return true;
            }
        }

        // Conditional required: 'Others (Specify)' only if 'Others' is checked (for radio or checkbox group)
        if (field.id && field.id.toLowerCase().includes('attendant-others-text')) {
            // Find the related 'Others' radio/checkbox in the same group
            const othersRadio = this.form.querySelector("input[name='attendant'][value='others']");
            if (!othersRadio || !othersRadio.checked) {
                // Not required if 'Others' is not checked
                this.removeFieldError(field);
                this.validFields.add(fieldId);
                this.updateSubmitButton();
                return true;
            }
        }

        // Check if field is empty
        if (this.isEmpty(field)) {
            isValid = false;
            errorMessage = 'This field is required';
        } else {
            // Validate based on field type
            const validation = this.validateByType(field);
            isValid = validation.isValid;
            errorMessage = validation.message;
        }

        // Apply validation result
        if (!isValid) {
            this.showFieldError(field, errorMessage);
            this.validFields.delete(fieldId);
        } else {
            this.validFields.add(fieldId);
        }

        this.updateSubmitButton();
        return isValid;
    }

    isEmpty(field) {
        const value = field.value.trim();
        return value === '' || value === null || value === undefined;
    }

    validateByType(field) {
        if (field.type === 'file') {
            // Only check if a file is selected
            if (!field.files || field.files.length === 0) {
                return { isValid: false, message: 'File is required' };
            }
            return { isValid: true, message: '' };
        }
        if (field.type === 'checkbox' || field.type === 'radio') {
            // Validate group: at least one checked for same name
            const group = this.form.querySelectorAll(`[name='${field.name}']`);
            const anyChecked = Array.from(group).some(f => f.checked);
            if (!anyChecked) {
                return { isValid: false, message: 'Please select at least one option' };
            }
            return { isValid: true, message: '' };
        }
        switch (field.type) {
            case 'text':
                return this.validateTextField(field);
            case 'date':
                return this.validateDateField(field);
            case 'number':
                return this.validateNumberField(field);
            case 'email':
                return this.validateEmailField(field);
            default:
                if (field.tagName === 'SELECT') {
                    return this.validateSelectField(field);
                } else {
                    return this.validateTextField(field);
                }
        }
    }

    validateTextField(field) {
        const value = field.value.trim();
        const fieldName = field.name || field.id || 'field';
        
        // Check for minimum length (2 characters for most text fields)
        if (value.length < 2) {
            return { isValid: false, message: 'Must be at least 2 characters long' };
        }

        // Check for maximum length (50 characters for most text fields)
        if (value.length > 50) {
            return { isValid: false, message: 'Must be 50 characters or less' };
        }

        // Name validation (for fields that should contain only letters and spaces)
        if (this.isNameField(fieldName)) {
            if (!/^[A-Za-z\s]+$/.test(value)) {
                return { isValid: false, message: 'Only letters and spaces allowed in names' };
            }
        }

        // General text validation (no special characters except basic punctuation)
        if (!/^[A-Za-z0-9\s\-\.\,\']+$/.test(value)) {
            return { isValid: false, message: 'Invalid characters detected' };
        }

        return { isValid: true, message: '' };
    }

    validateDateField(field) {
        const value = field.value;
        
        if (!value) {
            return { isValid: false, message: 'Date is required' };
        }

        // Check if it's a valid date format (YYYY-MM-DD)
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            return { isValid: false, message: 'Enter valid date as YYYY-MM-DD' };
        }

        // Check if it's a real date
        const date = new Date(value);
        if (isNaN(date.getTime())) {
            return { isValid: false, message: 'Enter a valid date' };
        }

        // Check if date is not in the future (for birth/death dates)
        const today = new Date();
        if (date > today) {
            return { isValid: false, message: 'Date cannot be in the future' };
        }

        return { isValid: true, message: '' };
    }

    validateNumberField(field) {
        const value = field.value.trim();
        
        if (!value) {
            return { isValid: false, message: 'Number is required' };
        }

        // Check if it's a valid number
        if (!/^\d+$/.test(value)) {
            return { isValid: false, message: 'Numbers only - no letters/symbols' };
        }

        // Check for reasonable range (0-150 for ages, etc.)
        const num = parseInt(value);
        if (num < 0 || num > 150) {
            return { isValid: false, message: 'Number must be between 0-150' };
        }

        return { isValid: true, message: '' };
    }

    validateEmailField(field) {
        const value = field.value.trim();
        
        if (!value) {
            return { isValid: false, message: 'Email is required' };
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return { isValid: false, message: 'Enter a valid email address' };
        }

        return { isValid: true, message: '' };
    }

    validateSelectField(field) {
        const value = field.value;
        
        if (!value || value === '' || value.includes('Select')) {
            return { isValid: false, message: 'Please select a valid option' };
        }

        return { isValid: true, message: '' };
    }

    isNameField(fieldName) {
        const nameFields = ['fname', 'lname', 'mname', 'first', 'last', 'middle', 'name'];
        return nameFields.some(name => fieldName.toLowerCase().includes(name));
    }

    showFieldError(field, message) {
        // Remove any existing error message for this field and its siblings
        this.removeFieldError(field);
        // Also remove any .field-error siblings (in case DOM structure changed)
        let sibling = field.nextSibling;
        while (sibling) {
            if (sibling.classList && sibling.classList.contains('field-error')) {
                sibling.remove();
            }
            sibling = sibling.nextSibling;
        }
        // Add red outline
        field.style.border = '2px solid #f00';
        field.style.boxShadow = '0 0 5px rgba(255,0,0,0.5)';
        
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.cssText = `
            color: #f00;
            font-size: 12px;
            margin-top: 5px;
            font-weight: bold;
        `;
        errorDiv.innerHTML = `❌ ${message}`;
        
        // Insert error message after the field
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
        
        // Store reference to error element
        this.errorElements.set(field, errorDiv);
    }

    removeFieldError(field) {
        // Remove red outline
        field.style.border = '';
        field.style.boxShadow = '';
        
        // Remove error message
        const errorDiv = this.errorElements.get(field);
        if (errorDiv) {
            errorDiv.remove();
            this.errorElements.delete(field);
        }
    }

    validateAllFields() {
        const fields = this.form.querySelectorAll('input, select, textarea');
        let allValid = true;
        
        fields.forEach(field => {
            if (field.type === 'submit' || field.type === 'button' || field.type === 'reset') return;
            
            if (!this.validateField(field)) {
                allValid = false;
            }
        });
        
        return allValid;
    }

    updateSubmitButton() {
        if (!this.submitButton) return;
        
        const isValid = this.validFields.size > 0 && this.errors.length === 0;
        
        if (isValid) {
            this.submitButton.disabled = false;
            this.submitButton.style.opacity = '1';
        } else {
            this.submitButton.disabled = true;
            this.submitButton.style.opacity = '0.5';
        }
    }

    showErrorSummary() {
        const errorCount = this.errorElements.size;
        this.errorSummary.innerHTML = `❌ Fix ${errorCount} error(s) to continue`;
        this.errorSummary.style.display = 'block';
        
        // Hide after 5 seconds
        setTimeout(() => {
            this.errorSummary.style.display = 'none';
        }, 5000);
    }

    scrollToFirstError() {
        const firstError = this.form.querySelector('.field-error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    handleValidSubmission() {
        console.log('Form is valid, proceeding with submission');
        // Special case: if on marriage3.html, always go to thank you(marriage).html
        if (window.location.pathname.includes('marriage3.html')) {
            window.location.href = 'thank you(marriage).html';
            return;
        }
        // Special case: if on marriage2.html, go to marriage3.html
        if (window.location.pathname.includes('marriage2.html')) {
            window.location.href = 'marriage3.html';
            return;
        }
        // Special case: if on marriage1.html, go to marriage2.html
        if (window.location.pathname.includes('marriage1.html')) {
            window.location.href = 'marriage2.html';
            return;
        }
        // Special case: if on birth2.html, go to thankyou(birth).html
        if (window.location.pathname.includes('birth2.html')) {
            window.location.href = 'thankyou(birth).html';
            return;
        }
        // Special case: if on death4.html, go to thankyou(death).html
        if (window.location.pathname.includes('death4.html')) {
            window.location.href = 'thankyou(death).html';
            return;
        }
        // Special case: if on death3.html, go to death4.html
        if (window.location.pathname.includes('death3.html')) {
            window.location.href = 'death4.html';
            return;
        }
        // Special case: if on death2.html, go to death3.html
        if (window.location.pathname.includes('death2.html')) {
            window.location.href = 'death3.html';
            return;
        }
        const formType = this.form.dataset.service || 'unknown';
        const redirectMap = {
            'birth': 'birth2.html',
            'death': 'death2.html',
            'marriage': 'marriage3.html',
            'cenomar': 'thankyou(cenomar).html'
        };
        const nextPage = redirectMap[formType] || 'dashboard.html';
        window.location.href = nextPage;
    }
}

// Initialize validation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing UltraStrictValidator...');
    new UltraStrictValidator();
});

// Also initialize if script is loaded after DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('Initializing UltraStrictValidator...');
        new UltraStrictValidator();
    });
} else {
    console.log('DOM already loaded, initializing UltraStrictValidator...');
    new UltraStrictValidator();
}

// CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
    
    @keyframes highlight {
        0% { background-color: #fff5f5; }
        50% { background-color: #ffe6e6; }
        100% { background-color: #fff5f5; }
    }
    
    .field-error {
        animation: fadeIn 0.3s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Export for use in other scripts
window.UltraStrictValidator = UltraStrictValidator; 