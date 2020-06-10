$(document).ready(function() {
  var thermostat = new Thermostat();

  $.ajax({
    type: 'GET',
    url: 'http://api.openweathermap.org/data/2.5/weather?q=London&appid=addf8e57a2ad62fc2a197c044f32b301',
    success: function(result) {
      $('#api_temp').text(result.main.temp);
    }
  });
  
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

  function updateTemp() {
    $('#display_temp').text(thermostat.viewTemp())
    $('#display_temp').attr('class', thermostat.energyUsage())
  }

  function updatePsm() {
    thermostat.psm ? switchMode = 'Off' : switchMode = 'On'
    $('#set_psm').text("Switch Power Saving Mode " + switchMode)
  }

 
});


//api.openweathermap.org/data/2.5/weather?q=London&appid=addf8e57a2ad62fc2a197c044f32b301
