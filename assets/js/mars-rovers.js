nasaApikey = "zhH0KJERQo5hx19MxD3hGmt6jiaOqgfd8bmoWQPd";

let perseveranceEl = $("#Perseverance");
let dateInput = "2021-02-18"


perseveranceEl.on("click", function (event) {
    event.preventDefault();
    let marsImagesEl = $("#mars-images");
    let datePickerDateEl = $("#datepicker");

    $(".container-fluid").empty();
    marsImagesEl.removeClass('hide');

    datePickerDateEl.datepicker({
      onSelect: function(dateText) {
          console.log(dateText);
          dateInput = dateText;
            minDate = 1;
      }
    });
  })

  $.ajax({
      url: perseveranceQueryURL(dateInput),
      method: "GET",
    }).then(function (response) {
      console.log(response.photos[0].img_src);

  })


  function perseveranceQueryURL(date) {
    let query = "https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?";
    let queryParams = { api_key: nasaApikey};
    queryParams.earth_date = date;
    return query + $.param(queryParams);
  }
 
 // style datepicker
 // carousel for images
 // text for header
 // media queries for the cards