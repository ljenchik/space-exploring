let scoresRank = document.getElementById("highscores");
let clearScore = document.getElementById("clear");




function clear(){
    scoresRank.textContent = " ";
    localStorage.clear();
}

// button clear
clearScore.addEventListener("click", clear);


// get scores from localStorage
let scores = JSON.parse(localStorage.getItem("scores"));

// To display the scores in a ranked order
scores.sort(function (a, b) {
    return b.score - a.score;
  });
//   loop through the sorted array of score objects, displaying the initials and score properties, and also the rank.
let highscores = "";
for (let i = 0; i < scores.length; i++) {
  highscores += (i+1) + ". " + scores[i].initials + " - " + scores[i].score + "<br>";
}
scoresRank.innerHTML = highscores;