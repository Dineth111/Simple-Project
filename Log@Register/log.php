<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="log.css">
</head>
<body>
    <div class="container">
        <div class="box form-box">
    
 <?php       
session_start();
include("php/config.php"); // Include database connection file

if (isset($_POST['submit'])) {
    $username = mysqli_real_escape_string($con, $_POST['username']);
    $password = mysqli_real_escape_string($con, $_POST['password']);

    $result = mysqli_query($con, "SELECT * FROM users WHERE username='$username' AND password='$password'");
    $row = mysqli_fetch_assoc($result);

    if ($row && !empty($row)) {
        $_SESSION['firstname'] = $row['firstname'];
        $_SESSION['lastname'] = $row['lastname'];
        $_SESSION['email'] = $row['Email'];
        $_SESSION['number'] = $row['number'];
        $_SESSION['address'] = $row['address'];

        header("Location: home.php");
        exit; // Make sure to exit after redirecting
    } else {
        echo "<div class='message'>
            <p>Wrong username or password!</p>
            </div><br>";

        echo "<a href='login.php'><button class='btn'>Login Now</button></a>";
    }
}
?>
            <header>Login</header>
        </div>
        <form action="" method="post">
            <div class="field input">
                <label for="username">Username</label>
                <input type="text" name="username">
            </div>
            <div class="field input">
                <label for="password">Password</label>
                <input type="password" name="password">
            </div>
            <div class="field">
                <input type="submit" class="btn" name="submit" value="Login">
            </div>
            <div class="links">
                Don't have an Account? <a href="registation.html">Create an Account</a>
            </div>
        </form>
    </div>
</body>
</html>



