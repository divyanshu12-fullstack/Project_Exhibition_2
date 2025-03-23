document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on load
    animateElements();
    
    // Image upload preview
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    
    imageUpload.addEventListener('change', function() {
        // Check file size (max 200 MB)
        const maxSize = 200 * 1024 * 1024; // 200 MB in bytes
        
        if (this.files[0] && this.files[0].size > maxSize) {
            alert('File size exceeds 200 MB limit');
            this.value = '';
            imagePreview.innerHTML = '';
            return;
        }
        
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview" class="scale-in">`;
            };
            
            reader.readAsDataURL(this.files[0]);
        }
    });
    
    // Form submission with animation
    const userForm = document.getElementById('userForm');
    const submitBtn = userForm.querySelector('.submit-btn');
    const submitBtnText = submitBtn.querySelector('.btn-text');
    const submitSpinner = submitBtn.querySelector('.spinner-border');
    
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtnText.textContent = 'Submitting...';
        submitSpinner.classList.remove('d-none');
        submitBtn.disabled = true;
        
        // Get form values
        const username = document.getElementById('username').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const genderElements = document.getElementsByName('gender');
        let gender = '';
        
        for (let i = 0; i < genderElements.length; i++) {
            if (genderElements[i].checked) {
                gender = genderElements[i].value;
                break;
            }
        }
        
        // Simulate form submission delay
        setTimeout(function() {
            // Reset button state
            submitBtnText.textContent = 'Submit';
            submitSpinner.classList.add('d-none');
            submitBtn.disabled = false;
            
            // Show success message
            alert(`Form submitted!\nUsername: ${username}\nAddress: ${address}\nPhone: ${phone}\nGender: ${gender}`);
            
            // Add success animation to form
            userForm.classList.add('animate__animated', 'animate__pulse');
            setTimeout(() => {
                userForm.classList.remove('animate__animated', 'animate__pulse');
            }, 1000);
        }, 1500);
    });
    
    // Check Results button with animation
    const checkResultsBtn = document.getElementById('checkResults');
    const checkBtnText = checkResultsBtn.querySelector('.btn-text');
    const checkSpinner = checkResultsBtn.querySelector('.spinner-border');
    
    checkResultsBtn.addEventListener('click', function() {
        const description = document.getElementById('description').value;
        const hasImage = imagePreview.innerHTML !== '';
        
        if (!hasImage) {
            shakeElement(imageUpload.parentElement);
            alert('Please upload an image before checking results');
            return;
        }
        
        if (!description) {
            shakeElement(document.getElementById('description'));
            alert('Please add a description before checking results');
            return;
        }
        
        // Show loading state
        checkBtnText.textContent = 'Processing...';
        checkSpinner.classList.remove('d-none');
        checkResultsBtn.disabled = true;
        
        // Simulate processing delay
        setTimeout(function() {
            // Reset button state
            checkBtnText.textContent = 'Check Results';
            checkSpinner.classList.add('d-none');
            checkResultsBtn.disabled = false;
            
            // Show success message
            alert('Results are being processed!');
            
            // Add success animation
            const rightPanel = document.querySelector('.right-panel');
            rightPanel.classList.add('animate__animated', 'animate__pulse');
            setTimeout(() => {
                rightPanel.classList.remove('animate__animated', 'animate__pulse');
            }, 1000);
        }, 2000);
    });
    
    // Add hover effects to form elements
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.addEventListener('focus', function() {
            this.parentElement.classList.add('scale-in');
        });
    });
    
    // Add animation to form groups on hover
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        group.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Function to animate elements on page load
function animateElements() {
    // Stagger the animation of form groups
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        setTimeout(() => {
            group.classList.add('slide-up');
        }, 100 * index);
    });
    
    // Animate company name with delay
    setTimeout(() => {
        const companyName = document.querySelector('.company-name');
        companyName.classList.add('animate__animated', 'animate__bounceIn');
    }, 300);
    
    // Animate company slogan with delay
    setTimeout(() => {
        const companySlogan = document.querySelector('.company-slogan');
        companySlogan.classList.add('animate__animated', 'animate__fadeIn');
    }, 800);
}

// Function to shake an element (for validation errors)
function shakeElement(element) {
    element.classList.add('animate__animated', 'animate__shakeX');
    setTimeout(() => {
        element.classList.remove('animate__animated', 'animate__shakeX');
    }, 1000);
}