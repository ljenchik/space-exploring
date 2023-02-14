# Space Exploring

## The application is live at: https://ljenchik.github.io/space-exploring/

Welcome to Space Exploring! It's a website for children about space which was created by the team of two (ljenchik and Mateusuk). The website allows users to explore interesting facts about our solar system, view images taken by Mars rovers, and score the most in the space quiz. We used the data from NASA Open API (https://api.nasa.gov) and The Solar System OpenData (https://api.le-systeme-solaire.net/en/).


## User Story

```text
AS a user I want to see learn about Space and Mars Rovers, view images from Mars and take a quiz to test my knowledge about our Solar System.
```

  * When a user opens a home page they are presented with the carousel of space images that also serve as links to the other website pages: Learning Space, Mars Rovers and Quiz.
  * Home page is featured with the section of interesting facts about space and the following paragraphs that lead to the other pages of the website.
    * Learning Space page displays eight cards with the planets. When a user clicks on the card, the information about the corresponding planet appears on the back of the card.
    * Mars Rovers page presents the three images of Mars rovers as well as some data about them and the links for further reading. When a user clicks on one of the rovers, they see a datepicker, need to choose a date, and then will view ten random images taken by the chosen rover on the chosen date. If no images were taken on the date, the error message will be displayed promptin a user to choose another date.
  * A multiple choices quiz  which contains twelve random questions about space is located on Quiz page. When a user clicks on a start button a timer starts and the first question appears. Only one of the available answers can be chosen. When answer is clicked, the next question appears. If the answer clicked was incorrect then ten seconds are subtracted from the timer. The quiz ends when all questions are answered or the timer reaches 0. When the game ends, it displays a table with players' initials and their scores.  

<p float="center">
<img src="./assets/screenshots/screenshot1.png" alt="input field for city" width="300"/>
<img src="./assets/screenshots/screenshot2.png" alt="two cities in the list of cities" width="300"/>
<img src="./assets/screenshots/screenshot3.png" alt="two cities in the list of cities" width="300"/>
</p>



