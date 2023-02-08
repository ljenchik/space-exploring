nasaApikey = "zhH0KJERQo5hx19MxD3hGmt6jiaOqgfd8bmoWQPd";

let perseveranceEl = $("#Perseverance");
let marsImagesEl = $("#mars-images");


perseveranceEl.on("click", function (event) {
    event.preventDefault();

  $(".container-fluid").empty();
    let datePickerEl = $("<div>").text('Choose a date to see images taken by Perseverance on this date');
    
    let datePickerDateEl = $("#datepicker").datepicker();
    datePickerEl.append(datePickerDateEl);
    
    let dateEl = datePickerDateEl.val();
    console.log(moment(dateEl).format("DD/MM/YYYY"));

    marsImagesEl.append(datePickerEl);
  })


 

 
