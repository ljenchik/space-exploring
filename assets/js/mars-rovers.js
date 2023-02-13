nasaApikey = "zhH0KJERQo5hx19MxD3hGmt6jiaOqgfd8bmoWQPd";

let perseveranceCard = $("img#Perseverance");
let curiosityCard = $("img#Curiosity");
let twinsCard = $('img#Twins');

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
let currentDate = new Date().toISOString().split('T')[0];
let backButtonLink = $("<a>").text("<< Back to Rovers").addClass('hide');
$('.jumbotron-container').append(backButtonLink);

cards = [perseveranceCard, curiosityCard, twinsCard];
rovers = [['Perseverance', '18/02/2021', currentDate], 
['Curiosity', '08/08/2012', currentDate], 
['Spirit', '05/01/2004', '21/03/2010']
];

roversToDisplay = ['Perseverance', 'Curiosity', 'Spirit and Opportunity'];

for (let i = 0; i < rovers.length; i++) {  
  cards[i].on("click", function (event) {
    event.preventDefault();

    $(".container-fluid").addClass('hide');
    $(".choose-rover").addClass('hide');
    backButtonLink.removeClass('hide');

    $(".datepicker-text").removeClass("hide");
      $("#roverName").text(`${roversToDisplay[i]}`);
    carouselContainer.removeClass("hide");


    $("#datepicker").prop("defaultValue", (rovers[i][1]));
    queryImages(rovers[i][0].split("/").reverse().join("-"), rovers[i][1].split("/").reverse().join("-"));

    datepickerEl.datepicker({
      dateFormat: "dd/mm/yy",
      minDate: rovers[i][1], 
      maxDate:  rovers[i][2],
      setDate: "-0d",
      defaultDate:  rovers[i][1],
      autoclose: true,
      onSelect: function (selectedDate) {
        $(".carousel-item").removeClass("active");
        // Formats date to yyy-mm-dd for api query
        queryImages(rovers[i][0], selectedDate.split("/").reverse().join("-"));
      },
    });
  });
}

// Build query
function roverQueryURL(roverName, date) {
    let query =
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?`;
    let queryParams = { api_key: nasaApikey };
    queryParams.earth_date = date;
    console.log(query + $.param(queryParams));
    return query + $.param(queryParams);
  }

function queryImages(selectedDate, roverName) {
  $.ajax({
    url: roverQueryURL(selectedDate, roverName,),
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

backButtonLink.on('click', function(event) {
  event.preventDefault();
  $('.datepicker-text').addClass('hide');
  $('.carousel-container').addClass('hide');
  $(".container-fluid").removeClass('hide');
  $(".choose-rover").removeClass('hide');
  backButtonLink.addClass('hide');
})

// style datepicker
