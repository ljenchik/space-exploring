nasaApikey = "zhH0KJERQo5hx19MxD3hGmt6jiaOqgfd8bmoWQPd";

let perseveranceEl = $("#Perseverance");
let marsImagesEl = $("#mars-images");


perseveranceEl.on("click", function (event) {
    event.preventDefault();

  $(".container-fluid").empty();
    let datePickerEl = $("<div>");
    let datePickerText = $("<p>").text('Choose a date to see images taken by Perseverance on this date');
    datePickerEl.append(datePickerText).addClass('date-label');

    let datePickerDateEl = $("<input>").attr("id", "perseverance-images").attr("type", "text").datepicker();
    datePickerEl.append(datePickerDateEl);
    


    let date = $("#perseverance-images").val();
    console.log(moment(date).format("DD/MM/YYYY"));

    marsImagesEl.append(datePickerEl);
  })


 

 
