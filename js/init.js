(function($){
  $(function(){

    $('.button-collapse').sideNav({
		closeOnClick: true
	});
	$('.scrollspy').scrollSpy();
	$('.parallax').parallax();
	
	$('#submit').click(function(){
	    if($('#submit').hasClass('disabled')){
	        return;
	    }
	    if($('#icon_email').is(':valid') && $('#icon_email').val() != ""){
            $.ajax({
                url: 'https://web.stanford.edu/~jbboin/cgi-bin/contact_me.php',
                type:'POST',
                data:{
                    name: $('#icon_prefix').val(),
                    email: $('#icon_email').val(),
                    message: $('#icon_prefix2').val()
                },
                success: function(result){
                    if(result == 'success'){
                        Materialize.toast('Message sent. Thank you for contacting me.', 4000);
                        $('#contact_form')[0].reset();
                        Materialize.updateTextFields();
                    } else {
                        Materialize.toast('An error occurred. Please send again or use my regular email.', 4000);
                    }
                    $('#submit').removeClass('disabled');
                },
                error: function(msg){
                    Materialize.toast('An error occurred. Please send again or use my regular email.', 4000);
                    $('#submit').removeClass('disabled');
                }              
            });
            $('#submit').addClass('disabled');
            Materialize.toast('Sending message...', 4000);
        } else {
            Materialize.toast('Please enter a valid email address.', 4000);
            $('#icon_email').addClass('invalid');
        }
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space
