nasaApikey = "zhH0KJERQo5hx19MxD3hGmt6jiaOqgfd8bmoWQPd";
let imageEl = $("#Perseverance");
let titleEl = $("#Perseverance-rover");
let marsImagesEl = $("#mars-images");
let datepickerEl =  $("#datepicker");
let datepickerTextEl =  $("#choose-date");
let selectedImages = [];


imageEl.on("click", function (event) {
  event.preventDefault();
  
  $(".container-fluid").empty();
  datepickerEl.removeClass("hide");
  datepickerTextEl.removeClass("hide");


  datepickerEl.datepicker({
    dateFormat: "dd/mm/yy",
    minDate: new Date("2021-02-18"),
    maxDate: new Date(),
    onSelect: function (selectedDate) {
      console.log(selectedDate);
      queryImages(new Date(selectedDate).toISOString());
    }
});
});


function perseveranceQueryURL(date) {
  if (date) {
    let query =
      "https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?";
    let queryParams = { api_key: nasaApikey };
    queryParams.earth_date = date;
    console.log(query + $.param(queryParams));
    return query + $.param(queryParams);
  }
}

function queryImages(selectedDate) {
  $.ajax({
    url: perseveranceQueryURL(selectedDate),
    method: "GET",
  }).then(function (response) {
    console.log(response.photos);
    $(".mars-images").removeClass("hide");

    let images = response.photos;
    // Shuffle array
    const shuffled = images.sort(() => 0.5 - Math.random());
    // Get sub-array of first n elements after shuffled
    let selected = shuffled.slice(0, 10);

    selected.forEach(item => selectedImages.push(item.img_src));
    console.log(selectedImages);
    
    let active = $("<div>").addClass('carousel-item active').append($("<img>").attr('src', selectedImages[0]));
    $(".carousel-inner").append(active);

    for (let i = 1; i < selectedImages.length; i++) {
      let imageEl = $("<div>").addClass('carousel-item').append($("<img>").attr('src', selectedImages[i]));
      $(".carousel-inner").append(imageEl);
    }

  });
}

// style datepicker
// carousel for images
// text for header
// media queries for the cards
// back button
// work on other cards
