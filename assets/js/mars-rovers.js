nasaApikey = "zhH0KJERQo5hx19MxD3hGmt6jiaOqgfd8bmoWQPd";
let imageEl = $("#Perseverance");
let titleEl = $("#Perseverance-rover");
let marsImagesEl = $("#mars-images");
let datepickerEl = $("#datepicker");
let datepickerTextEl = $("#choose-date");
let thumbsList = $("ol");
let selectedImages = [];

imageEl.on("click", function (event) {
  event.preventDefault();

  $(".container-fluid").empty();
  datepickerEl.removeClass("hide");
  datepickerTextEl.removeClass("hide");

  queryImages("2021-02-18");

  datepickerEl.datepicker({
    dateFormat: "dd/mm/yy",
    minDate: "18/02/2021",
    defaultDate: "18/02/2021",
    "autoclose": true,
    onSelect: function (selectedDate) {
      // Formats date to yyy-mm-dd for api query
      $(".carousel-item").removeClass('active');
      selectedImages = [];
      queryImages(selectedDate.split("/").reverse().join("-"));
    },
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

    let images = response.photos;
    // Shuffle array
    const shuffled = images.sort(() => 0.5 - Math.random());
    // Get sub-array of first n elements after shuffled
    let selected = shuffled.slice(0, 10);

    selectedImages = [];
    selected.forEach((item) => selectedImages.push(item.img_src));
    console.log(selectedImages);

    $("#left-arrow").removeClass("hide");
    $("#right-arrow").removeClass("hide");
    $("#thumbs-list").removeClass("hide");

    let active = $("<div>")
      .addClass("carousel-item active")
      .append($("<img>").attr("src", selectedImages[0]));
    $(".carousel-inner").append(active);

    // First active thumbnail image
    let activeThumb = $("<li>").addClass("list-inline-item active");
    let thumbLinkActive = $("<a>")
      .attr("id", "carousel-selector-0")
      .addClass("selected")
      .attr("data-slide-to", "0")
      .attr("data-target", "#custCarousel");
    activeThumb.append(thumbLinkActive);
    thumbLinkActive.append(
      $("<img>").attr("src", selectedImages[0]).addClass("img-fluid")
    );
    thumbsList.append(activeThumb);

    for (let i = 1; i < selectedImages.length; i++) {
      // Adds images to hero section
      let imageEl = $("<div>")
        .addClass("carousel-item")
        .append($("<img>").attr("src", selectedImages[i]));
      $(".carousel-inner").append(imageEl);

      // Adds images to thumbnail section
      let thumb = $("<li>").addClass("list-inline-item");
      let thumbLink = $("<a>")
        .attr("id", `carousel-selector-${i}`)
        .attr("data-slide-to", `${i}`)
        .attr("data-target", "#custCarousel");

      thumb.append(thumbLink);
      thumbLink.append(
        $("<img>").attr("src", selectedImages[i]).addClass("img-fluid")
      );
      thumbsList.append(thumb);
    }
  });
}




// style datepicker
// carousel for images
// text for header
// media queries for the cards
// back button
// work on other cards
// style carousel
// chceck dates for datepicker to start with the correct date
// error message if no images on that day
