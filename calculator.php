<?php
// Check if two command line arguments are provided
if ($argc != 3) {
    echo "Usage: php calculator.php <number1> <number2>\n";
    exit(1);
}

// Retrieve the two numbers from command line arguments
$number1 = $argv[1];
$number2 = $argv[2];

// Validate that the provided arguments are numeric
if (!is_numeric($number1) || !is_numeric($number2)) {
    echo "Please provide valid numeric arguments.\n";
    exit(1);
}

// Perform the multiplication operation
$result = $number1 * $number2;

// Display the result
echo "Result: $result\n";
?>