//Newsletter subscription
//Declaring variables
const newsletterForm = document.querySelector('.newsletter-signup form');

//Event listener
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('.newsletter-signup input[type="email"]').value;
    alert('Thank you for subscribing, ' + email);
});