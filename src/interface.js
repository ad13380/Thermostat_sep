$(document).ready(function() {
  var thermostat = new Thermostat();
  var DEFAULT_CITY = 'London'
  var DEFAULT_UNIT  = 'metric'
 
  updateWeather();
  
  $('#raise_temp').click(function() {
    thermostat.raise();
    updateTemp();
  });

  $('#lower_temp').click(function() {
    thermostat.lower();
    updateTemp();
  });

  $('#reset_temp').click(function() {
    thermostat.resetTemp();
    updateTemp();
  });

  $('#set_psm').click(function() {
    thermostat.switchPsmMode();
    updatePsm();
  });

  $('#enter_city').submit(function(event) {
    event.preventDefault();
    console.log(city);
    var city = $('#current_city').val();
    updateWeather(city);
  });

  $('#switch_unit').click(function() {
    var city = $('#current_city').val() ||  DEFAULT_CITY
    var unit_display = $("#api_unit");
    if (unit_display.text() === '°F') { 
      unit_display.text('°C')
      updateWeather(city, 'imperial') 
    } else {
      unit_display.text('°F')
      updateWeather(city, 'metric') 
    }
  });

  function updateTemp() {
    $('#display_temp').text(thermostat.viewTemp())
    $('#display_temp').attr('class', thermostat.energyUsage())
  }

  function updatePsm() {
    thermostat.psm ? switchMode = 'Off' : switchMode = 'On'
    $('#set_psm').text("Switch Power Saving Mode " + switchMode)
  }

  function updateWeather(city = DEFAULT_CITY, unit = DEFAULT_UNIT) {
    var url =  'http://api.openweathermap.org/data/2.5/weather?'
    var apiKey = 'addf8e57a2ad62fc2a197c044f32b301'
    $.ajax({
      type: 'GET',
      url: url + "q=" + city + "&units=" + unit +"&appid=" + apiKey,
      success: function(result) {
        $('#api_city').text(city);
        $('#api_temp').text(result.main.temp);
      }
    });
  }
 
});
