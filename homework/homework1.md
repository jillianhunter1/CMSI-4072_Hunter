# Homework 1

## Problem 1.1, Stephens page 13

What are the basic tasks that all softare engineering projects must handle?
- Requirements Gathering 
- High-level Design 
- Low-level Design 
- Development 
- Testing 
- Deployment 
- Maintenance 
- Wrap-up

## Problem 1.2, Stephens page 13

Give a one sentence description of each of the tasks you listed in Exercise 1.
- Requirements Gathering: This task involves identifying exactly what the customers want and need from the software.
- High-level Design: This involves making major structural decisions, such as choosing a platform (e.g., desktop or mobile) and breaking the project into large functional chunks.
- Low-level Design: This task provides detailed information on how specific pieces of the project should work to guide the developers who will implement them .
- Development: During this phase, programmers refine the designs and implement them into actual program code.
- Testing: This task is used to find and remove as many bugs as reasonably possible to ensure the application is usable.
- Deployment: This involves rolling out the finished software to users, which may include tasks like user training and hardware installation .
- Maintenance: This ongoing task involves fixing bugs discovered by users and implementing new features or enhancements .
- Wrap-up: This final step involves performing a "post-mortem" to evaluate what went right and wrong during the project for future improvement.
## Problem 2.4, Stephens page 27
Investigation: Compare this process to what you can do with GitHub versions. How are the two tools different? How are they the same?
Similarities: 
- Historical Tracking: Both tools allow users to fetch older versions of a file by specifying a date or version/commit identifier.
- Change Comparison: Both enable users to compare two versions to see what changed, who changed it, and when.
- Collaboration: Both systems prevent "race conditions" where two people might overwrite each other's work by managing how changes are saved.

Differences: 
Granularity of Tracking:
-  * Google Docs is a "document revision system" that understands paragraph and word flow. It recognizes when a single word is inserted into a paragraph without flagging every subsequent line as changed.
- GitHub (Source Control) is "line-oriented." Because code is written in lines for human readability, a source control system typically flags an entire line as changed even if only one character was modified .

Frequency of Changes:
- Source code control is designed for a higher volume of changes. While a document might have a dozen versions, a code module in a system like GitHub may have hundreds or thousands of "commits".

Editing Locks: 
- Google Docs allows multiple people to collaborate simultaneously on the same shared document.
- Github often uses a "check-out" system where only one person can edit a specific module at a time to avoid conflicts.

Metadata and Notes: 
- GitHub focus heavily on "commit messages" or notes indicating why a change was made, which is a primary feature for developers, whereas this is often a secondary or less common feature in basic document management.
## Problem 2.5, Stephens page 27
What does JBGE stand for and what does it mean?
- The JBGE ("Just Barley Good Enough") philosophy suggests that developers should provide only the absolute minimum amount of documentation and comments necessary to understand the code.

 

 
