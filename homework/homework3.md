### Problem 7.1: The greatest common divisor (GCD) of two integers is the largest integer that evenly divides them both. For example, the GCD of 84 and 36 is 12, because 12 is the largest integer that evenly divides both 84 and 36. You can learn more about the GCD and the Euclidean algorithm, which you can find at en.wikipedia.org/wiki/Euclidean_algorithm. [Hint: It should take you only a few seconds to fix these comments. Don't make a career out of it.]           

// Use Euclid's algorithm to calculate the GCD.    
private long GCD(long a, long b)    
{    
    for (;;)    
    {    
        long remainder = a % b;    
    
        if (remainder == 0) return b;    
     
        a = b;    
        b = remainder;    
    }
}

### Problem 7.2: According to your textbook, under what two conditions might you end up with the bad comments shown in the previous code?             
**Answer:** 
1. Comment Rot: This occurs when the source code is modified or refactored, but the developers neglect to update the accompanying comments, leading to misleading or incorrect information.
2. Redundancy: When comments simply restate the code's syntax (the "what") instead of explaining the logic's purpose (the "why"). These add clutter without providing actual insight.

### Problem 7.4: How could you apply offensive programming to the modified code you wrote for exercise 3? [Yes, I know that problem wasn't assigned, but if you take a look at it you can still do this exercise.]                     
**Answer:** Offensive programming involves making the code "fail-fast." In the GCD method, this means adding Guard Clauses to throw an exception immediately if inputs are zero or negative, forcing the caller to fix the invalid data.       

### Problem 7.6: Should you add error handling to the modified code you wrote for Exercise 4? Explain your reasoning.              
**Answer:** Yes. Error handling prevents undefined behavior (like division by zero) and improves reliability. It makes debugging easier by identifying exactly where and why the program failed.

### Problem 7.7: Using top-down design, write the highest level of instructions that you would use to tell someone how to drive your car to the nearest supermarket. (Keep it at a very high level.) List any assumptions you make.                     
High-Level Instructions:
Start and check the vehicle.
Navigate to the main road.
Drive to the supermarket destination.
Park and secure the car.
Assumptions:
The driver is licensed and capable.
The car is functional and fueled.
The location is known or accessible via GPS.   
     
### Problem 8.1: Two integers are relatively prime [or coprime] if they have no common factors other than 1. For example, 21 = 3 X 7 and 35 = 5 X 7 are not relatively prime because they are both divisible by 7. However, integers 8 = 2 X 4 and 9 = 3 X 3 ARE relatively prime because the only common factor they have is 1 [even though NEITHER of them is prime by itself!] By definition -1 and 1 are relatively prime to every integer, and they are the only numbers relatively prime to 0.

Suppose you've written an efficient isRelativelyPrime() method that takes two integers between -1 million and 1 million as parameters and returns true if they are relatively prime. Use either your favorite programming language or pseudocode to write a program that tests the isRelativelyPrime() method.
[Hint: You may find it useful to write the isRelativelyPrime() method itself as well.]

FUNCTION isRelativelyPrime(a, b):
    // Convert to positive since signs don't affect factors
    x = absoluteValue(a)
    y = absoluteValue(b)

    // RULE: 1 and -1 are always relatively prime to everything
    IF x == 1 OR y == 1: 
        RETURN true
    
    // RULE: 0 is only relatively prime to 1 or -1
    IF x == 0 OR y == 0:
        RETURN (x == 1 OR y == 1)

    // GENERAL CASE: If their Greatest Common Divisor is 1, they are coprime
    IF GCD(x, y) == 1:
        RETURN true
    ELSE:
        RETURN false

// TEST PROGRAM: 
    // Test 1: Standard coprime numbers
    ASSERT isRelativelyPrime(8, 9) == true
    // Test 2: Standard non-coprime numbers (both divisible by 7)
    ASSERT isRelativelyPrime(21, 35) == false
    // Test 3: Large boundary numbers
    ASSERT isRelativelyPrime(1000000, 999999) == true
    // Test 4: Negative number handling
    ASSERT isRelativelyPrime(-1, 500) == true
    // Test 5: The zero rule
    ASSERT isRelativelyPrime(0, 1) == true
    ASSERT isRelativelyPrime(0, 5) == false

    PRINT "All tests passed successfully!"
  
### Problem 8.3: What testing techniques did you use for the program in Exercise 8.1? [Exhaustive, black-box, white-box, or gray-box?]
- Which ones could you use and under what circumstances? [Justify your answer with a short paragraph to explain.]        
Used: Black-Box Testing, because tests were based on functional requirements, not code structure.
Others: White-Box (to test every logical branch), Gray-Box (to test known loop boundaries), or Exhaustive (testing every possible input, though impractical for large number ranges).       

### Problem 8.5: The following code shows a C# version of the areRelativelyPrime() method and the GCD method it calls.           
**Answer:** Testing ensures the logic handles edge cases (like 1 or negative numbers) that are easily missed. It also acts as a safety net, allowing for future code optimizations without risking broken functionality.
    
### Problem 8.9: Exhaustive testing actually falls into one ot the categories black-box, white-box, or gray-box. Which one is it and why?        
**Answer:** Exhaustive testing is primarily Black-Box because it verifies all possible inputs against expected outputs. However, it is also White-Box in practice because testing every input naturally exercises every possible execution path in the code.


###Problem 8.11: Suppose you have three testers: Alice, Bob, and Carmen. You assign numbers to the bugs so the testers find the sets of bugs {1, 2, 3, 4, 5}, {2, 5, 6, 7}, and {1, 2, 8, 9, 10}. How can you use the Lincoln index to estimate the total number of bugs? How many bugs are still at large?
To estimate the total bugs using the Lincoln Index for Alice, Bob, and Carmen, you calculate the estimate for each pair and average them.

1. Calculate Pair Estimates

The formula is: (Bugs by Tester A × Bugs by Tester B) / Common Bugs

Alice (5) & Bob (4): (5 × 4) / 2 common {2, 5} = 10.0

Alice (5) & Carmen (5): (5 × 5) / 2 common {1, 2} = 12.5

Bob (4) & Carmen (5): (4 × 5) / 1 common {2} = 20.0

2. Final Estimate

Average Estimate: (10 + 12.5 + 20) / 3 ≈ 14 bugs total

Unique Bugs Found: {1, 2, 3, 4, 5, 6, 7, 8, 9, 10} = 10 bugs

Bugs at Large: 14 (estimated) - 10 (found) = 4 bugs remaining


### Problem 8.12: What happens to the Lincoln estimate if the two testers don't find any bugs in common? What does it mean? Can you get a lower bound estimate of the number of bugs?         
**Answer:** If two testers find no common bugs, the Lincoln Index formula results in a division by zero, leading to an undefined or "infinite" estimate. This suggests the current data is insufficient to statistically predict the total bug count.

Meaning: This typically implies the testers haven't performed enough testing, or the bug pool is so vast that the chance of overlap is currently negligible.

Lower Bound: You can calculate a conservative lower bound by assuming the next bug found would have been a shared one (effectively treating the overlap as 1).
