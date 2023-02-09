nasaApikey = "zhH0KJERQo5hx19MxD3hGmt6jiaOqgfd8bmoWQPd";
let imageEl = $("#Perseverance");
let titleEl = $("#Perseverance-rover");
let marsImagesEl = $("#mars-images");
let selectedImages = [];

imageEl.on("click", function (event) {
  event.preventDefault();
  

  $(".container-fluid").empty();
  marsImagesEl.removeClass("hide");

  let selectedDate = '2021-02-18';
  $("#datepicker").datepicker({
    dateFormat: "dd/mm/yyyy",
    inline: true,
    minDate: "2021-02-18",
    maxDate: moment(),
    onSelect: function () {
      selectedDate = $("#datepicker").val();
    }
  });

  console.log(selectedDate);

  $.ajax({
    url: perseveranceQueryURL(selectedDate),
    method: "GET",
  }).then(function (response) {
    console.log(response.photos);

    let images = response.photos;
    // Shuffle array
    const shuffled = images.sort(() => 0.5 - Math.random());

    // Get sub-array of first n elements after shuffled
    let selected = shuffled.slice(0, 10);
    console.log(selectedImages);
    selected.forEach(item => selectedImages.push(item.img_src));
    console.log(selectedImages);

    selectedImages.forEach(element => {
      let img = $("<img>").attr('src', element);
      marsImagesEl.append(img);
    })

  });

  // titleEl.on("click", function (event) {
  //   event.preventDefault();
  //   let marsImagesEl = $("#mars-images");
  //   let datePickerDateEl = $("#datepicker");

  //   $(".container-fluid").empty();
  //   marsImagesEl.removeClass('hide');

  //   datePickerDateEl.datepicker({
  //     onSelect: function(dateText) {
  //         console.log(dateText);
  //         dateInput = dateText;
  //           minDate = 1;
  //     }
  //   });
  // })

  // $.ajax({
  //     url: perseveranceQueryURL(dateInput),
  //     method: "GET",
  //   }).then(function (response) {
  //     console.log(response.photos);
  // })
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

$(function () {
  $("#datepicker").datepicker();
  var a = $("#datepicker").datepicker("getDate");
  console.log(a);
});

// style datepicker
// carousel for images
// text for header
// media queries for the cards
// back button
// work on other cards
