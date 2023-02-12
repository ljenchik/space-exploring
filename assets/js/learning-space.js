let planetImageEl = $('img');

planetImageEl.on("click", function (event) {
    event.preventDefault();
    getPlanetData(planetImageEl.attr('id'));
  });
  
  function queryURL(planetName) {
      let query =
        `https://api.le-systeme-solaire.net/rest/bodies/${planetName}`;
      console.log(query);
      return query;
  }
  
  function getPlanetData(planetName) {
    $.ajax({
      url: queryURL(planetName),
      method: "GET",
    }).then(function (response) {
      console.log(response);
    });
  }
  