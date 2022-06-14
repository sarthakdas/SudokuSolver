**CID:** 01897538

# Project
This repository is for the submission of your **Computing 2: Applications** coursework.

You should complete the proforma and populate this repository with your project submission.

* **Repository Creation Check:** Tuesday 4th May 18:00 – Update your CID in this file to check your submission.
* **Peer Assessment Deadline:** Tuesday 8th June 18:00
* **Final Submission Deadline:** Thursday 17th June 16:00

# Computing 2 Submission Proforma



## Brief
My program is designed to take in half complete or non-complete sudoku boards and attempts to solve them in an algorithmic approach. The end result is that the web app should display the complete board, or throw an error if the board is impossible. This web app can be used to solve newpaper problems or to validate human generated sudoku to see if they can actually be solved or if they are impossible to be solved.  

## Coding
First, the algorithm was designed to solve the sudoku using a backtracking algorithm, this involved the development of each function in a functional style making sure most were pure. Unit tests were used to check that all the functions worked the following test cases were used: solved board, empty board, partially complete board, impossible board, raw input board. Property-based testing was then used to ensure that these functions worked as described as well. Next, the front end was developed with the HTML and CSS this also incorporated some javascript elements for the UI such as the model pop up, this was tested on multiple screen sizes to ensure responsive design. The algorithmic part was then moved to the client-side and then checked everything still worked correctly. After this was done this was then moved to the server-side and the implementation of ajax and the handler was done, to meet the server-side criteria. Error handling was then incorporated for if an invalid number was pressed or if a letter was entered instead, to make the program more robust. 

## UX/UI
The UI was designed to be minimal to make sure it is open to all people even with those with accessibility issues. The sudoku form can be filled out using 'tab' to move around the board rather than using the mouse, this is also for the buttons that can be tabbed to. The minimal use of colour is to stick with the simple minimalist theme which extends from Japanese tradition, who are also the creators of sudoku. This was also to make sure it was accessible to people with colour blindness. The simple use of text focuses on the core elements describing the instructions and what went wrong. This allows more of the front end to put focus on the sudoku board. The website also uses percentages for the CSS to ensure the front-end is responsive so it can be access from a variety of screen sizes from tablets to large monitors of all aspect ratios. 

## Data
On the static side, the main javascript file handles most od the client side data processing such as the handling of the basic daata and sanetisation. Interactions.js handles all the modal javascript and any of the animations of the website. Main takes the data from the input boxes and then forms a JSON query which it then sends over to the serverside which then uses the handler to handle the request and then calls solver object to solve the sodoku and form the promise back to the client side. This then takes it and then processes the result and displays it to the screen. The sudoku is stored as a 2D array, which uses functional programming ot be manipulated, the object solver is broken down into individual functions for a functinal programing style and for easier debugging. 


## Debugging
Debugging I used breakpoints and debugg to see what values were stored in the memory, this as useful as I was unsure of what data types certain array end up when converting a string to an int, for the data sanitisation. I used unit testing and property based testing to check for errors in funtions to see if it worked for edge cases. Using inspect element the console log was used to see the output of variables the network traffic monitor was also used to check what data is being sent from the client to the server 


## Best Practice
All variables was typed in snake case and all objects were written in camelcase to make sure it is easy to distinguish which one is which. The code is broken up into different files to make it easier to debug and the majority of the code is written in function as well for easier testing. Indentation is used to make sure that everything is correct and passed JSLint. HTML Javascript and the CSS is broken up into its respective files to make it easier to code cad correct code. The use of GitHub for pushes incase a major change was made and to have version console over the project as it was developed and more features were added. There was also use of comment in the code to help describe each function and line to allow another coder to understand what the code is doing. 