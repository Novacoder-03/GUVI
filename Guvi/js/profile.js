$(document).ready(function () {
    // Fetch email from local storage
    const email = localStorage.getItem('email');

    // Bind click event to "Show Profile" button
    $('#show-profile-btn').click(function () {
        // Send AJAX request to fetch profile data associated with the email
        $.ajax({
            method: 'GET',
            url: 'php/profile.php',
            data: { email: email }, // Pass email data
            success: function (response) {
                var value = JSON.parse(response);
                if (value.exists) {
                    var profileDetails = `
                        <p><strong>Full Name:</strong> ${value.data.fullname}</p>
                        <p><strong>Date of Birth:</strong> ${value.data.dob}</p>
                        <p><strong>Age:</strong> ${value.data.age}</p>
                        <p><strong>Gender:</strong> ${value.data.gender}</p>
                        <p><strong>Contact:</strong> ${value.data.contact}</p>
                        <p><strong>State:</strong> ${value.data.state}</p>
                        <p><strong>Education:</strong> ${value.data.education}</p>
                        <p><strong>Occupation:</strong> ${value.data.occupation}</p>
                    `;
                    $('#profile-details').html(profileDetails);
                    $('#profileModal').show(); // Show the pop-up window
                } else {
                    alert('Failed to fetch profile data');
                }
            },
            error: function (xhr, status, error) {
                console.error('Error fetching profile data:', error);
            }
        });
    });
 

    // Function to send data to update user profile
    function sendData() {
        // Serialize form data
        var formData = $('#update-profile-form').serializeArray();
        // Convert serialized form data to JSON format
        var jsonData = {};
        $.each(formData, function (index, field) {
            jsonData[field.name] = field.value;
        });
        // Add email to JSON data from local storage
        jsonData['email'] = email;
        // Convert JSON data to string
        var jsonString = JSON.stringify(jsonData);
        //Send AJAX request
        $.ajax({
            method: 'POST',
            url: './php/profile.php',
            data: jsonString,
            success: function (response) {
                alert('Data stored successfully into the database');
                console.log('Data sent successfully');
                console.log(response);
                window.location.href = "profile.html";
            },
            error: function (xhr, status, error) {
                console.error('Error sending data:', error);
            }
        });
    }

    // Bind submit event to profile update form
    $('#update-profile-form').submit(function (event) {
        event.preventDefault(); // Prevent default form submission
        sendData(); // Call the sendData function
    });

    // Function to handle logout
    function logout() {
        localStorage.removeItem('email'); // Clear email from local storage
        localStorage.removeItem('keyname'); // Clear name from local storage (if needed)
        window.location.href = "login.html"; // Redirect to login page
    }

    // Bind click event to logout button
    $('#logout-btn').click(function () {
        logout(); // Call the logout function
    });
        // Close the pop-up window when the close button is clicked
        $('#close-profile-modal').click(function() {
            $('#profileModal').hide();
        });
});
