
/**if(window.location.protocol != "https:") {
  window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);

// Function that alters the protocol of URLs from http to https
}
**/
//console.log(location.href);

/**
if (navigator.geolocation) {

       navigator.geolocation.getCurrentPosition(function(position){
 
  console.log('done');
         
//var latlon='lat='+position.coords.latitude+'&lon='+position.coords.longitude;
          var latlon = {};
        					latlon['lat'] = 'lat='+position.coords.latitude;
				latlon['long'] = '&lon='+position.coords.longitude;
        return loadWeather(latlon);

  function geo_error() {
  alert("Sorry, no position available.");
}

var geo_options = {
  enableHighAccuracy: true, 
  maximumAge        : 75000, 
  timeout           : 27000
};

 navigator.geolocation.watchPosition(latlon, geo_error, geo_options);      
        
        
   }, function(error) {
        
       console.log('nothing');
    },{ timeout: 30000 });
 
}  else {
     
    alert('Geolocation is not supported by your browser');
                                              

 }

**/
    $(document).ready(function(){    
function getIPAddress() {
  var city = "",
    country = "";
  $.ajax({
     dataType: 'jsonp',
    url: "http://ip-api.com/json/?callback=?",
    success: function(data) {
      console.log(data);
      city = data.city;
      country = data.country;
      //updateLocation(city, country);
      loadWeather(city, country);
    },
    error: function(data){
      console.log(data);
    }
  });
}
     getIPAddress();

function loadWeather(cit,countr){
    var 
    weatherIcon= "",
    weatherDesc = "",
    temperature = "",
    humidity = "",
    pressure = "",
  weatherDescription="",
  weathercity="",
        alternateTemperature="",
        weatherWind="",
        weatherDirection="";

 
  $.ajax({  
    url: "http://api.openweathermap.org/data/2.5/weather?q=" + cit + "," + countr + '&units=metric' + '&type=accurate' + callback, success: function(weatherData) {
   weatherDescription=weatherData.weather[0].description;
   
      weatherIcon  ="<img  src='http://openweathermap.org/img/w/"+weatherData.weather[0].icon+".png'/>";
      weatherWind=weatherData.wind.speed+' knots';
       weatherDirection=weatherData.wind.deg+' degrees';
      weatherDesc = weatherData.weather[0].desc;
      humidity = weatherData.main.humidity+" %";
      pressure = weatherData.main.pressure+' HPA';
      temperature ='<h1>'+ weatherData.main.temp+' C </h1>';
       alternateTemperature='<h1>'+  Math.round((weatherData.main.temp * 9) / 5 + 32)+' F </h1>';
      weathercity=weatherData.name;
       console.log(alternateTemperature);
      console.log(weatherData);

    
          $('#location').text(weathercity);
           
           $('#temp').html(temperature);
            $('#currently').html(weatherDescription);
            $('#wind').html(weatherWind);
            $('#humidity').text(humidity);
               $('#pressure').text(pressure);
            $('#direction').html(weatherDirection);
            $('.theimg').html(weatherIcon);
            
            function showData(){
              if($('.main-btn').hasClass('active')){
					$('#temp').html(temperature); 
	  
            }else if($('.alternate-btn').hasClass('active')){
					$('#tmp').html(alternateTemperature); 
            }
            }
           	showData(); 
        $('.main-btn').click(function(){
				$('.main-btn').addClass('active');
				$('.alternate-btn').removeClass('active');
				$('#temp').html();
				showData();
			});

			// Switching to Fehrenheit
			$('.alternate-btn').click(function(){
				$('.alternate-btn').addClass('active');
				$('.main-btn').removeClass('active');
				$('#temp').html(alternateTemperature);
				showData();
			});
    }
  });
}

         });
      
   


 

































































































var callback = '&APPID=4b4667d4298466206cc9e5624f6d77f9';