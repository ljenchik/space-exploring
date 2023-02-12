let planets = [
  "mercury",
  "venus",
  "earth",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
];

let facts = ["Mercury is the smallest planet in our solar system",
"Venus is the hottest planet in our solar system",
"Earth is still the only planet known to host life",
"Mars is also known as the Red Planet",
"Jupiter is the biggest planet in our Solar System",
"Saturn is adorned with a dazzling, complex system of icy rings",
"Uranus was the first planet found with the aid of a telescope in 1781",
"Neptune was the first planet located through mathematical calculations"
]

for (let i = 0; i < planets.length; i++) {
    let cardEl = $("#" + planets[i]);
    console.log(cardEl);
    let frontCardEl = $("#" + planets[i] + ".front");
    let backCradEl = $("#" + planets[i] + ".back");



// let cardEl = $("#mercury");
// let frontCardEl = $("#mercury .front");
// let backCradEl = $("#mercury .back");

frontCardEl.on("click", function (event) {
  event.preventDefault();
  frontCardEl.addClass("hide");
  backCradEl.removeClass("hide");
  getPlanetData(cardEl.attr("id"));
});

backCradEl.on("click", function (event) {
  event.preventDefault();
  backCradEl.empty();
  backCradEl.addClass("hide");
  frontCardEl.removeClass("hide");
});

function queryURL(planetName) {
  let query = `https://api.le-systeme-solaire.net/rest/bodies/${planetName}`;
  console.log(query);
  return query;
}

function getPlanetData(planetName) {
  $.ajax({
    url: queryURL(planetName),
    method: "GET",
  }).then(function (response) {
    console.log(response);
    frontCardEl.addClass("hide");
    backCradEl.removeClass('hide');
    let planetNameEl = $("<div>")
      .addClass("card")
      .append($("<h5>").text(response.englishName))
      .append($("<p>").text("Gravity: " + response.gravity))
      .append($("<p>").text("Density: " + response.density))
      .append($("<p>").text("Mass: " + response.mass.massValue))
      .append($("<p>").text("Radius: " + response.meanRadius))
      .append($("<p>").text("Temperature: " + response.avgTemp))
    if (response.moons === null) {
        planetNameEl.append($("<p>").text("Moons: " + 0))
    }
    else {
        planetNameEl.append($("<p>").text("Moons: " + response.moons.length))
    }
    planetNameEl.append($("<p>").text("Fact: " + facts[i]));
    backCradEl.append(planetNameEl);
  });
}
}
