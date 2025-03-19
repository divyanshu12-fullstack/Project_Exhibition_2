document.addEventListener('DOMContentLoaded', function () {
    animateElements();
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');

    imageUpload.addEventListener('change', function () {
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

            reader.onload = function (e) {
                imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview" class="scale-in">`;
            };

            reader.readAsDataURL(this.files[0]);
        }
    });
    const userForm = document.getElementById('userForm');
    const submitBtn = userForm.querySelector('.submit-btn');
    const submitBtnText = submitBtn.querySelector('.btn-text');
    const submitSpinner = submitBtn.querySelector('.spinner-border');

    userForm.addEventListener('submit', function (e) {
        e.preventDefault();
        submitBtnText.textContent = 'Submitting...';
        submitSpinner.classList.remove('d-none');
        submitBtn.disabled = true;
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
        setTimeout(function () {
            submitBtnText.textContent = 'Submit';
            submitSpinner.classList.add('d-none');
            submitBtn.disabled = false;

            alert(`Form submitted!\nUsername: ${username}\nAddress: ${address}\nPhone: ${phone}\nGender: ${gender}`);
            userForm.classList.add('animate__animated', 'animate__pulse');
            setTimeout(() => {
                userForm.classList.remove('animate__animated', 'animate__pulse');
            }, 1000);
        }, 1500);
    });
    const checkResultsBtn = document.getElementById('checkResults');
    const checkBtnText = checkResultsBtn.querySelector('.btn-text');
    const checkSpinner = checkResultsBtn.querySelector('.spinner-border');

    checkResultsBtn.addEventListener('click', function () {
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
        checkBtnText.textContent = 'Processing...';
        checkSpinner.classList.remove('d-none');
        checkResultsBtn.disabled = true;

        setTimeout(function () {
            checkBtnText.textContent = 'Check Results';
            checkSpinner.classList.add('d-none');
            checkResultsBtn.disabled = false;
            alert('Results are being processed!');
            const rightPanel = document.querySelector('.right-panel');
            rightPanel.classList.add('animate__animated', 'animate__pulse');
            setTimeout(() => {
                rightPanel.classList.remove('animate__animated', 'animate__pulse');
            }, 1000);
        }, 2000);
    });

    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.addEventListener('focus', function () {
            this.parentElement.classList.add('scale-in');
        });
    });
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });

        group.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
});

function animateElements() {

    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        setTimeout(() => {
            group.classList.add('slide-up');
        }, 100 * index);
    });

    setTimeout(() => {
        const companyName = document.querySelector('.company-name');
        companyName.classList.add('animate__animated', 'animate__bounceIn');
    }, 300);

    setTimeout(() => {
        const companySlogan = document.querySelector('.company-slogan');
        companySlogan.classList.add('animate__animated', 'animate__fadeIn');
    }, 800);
}
function shakeElement(element) {
    element.classList.add('animate__animated', 'animate__shakeX');
    setTimeout(() => {
        element.classList.remove('animate__animated', 'animate__shakeX');
    }, 1000);
}