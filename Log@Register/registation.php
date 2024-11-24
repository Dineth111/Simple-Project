<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
   <link rel="stylesheet" href="regisster.css">
</head>
<body>
    <div class="container">
        <div class="box form-box">
     
        <?php
session_start();
include("php/config.php"); // Include database connection file

if (isset($_POST['submit'])) {
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $number = $_POST['number'];
    $address = $_POST['address'];

    // Verify unique email
    $verify_query = mysqli_query($con, "SELECT Email FROM users WHERE Email='$email'");

    if (mysqli_num_rows($verify_query) != 0) {
        echo "<div class='message'>
            <p>This email is already in use. Please try another one.</p>
            </div><br>";

        echo "<a href='javascript:self.history.back()'><button class='btn'>Go back</button></a>";
    } else {
        // Insert new user into the database
        $insert_query = mysqli_query($con, "INSERT INTO users (firstname, lastname, email, password, number, address) VALUES ('$firstname', '$lastname', '$email', '$password', '$number', '$address')");

        if ($insert_query) {
            echo "<div class='message'>
                <p>Registration successful!</p>
                </div><br>";

            echo "<a href='login.php'><button class='btn'>Login Now</button></a>";
        } else {
            echo "Error occurred while registering.";
        }
    }
}
?>

            <header> Seller Registration</header>
        </div>
        <form action="" method="post">
            <div class="field input">
                <label for="firstname">First Name</label>
                <input type="text" name="firstname">
            </div>
            <div class="field input">
                <label for="lastname">Last Name</label>
                <input type="text" name="lastname">
            </div>
            <div class="field input">
                <label for="email">Email</label>
                <input type="email" name="email">
            </div>
            <div class="field input">
                <label for="password">Password</label>
                <input type="password" name="password">
            </div>
            <div class="field input">
                <label for="number">Contact Number</label>
                <input type="text" name="number">
            </div>
            <div class="field input">
                <label for="address">Address</label>
                <input type="text" name="address">
            </div>
            <div class="field checkbox">
                <input type="checkbox" id="terms" name="terms">
                <label for="terms">I agree to the terms and conditions</label>
            </div>
            <div class="field">
                <input type="submit" class="btn" name="submit" value="Register">
            </div>
        </form>
    </div>
</body>
</html>

