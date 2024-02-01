(function($) {

	"use strict";


  // Form
	var contactForm = function() {
		if ($('#contactForm').length > 0 ) {
			$( "#contactForm" ).validate( {
				rules: {
					name: "required",
					subject: "required",
					email: {
						required: true,
						email: true
					},
					message: {
						required: true,
						minlength: 5
					}
				},
				messages: {
					name: "Please enter your name",
					subject: "Please enter your subject",
					email: "Please enter a valid email address",
					message: "Please enter a message"
				},
				/* submit via ajax */
				
				submitHandler: function(form) {		
					var $submit = $('.submitting'),
						waitText = 'Submitting...';

					$.ajax({   	
				      type: "POST",
				      url: "php/sendEmail.php",
				      data: $(form).serialize(),

				      beforeSend: function() { 
				      	$submit.css('display', 'block').text(waitText);
				      },
				      success: function(msg) {
		               if (msg == 'OK') {
		               	$('#form-message-warning').hide();
				            setTimeout(function(){
		               		$('#contactForm').fadeIn();
		               	}, 1000);
				            setTimeout(function(){
				               $('#form-message-success').fadeIn();   
		               	}, 1400);

		               	setTimeout(function(){
				               $('#form-message-success').fadeOut();   
		               	}, 8000);

		               	setTimeout(function(){
				               $submit.css('display', 'none').text(waitText);  
		               	}, 1400);

		               	setTimeout(function(){
		               		$( '#contactForm' ).each(function(){
											    this.reset();
											});
		               	}, 1400);
			               
			            } else {
			               $('#form-message-warning').html(msg);
				            $('#form-message-warning').fadeIn();
				            $submit.css('display', 'none');
			            }
				      },
				      error: function() {
				      	$('#form-message-warning').html("Un problème est survenu, veuillez contacter Junior.entreprise@centrale-casablanca.ma");
				         $('#form-message-warning').fadeIn();
				         $submit.css('display', 'none');
				      }
			      });    		
		  		} // end submitHandler

			});
		}
	};
	contactForm();
	function showMore() {
		var hiddenText = document.querySelector('.hidden');
		hiddenText.style.display = 'block';
		var readMoreButton = document.querySelector('button');
		readMoreButton.style.display = 'none';
	  }
	  

})(jQuery);
// Get all the counter elements
const counters = document.querySelectorAll('.counter');

// Function to check if an element is in the viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to count up to a target number
function countUp(el) {
  const target = +el.getAttribute('data-target');
  let count = 0;
  const speed = 2000 / target; // Adjust speed based on target number
  const timer = setInterval(() => {
    count++;
    el.innerText = count;
    if (count === target) {
      clearInterval(timer);
    }
  }, speed);
}
function typeText(text) {
	var i = 0;
	var typingInterval = setInterval(function() {
	  if (i < text.length) {
		document.getElementById("typing-effect").innerHTML += text.charAt(i);
		i++;
	  } else {
		clearInterval(typingInterval);
	  }
	}, 50); // Adjust this value to control the typing speed
  }
  
// Function to handle the scroll event
function handleScroll() {
  counters.forEach(counter => {
    if (isElementInViewport(counter) && !counter.classList.contains('counted')) {
      counter.classList.add('counted');
      countUp(counter);
    }
  });
}

// Add event listener to window scroll event
window.addEventListener('scroll', handleScroll);
