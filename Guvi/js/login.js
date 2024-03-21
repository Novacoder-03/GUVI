
$(document).ready(function(){
    $('#loginForm').submit(function(event){
        event.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: 'php/login.php',
            data: formData,
            success: function(response){
                if(response == 'success') {
                    const email = $('#email').val();
                    // const name =$().val(); // Get email from the login form
                    localStorage.setItem("email", email); // Store email in local storage
                    
                    // Show popup
                    alert("Login successful!");
                    // Redirect to the next page
                    window.location.href = 'profile.html';
                } else {
                    alert('Invalid username or password');
                }
            },
            error: function(xhr, status, error){
                console.error(xhr.responseText);
                // You can handle error response here
            }
        });
    });
});
function navigateToRegisterPage() { 
    window.location.href = "register.html"; // Redirect to register page
}