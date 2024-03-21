$(document).ready(function(){
    $('#signInForm').submit(function(event){
        event.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: 'php/register.php',
            data: formData,
            success: function(response){
                console.log(response);
                // Assuming response is a success message from the server
                alert("Registration successful!"); // Show a popup message
                window.location.href = 'login.html'; // Redirect to success page
                
                // Get the username from form data
                var username = $('#username').val();
                localStorage.setItem("username",username);
                
                
               
            },
            error: function(xhr, status, error){
                console.error(xhr.responseText);
                // You can handle error response here
            }
        });
    });
});

