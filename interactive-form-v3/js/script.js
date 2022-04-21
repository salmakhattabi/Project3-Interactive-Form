let currentTotal = 0;

// get Display name input element
const userName = document.querySelector('#name');
// Add a focus state on the name input field
userName.focus();

// Display other jobs input when the other option is selected
// get Jobs select
const selectJobs = document.getElementById('title');
// Add on change event listener
selectJobs.addEventListener("change", () => {
    // Get selected value
    const currentSelectedJob = selectJobs.value;
    // Get other jobs input element
    const otherJobRole = document.getElementById('other-job-role');
    if(currentSelectedJob === "other") {
        // Display other jobs input element if selected option = other
        otherJobRole.style.display = 'block';
    } else {
        // Hide other jobs input element if select option is not oder
        otherJobRole.style.display = 'none';
    }
});

// Handle the design select change
// get select design
const selectDesign = document.getElementById('design');
const selectColor = document.getElementById('color');
selectColor.disabled = true;
// Add on change event listener
selectDesign.addEventListener("change", () => {
    // Get selected value
    const currentSelectedDesign = selectDesign.value;
    // Get other color select element

    selectColor.removeAttribute('disabled');
    selectColor.querySelectorAll('option').forEach(element => {
      if(element.getAttribute('data-theme') === currentSelectedDesign) {
        element.removeAttribute('disabled');
        element.hidden=false;

      } else {
        element.setAttribute('disabled','disabled');
        element.hidden=true;
      }
    });
});
// get all activities checkboxes
const allActivitiesCheckBoxes = document.querySelectorAll('.activities-box input[type="checkbox"]');
// Add event listener to all activities checkboxes
allActivitiesCheckBoxes.forEach((element) => {
    element.addEventListener("change", (el) => {
        const selectActivityCost = el.target.getAttribute('data-cost');
        if(el.target.checked)
        {
            currentTotal = Number.parseInt(currentTotal) + Number.parseInt(selectActivityCost);
        } else {
            currentTotal = Number.parseInt(currentTotal) - Number.parseInt(selectActivityCost);
        }
        document.querySelector('.activities-cost span').innerHTML = currentTotal;
    });
});

// get payment method list
const allPaymentMethodList = document.getElementById('payment');
// Add event listener for payment method list
allPaymentMethodList.addEventListener("change", () => {
    document.querySelectorAll('.payment-method_container').forEach((el) => {
        el.style.display = 'none';
    });
   document.getElementById(allPaymentMethodList.value).style.display = 'block';
});

// Set form submit validation
const formSubmit = function(e) {
    e.preventDefault();
    // Validate form
    if(validateForm()) {

    } else {

    }
}

// Form validation
const validateForm = function() {
    let formIsValid = true;
    if(isEmpty(userName.value)) {
        userName.classList.add('error-border');
        document.getElementById('name-hint').style.display = 'block';
        userName.closest('label').classList.add('not-valid');
        userName.closest('label').classList.remove('valid');
        formIsValid = false;
    }
    else {
        userName.classList.remove('error-border');
        document.getElementById('name-hint').style.display = 'none';
        userName.closest('label').classList.remove('not-valid');
        userName.closest('label').classList.add('valid');
    }
    if(!validateEmail()) {
        formIsValid = false;
    }
    if(document.querySelectorAll('.activities-box input[type="checkbox"]:checked').length === 0) {
        formIsValid = false;
        document.getElementById('activities-box').classList.add('error-border');
        document.getElementById('activities-hint').style.display = 'block';
        document.getElementById('activities').classList.add('not-valid');
        document.getElementById('activities').classList.remove('valid');
    } else {
        document.getElementById('activities-box').classList.remove('error-border');
        document.getElementById('activities-hint').style.display = 'none';
        document.getElementById('activities').classList.remove('not-valid');
        document.getElementById('activities').classList.add('valid');
    }
    if (allPaymentMethodList.value === 'credit-card') {
        if(!validateCardData()) {
            formIsValid = false;
        }
    }
}

// Check if empty
const isEmpty = function(str) {
    return str === '' || str === null || str === undefined
}

// Check if email is valid
const validateEmail = function()
{
 const email = document.querySelector('#email');
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value) && !isEmpty(email.value))
  {
    email.classList.remove('error-border');
    document.getElementById('email-hint').style.display = 'none';
    email.closest('label').classList.remove('not-valid');
    email.closest('label').classList.add('valid');
    return true;
  } else {
    email.classList.add('error-border');
    document.getElementById('email-hint').style.display = 'block';
    email.closest('label').classList.add('not-valid');
    email.closest('label').classList.remove('valid');
    return false;
  }
}

// Validate card info
const validateCardData = function() {
    let formIsValid = true;
    const ccNum = document.querySelector('#cc-num');
    if(isEmpty(ccNum.value) || (ccNum.value.length > 16 || ccNum.value < 13) || isNaN(ccNum.value)) {
        ccNum.classList.add('error-border');
        document.getElementById('cc-hint').style.display = 'block';
        ccNum.closest('label').classList.add('not-valid');
        ccNum.closest('label').classList.remove('valid');
        formIsValid = false;
    }
    else {
        ccNum.classList.remove('error-border');
        document.getElementById('cc-hint').style.display = 'none';
        ccNum.closest('label').classList.remove('not-valid');
        ccNum.closest('label').classList.add('valid');
    }
    const zip = document.querySelector('#zip');
    if(isEmpty(zip.value) || zip.value.length !== 5 || isNaN(zip.value)) {
        zip.classList.add('error-border');
        zip.closest('label').classList.add('not-valid');
        zip.closest('label').classList.remove('valid');
        document.getElementById('zip-hint').style.display = 'block';
        formIsValid = false;
    }
    else {
        ccNum.classList.remove('error-border');
        zip.closest('label').classList.remove('not-valid');
        zip.closest('label').classList.add('valid');
        document.getElementById('cc-hint').style.display = 'none';
    }
    const cvv = document.querySelector('#cvv');
    if(isEmpty(cvv.value) || cvv.value.length !== 3 || isNaN(cvv.value)) {
        cvv.classList.add('error-border');
        cvv.closest('label').classList.add('not-valid');
        cvv.closest('label').classList.remove('valid');
        document.getElementById('cvv-hint').style.display = 'block';
        formIsValid = false;
    }
    else {
        cvv.classList.remove('error-border');
        cvv.closest('label').classList.remove('not-valid');
        cvv.closest('label').classList.add('valid');
        document.getElementById('cvv-hint').style.display = 'none';
    }
    return formIsValid;
}

// add event listener form submit validation
const formElement = document.getElementById('form');
formElement.addEventListener('submit', formSubmit);

// Add onfocus and onblur to all element
document.querySelectorAll('input').forEach((el) => {
    el.addEventListener('blur',(e) => {
        e.target.closest('label').classList.remove('focus');
    });
    el.addEventListener('focus',(e) => {
        e.target.closest('label').classList.add('focus');
    });
})
