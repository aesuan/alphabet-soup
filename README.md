# Word-Guess-Game
Word guess.  The game!

Hi!  

Thanks for looking at this simple hangman game!

Please play full screen on a desktop browser. It requires keyboard input to play and is not optimized for minimized screens yet.

Firstly, I would like to finish cleaning up all of the soup letter characters so they look like they are actually a part of the soup.  

Right now every time a letter is guessed the whole word is reprinted.  It would be more efficient to specifically target the letters that need to be changed instead, which would require storing their indices.  This could be done by sorting words ahead of time and organizing by letter along with number of occurences and index of occurence.  This way each guess wouldn't have to loop through a whole word's worth of comparisons. 

Furthermore, the linking to image files relies on the naming of those files (ie soup_a.png).  It would be better to store the letter files in an alphabet object along with the character attribute, which you can still see I started at the top of my js though did not use.

I would like to add the ability to do phrases rather than just words, which would require storing a string array of words as well as a master word array.  This would also require dynamically resizing the letters based on word/phrase length.

Originally I did a lot of the styling with absolute rather than relative margins, heights, etc. It would be better to convert to them all to percentage.  I would like to make the whole page responsive which as of now it is not.

I initially wanted to show the incrementation of time by having ants inch towards the soup until the last life was lost, when You Lose would be spelled out in the bowl in ants.  While this makes less sense as I pivoted from picnic to diner I think it would still be fun to implement.

---

This game uses stock photos from Dreamstime as well as the fonts Tomato and Merchant Copy, all with the proper licenses.









