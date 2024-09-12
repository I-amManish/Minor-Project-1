// popup to show today's offer
document.addEventListener("DOMContentLoaded", function () {
    showOfferPopup();
});

function showOfferPopup() {
    Swal.fire({
        title: "Today's Offer!",
        html: "Get 20% off on food order! Use code: TODAY20",
        icon: "info"
    });
}
// popup end 

// book a table form
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('booking-form');
    const sentMessageContainer = document.getElementById('sent-message');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission
  
      // Show the success message
      sentMessageContainer.style.display = 'block';
  
      // Submit the form asynchronously
      const formData = new FormData(form);
      fetch(form.action, {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (response.ok) {
          // Reset the form after successful submission
          form.reset();
        } else {
          throw new Error('Failed to send email. Please try again later.');
        }
      })
      .catch(error => {
        // Show error message
        console.error(error.message);
      });
    });
  });
  function sendEmail() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var guests = document.getElementById("people").value;
    var message = document.getElementById("message").value;

    var emailBody = "Name: " + name + "<br>" +
                    "Email: " + email + "<br>" +
                    "Phone: " + phone + "<br>" +
                    "Date: " + date + "<br>" +
                    "Time: " + time + "<br>" +
                    "Number of Guests: " + guests + "<br>" +
                    "Message: " + message;

    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "immanish0003@gmail.com",
        Password: "CA82AB992D43F4290D78FC0887C36DB76F39",
        To: 'immanish0003@gmail.com',
        From: "immanish0003@gmail.com",
        Subject: "Booking Information",
        Body: emailBody
    }).then(
        message => {
            Swal.fire({
                title: "Success!",
                text: "Email has been sent successfully!",
                icon: "success"
            });
            // Reset the form after successful submission
            document.getElementById('booking-form').reset();
            // Show the success message
            document.getElementById('sent-message').style.display = 'block';
        }
    ).catch(error => {
        console.error("Failed to send email:", error);
        // Show error message
        document.getElementById('error-message').textContent = 'Failed to send email. Please try again later.';
        document.getElementById('error-message').style.display = 'block';
    });
}


//spinner
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('booking-form');
    const sentMessageContainer = document.getElementById('sent-message');
    const loadingSpinner = document.querySelector('.loading');
    const errorContainer = document.getElementById('error-message');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Hide any existing error message
        errorContainer.textContent = '';
        errorContainer.style.display = 'none';

        // Validate form fields
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const date = document.getElementById('date').value.trim();
        const time = document.getElementById('time').value.trim();
        const people = document.getElementById('people').value.trim();
        const message = document.getElementById('message').value.trim();

        // Array to hold the names of empty fields
        const emptyFields = [];

        // Check each field and add to emptyFields if empty
        if (!name) emptyFields.push('Name');
        if (!email) emptyFields.push('Email');
        if (!phone) emptyFields.push('Phone');
        if (!date) emptyFields.push('Date');
        if (!time) emptyFields.push('Time');
        if (!people) emptyFields.push('Number of People');
        if (!message) emptyFields.push('Message');

        // If any field is empty, display error message
        if (emptyFields.length > 0) {
            errorContainer.textContent = `Please fill out the following fields: ${emptyFields.join(', ')}.`;
            errorContainer.style.display = 'block';
            return; // Exit function early
        }

        // Show the loading spinner
        loadingSpinner.style.display = 'block';

        // Submit the form asynchronously
        const formData = new FormData(form);
        fetch(form.action, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    // Reset the form after successful submission
                    form.reset();
                    // Hide the loading spinner after 3 seconds
                    setTimeout(() => {
                        loadingSpinner.style.display = 'none';
                    }, 3000); // Adjust the duration as needed
                    // Show the success message
                    sentMessageContainer.style.display = 'block';
                } else {
                    throw new Error('Failed to send email. Please try again later.');
                }
            })
            .catch(error => {
                // Show error message
                console.error(error.message);
            });
    });
});

// menu filter
$(document).ready(function(){
    // Filter menu items when a filter button is clicked
    $('#menu-flters li').click(function(){
        $('#menu-flters li').removeClass('filter-active');
        $(this).addClass('filter-active');

        var selectedFilter = $(this).data('filter');
        $('.menu-item').fadeOut(0); // Hide all menu items first
        if(selectedFilter == '*'){
            $('.menu-item').fadeIn(); // If Show All is selected, fade in all items
        } else {
            $('.menu-item').each(function(){
                if($(this).hasClass(selectedFilter.replace('.', ''))){
                    $(this).fadeIn();
                }
            });
        }
    });
});

// JavaScript/jQuery code to toggle the button text and icon
$(document).ready(function(){
    $('.cssbuttons-io-button').click(function(){
        var button = $(this);
        var buttonText = button.find('span');
        var icon = button.find('.plus-icon');

        if (buttonText.text() === 'Add') {
            buttonText.text('Remove');
            icon.attr('d', 'M18 13H6v-2h12v2z');
        } else {
            buttonText.text('Add');
            icon.attr('d', 'M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z');
        }
    });
});

// link image
$(document).ready(function(){
    $('.menu-item-link').click(function(e){
        e.preventDefault(); // Prevent the default behavior of the link
        
        var imageUrl = $(this).data('image');
        
        // Set the image source and display it
        $('.menu-image img').attr('src', imageUrl);
        $('.menu-image').show();
    });
});

// nothing ot see here
function showMessage(event, category) {
    event.preventDefault();
    const messageContainer = document.getElementById('message');
    const cartDetails = $('.cart-details');

    // Clear the content of the message container and hide cart details
    messageContainer.textContent = '';
    cartDetails.hide();

    if (category === 'Not Shipped Yet' || category === 'Cancelled Orders') {
        messageContainer.textContent = 'Nothing to see here';
    } else if (category === 'Buy Again') {
        window.location.hash = '#menu'; // Redirect to the 'menu' section
    } else {
        messageContainer.textContent = category;
    }
}







// to show last cnacelled order
// Define some sample data for cancelled orders
const cancelledOrders = [
    { id: 1, item: "Product A", quantity: 2, price: 10 },
    { id: 2, item: "Product B", quantity: 1, price: 15 },
    // Add more cancelled orders here as needed
];

function showMessage(event, category) {
    event.preventDefault();
    const messageContainer = document.getElementById('message');
    const cartDetails = $('.cart-details');

    // Clear the content of the message container and hide cart details
    messageContainer.textContent = '';
    cartDetails.hide();

    if (category === 'Not Shipped Yet') {
        messageContainer.textContent = 'Nothing to see here';
    } else if (category === 'Cancelled Orders') {
        const lastCancelledOrder = cancelledOrders[cancelledOrders.length - 1];
        if (lastCancelledOrder) {
            displayCancelledOrderDetails(lastCancelledOrder);
        } else {
            messageContainer.textContent = 'No cancelled orders found';
        }
    } else if (category === 'Buy Again') {
        window.location.hash = '#menu'; // Redirect to the 'menu' section
    } else {
        messageContainer.textContent = category;
    }
}




function displayCancelledOrderDetails(orderDetails) {
    const messageContainer = document.getElementById('message');
    messageContainer.innerHTML = ''; // Clear previous content

    // Create cart details container
    const cartDetails = document.createElement('div');
    cartDetails.classList.add('cart-details', 'w-25');
    cartDetails.style.display = 'block';
    cartDetails.style.border = '1px solid black';
    cartDetails.style.marginLeft = '100px';
    cartDetails.style.borderRadius = '5%';
    cartDetails.style.padding = '2px 0 5px 5px';

    // Order title
    const orderTitle = document.createElement('h3');
    orderTitle.textContent = 'Order Detail:- 1';
    orderTitle.style.textAlign = 'center';
    cartDetails.appendChild(orderTitle);

    // Item
    const itemParagraph = document.createElement('p');
    itemParagraph.innerHTML = `<strong>Item:</strong> <span class="cart-item">${orderDetails.item}</span>`;
    cartDetails.appendChild(itemParagraph);

    // Ingredients
    const ingredientsParagraph = document.createElement('p');
    ingredientsParagraph.innerHTML = `<strong>Ingredients:</strong> <span class="cart-ingredients">${orderDetails.ingredients}</span>`;
    cartDetails.appendChild(ingredientsParagraph);

    // Price
    const priceParagraph = document.createElement('p');
    priceParagraph.innerHTML = `<strong>Price ₹:</strong> <span class="cart-price">${orderDetails.price}</span>`;
    cartDetails.appendChild(priceParagraph);

    // Quantity control
    const quantityControl = document.createElement('div');
    quantityControl.classList.add('quantity-control');
    const decreaseButton = document.createElement('button');
    decreaseButton.classList.add('change-quantity', 'decrease-quantity');
    decreaseButton.textContent = '-';
    const quantitySpan = document.createElement('span');
    quantitySpan.classList.add('cart-quantity');
    quantitySpan.textContent = '1';
    const increaseButton = document.createElement('button');
    increaseButton.classList.add('change-quantity', 'increase-quantity');
    increaseButton.textContent = '+';
    quantityControl.appendChild(decreaseButton);
    quantityControl.appendChild(quantitySpan);
    quantityControl.appendChild(increaseButton);
    cartDetails.appendChild(quantityControl);

    // Remove and Order Now buttons (optional, you can remove them if not needed)
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-product');
    removeButton.textContent = 'Remove';
    cartDetails.appendChild(removeButton);
    const orderNowButton = document.createElement('button');
    orderNowButton.classList.add('order-now');
    orderNowButton.textContent = 'Order Now';
    cartDetails.appendChild(orderNowButton);

    // Append cart details to message container
    messageContainer.appendChild(cartDetails);
}





$(document).ready(function(){
    $('.add-to-cart').click(function(){
        var button = $(this);
        var cartDetails = $('.cart-details');
        var menuItem = button.closest('.menu-item');
        var itemName = menuItem.find('.menu-item-link').data('name');
        var ingredients = menuItem.find('.menu-item-link').data('ingredients');
        var price = menuItem.find('.menu-item-link').data('price');
        
        if (button.hasClass('added')) {
            // Remove item from cart
            cartDetails.hide();
            button.removeClass('added');
            button.find('.icon').attr('d', 'M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z');
            button.find('span').text('Add');
        } else {
            // Add item to cart
            $('.cart-item').text(itemName);
            $('.cart-ingredients').text(ingredients);
            $('.cart-price').text(price);
            cartDetails.show();
            button.addClass('added');
            button.find('.icon').attr('d', 'M18 13H6v-2h12v2z');
            button.find('span').text('Remove');
        }
    });
});

// quantity
$(document).ready(function(){
    // Event handler for changing quantity
    $('.change-quantity').click(function(){
        var button = $(this);
        var quantitySpan = button.siblings('.cart-quantity');
        var currentQuantity = parseInt(quantitySpan.text());
        
        if (button.hasClass('increase-quantity')) {
            // Increase quantity
            quantitySpan.text(currentQuantity + 1);
        } else if (button.hasClass('decrease-quantity') && currentQuantity > 1) {
            // Decrease quantity, ensuring it doesn't go below 1
            quantitySpan.text(currentQuantity - 1);
        }
    });

    // Event handler for "Remove Product" button
    $('.remove-product').click(function(){
        // Hide the cart details
        var cartDetails = $(this).closest('.cart-details');
        cartDetails.hide();
        // Reset the quantity to 1
        cartDetails.find('.cart-quantity').text('1');
        // Remove the item from the cart
        var addButton = cartDetails.prev().find('.add-to-cart');
        addButton.removeClass('added');
        addButton.find('.icon').attr('d', 'M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z');
        addButton.find('span').text('Add');
    });

    // Event handler for "Order Now" button
    $('.order-now').click(function(){
        $('.order-message').fadeIn();
        setTimeout(function(){
            $('.order-message').fadeOut();
        }, 3000); // Hide after 3 seconds (3000 milliseconds)
    });
});


// data save

// contact us section js start

function sendEmail() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;

    var emailBody = "Name: " + name + "<br>" +
                    "Email: " + email + "<br>" +
                    "Subject: " + subject + "<br>" +
                    "Message: " + message;

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "immanish0003@gmail.com",
        Password : "CA82AB992D43F4290D78FC0887C36DB76F39",
        To : 'immanish0003@gmail.com',
        From : "immanish0003@gmail.com",
        Subject : "Contact Form Submission: " + subject,
        Body : emailBody
    }).then(
      message => {
        // Use SweetAlert for displaying success message
        Swal.fire({
          title: "Success!",
          text: "Your message has been sent successfully!",
          icon: "success"
        });
      }
    );
}

// contact us section js end 

// cart active status start
function showMessage(event, status) {
    event.preventDefault(); // Prevent default link behavior

    // Remove 'active' class from all links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Add 'active' class to the clicked link
    event.target.classList.add('active');

    // Add your logic to show messages based on the status
    console.log('Showing messages for status:', status);
  }
// cart active status end