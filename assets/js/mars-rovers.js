nasaApikey = "zhH0KJERQo5hx19MxD3hGmt6jiaOqgfd8bmoWQPd";
let imageEl = $("#Perseverance");
let titleEl = $("#Perseverance-rover");
let marsImagesEl = $("#mars-images");
let datepickerEl = $("#datepicker");
let datepickerTextEl = $("#choose-date");
let heroImages = $(".carousel-inner");
let carouselIndicators = $(".carousel-indicators");
let carouselContainer = $(".carousel-container");
let prevArrow = $(".carousel-control-prev");
let nexrArrow = $(".carousel-control-next");
let errorMessage = $("<div>").addClass("error-message");
let selectedImages = [];

imageEl.on("click", function (event) {
  event.preventDefault();

  $(".container-fluid").empty();
  $(".datepicker-text").removeClass("hide");
  carouselContainer.removeClass("hide");

  queryImages("2021-02-18");

  datepickerEl.datepicker({
    dateFormat: "dd/mm/yy",
    minDate: "18/02/2021",
    defaultDate: "18/02/2021",
    autoclose: true,
    onSelect: function (selectedDate) {
      // Formats date to yyy-mm-dd for api query
      $(".carousel-item").removeClass("active");
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
    if (!response.photos || response.photos.length === 0) {
      
      heroImages.empty();
      carouselIndicators.empty();
      prevArrow.addClass("hide");
      nexrArrow.addClass("hide");

      errorMessage.text(
        "Np photographs were taken on this date. Please choose another date"
      );
      carouselContainer.append(errorMessage);
    } else {
      errorMessage.empty();
      heroImages.empty();
      carouselIndicators.empty();
      prevArrow.removeClass("hide");
      nexrArrow.removeClass("hide");

      let images = response.photos;
      // Shuffle array
      const shuffled = images.sort(() => 0.5 - Math.random());
      // Get sub-array of first n elements after shuffled
      let selected = shuffled.slice(0, 10);
      selectedImages = [];
      selected.forEach((item) => selectedImages.push(item.img_src));
      console.log(selectedImages);

      // First hero image
      let heroImage = $("<div>")
        .addClass("carousel-item active")
        .append($("<img>").attr("src", selectedImages[0]));
      heroImages.append(heroImage);

      // Hero images
      for (let i = 1; i < selectedImages.length; i++) {
        let imageEl = $("<div>")
          .addClass("carousel-item")
          .append($("<img>").attr("src", selectedImages[i]));
        heroImages.append(imageEl);
      }

      // First active thumb
      let activeThumb = $("<li>").addClass("list-inline-item").addClass('active');
      let activeThumbLink = $("<a>")
        .attr("id", "carousel-selector-0")
        .addClass("selected")
        .attr("data-slide-to", "0")
        .attr("data-target", "#custCarousel");
      activeThumbLink.append(
        $("<img>").attr("src", selectedImages[0]).addClass("img-fluid")
      );
      activeThumb.append(activeThumbLink);
      carouselIndicators.append(activeThumb);

      for (let i = 1; i < selectedImages.length; i++) {
        let thumb = $("<li>").addClass("list-inline-item");
        let thumbLink = $("<a>")
          .attr("id", `carousel-selector-${i}`)
          .addClass("selected")
          .attr("data-slide-to", `${i}`)
          .attr("data-target", "#custCarousel");
        thumbLink.append(
          $("<img>").attr("src", selectedImages[i]).addClass("img-fluid")
        );
        thumb.append(thumbLink);
        carouselIndicators.append(thumb);
      }
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
