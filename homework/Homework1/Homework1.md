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


Table 4.2 [below] summarizes some of the classes and modules you might need (and their unreasonably optimistic expected times) to develop players and zombies for the game. (The program would also need lots of other pieces not listed here to handle other parts of the game.)

Use the following table of data for Exercises 4.2 and 4.4.

Task	Time (Days)	Predecessors
 A. Robotic control module	5	 —
 B. Texture library	5	 C
 C. Texture editor	4	 —
 D. Character editor	6	 A, G, I
 E. Character animator	7	 D
 F. Artificial intelligence (for zombies)	7	 —
 G. Rendering engine	6	 —
 H. Humanoid base classes	3	 —
 I. Character classes	3	 H
 J. Zombie classes	3	 H
 K. Test environment	5	 L
 L. Test environment editor	6	 C, G
 M. Character library	9	 B, E, I
 N. Zombie library	15	 B, J, O
 O. Zombie editor	5	 A, G, J
 P. Zombie animator	6	 O
 Q. Character testing	4	 K, M
 R. Zombie testing	4	 K, N
## Problem 4.2, Stephens page 78

Use critical path methods to find the total expected time from the project's start for each task's completion.
Find the critical path. What are the tasks on the critical path?
What is the total expected duration of the project in working days?

Total Expected Duration: 32 working days.

Critical Path Tasks: The tasks with zero slack are G, H, I, D, E, M, and Q.

Critical Paths: There are two parallel critical branches at the start that converge at task D:

Path 1: G → D → E → M → Q

Path 2: H → I → D → E → M → Q
## Problem 4.4, Stephens page 78 

Build a Gantt chart for the critical path you drew in Exercise 2. Start on Wednesday, January 1, 2024, and don't work on weekends or the following holidays:

Holiday	Date
 New Year's Day	January 1
 Martin Luther King Day	January 20
 President's Day	February 17
 St. Valentine's Day	February 14
 Alien Overloard Appreciation Day	March 26
 Income Tax Day	April 15
![Gannt](images/GANNT.png)
## Problem 4.6, Stephens page 79
## Problem 4.6, Stephens page 79
How can you handle these sorts of completely unpredictable problems?
- Identify potential risks early and determine their likelihood and impact. For unpredictable events, this involves acknowledging the possibility of "unknown unknowns."
- Add extra time to the overall project schedule that is not assigned to any specific task. This "slack" acts as a safety net to absorb the impact of unforeseen delays without immediately pushing back the final delivery date.
- Use tracking tools to identify as soon as a project begins to slip so that management can make informed decisions, such as cutting features or extending deadlines, rather than ignoring the problem.

## Problem 4.8, Stephens page 79
According to your textbook, what are the two biggest mistakes you can make while tracking tasks?
- Ignoring the problem: The biggest mistake is to ignore a slipping task and hope the time can be made up later; unless there is a specific reason to believe you can catch up, you must assume you will fall farther behind.

- Adding manpower to a late project: The second biggest mistake is to add extra developers to a late task and assume they can reduce the time needed to finish it, as the time required to get new people up to speed often makes the project even later

## Problem 5.1, Stephens page 114
List five characteristics of good requirements.
1. Clear: They must be concise, easy to understand, and stated in concrete, no-nonsense terms.

2. Unambiguous: They must be worded so that they cannot be interpreted in more than one way.

3. Consistent: They must not contradict each other and should not provide so many constraints that the problem becomes unsolvable.

4. Prioritized: They should be categorized (e.g., using the MOSCOW method) so that low priority items can be deferred if time or budget runs out.

5. Verifiable: They must be limited and precisely defined so it is easy to determine whether the finished application actually meets them.


## Problem 5.3, Stephens page 114

### Requirement Categorization

* **Business Requirements** :
* **g.** Make uploads/downloads transfer at least 8 Mbps. 

* **User Requirements** (What the user can do):
* **a.** Allow users to monitor uploads/downloads while away from the office.
* **b.** Let the user specify website log-in parameters...
* **c.** Let the user specify upload/download parameters...
* **d.** Let the user select an Internet location, a local file, and a time...
* **e.** Let the user schedule uploads/downloads at any time.
* **l.** Let the user empty the log.
* **m.** Display reports of upload/download attempts.
* **n.** Let the user view the log reports on a remote device such as a phone.

* **Functional Requirements** (How the system behaves internally):
* **f.** Allow uploads/downloads to run at any time.
* **h.** Run uploads/downloads sequentially.
* **i.** If an upload/download is scheduled for a time when another is in progress, it waits until the other one finishes.
* **j.** Perform scheduled uploads/downloads.
* **k.** Keep a log of all attempted uploads/downloads and whether they succeeded.
* **o.** Send an e-mail to an administrator if an upload/download fails...
* **p.** Send a text message to an administrator if an upload/download fails...


**Are there requirements in every category?**
Yes, there are requirements in all three categories (Business, User, and Functional).


## Problem 5.9, Stephens page 115

Figure 5-1 [right] shows the design for a simple hangman game that will run on smartphones. When you click the New Game button, the program picks a random mystery word from a large list and starts a new game. Then if you click a letter, either the letter is filled in where it appears in the mystery word, or a new piece of Mr. Bones's skeleton appears. In either case, the letter you clicked is grayed out so that you don't pick it again. If you guess all the letters in the mystery word, the game displays a message that says, "Contratulations, you won!" If you build Mr. Bones's complete skeleton, a message says, "Sorry, you lost."

Brainstorm this application and see if you can think of ways you might change it. Use the MOSCOW method to prioritize your changes.

1. Must Have 

Categorized Word Lists: Instead of one "large list," players should choose categories (e.g., Animals, Movies, Tech). This makes the game feel more structured.

Responsive Layout: The UI must adapt to different screen sizes and orientations (Portrait vs. Landscape).

Visual Feedback for Wins/Losses: Clearer, more engaging endgame screens than just a simple text message.

Input Validation: Ensuring the keyboard only allows alphabetical characters and handles "New Game" resets properly.

2. Should Have 

Difficulty Settings: Easy (short words/more guesses), Medium, and Hard (long words/fewer guesses).

Hint System: A button that reveals a letter or gives a definition in exchange for points.

Score Tracking: A "Current Streak" and "High Score" counter to keep players coming back.

Sound Effects: "Click" sounds for letters, a "Success" chime, and a "Rattle" when a bone appears.

3. Could Have 

Themed Avatars: Instead of just "Mr. Bones," let players unlock different characters or outfits to be built piece by piece.

Dark Mode Support: A system-level toggle for night-time play.

Social Sharing: A button to share a "Win" graphic or your current streak on social media.

Haptic Feedback: Subtle vibrations when a player makes an incorrect guess.

4. Won't Have 

Real-time Multiplayer: Connecting two players over the internet is technically complex and changes the "simple" nature of the design.

In-App Purchases: For a simple learning project, we’ll avoid the complexity of payment gateways and digital currency.

3D Animations: Keeping the skeleton as 2D art simplifies development and ensures it runs on older smartphones.
