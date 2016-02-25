jQuery(function($){
  $('#pokemon-name').keyup(function(event){
      if(event.keyCode == 13){
          $("#submit-pokemon").click();
      }
  });

});

function getPokemon() {
  name = $('#pokemon-name').val().toLowerCase()
  $.ajax({
    url: "http://pokeapi.co/api/v1/pokemon/" + name,
    type: 'GET',
    success: function(data) {
      console.log(data)
      document.getElementById('poke-info').style.display = 'block'
      document.getElementById('info-container').innerHTML = ''
      html_content = ''
      html_content += "<h1 style='text-decoration: underline;'> " + data.name + "</h1>"
      html_content += "<br>"
      //TO DO: Change to sprite call with V2 api do not call img url. No control over img id from api.
      //v1 is strickly hardcoding img id because pokeapi has consistent id in image url
      html_content += "<img src='http://pokeapi.co/media/img/" + data.pkdx_id + ".png'>"
      html_content += "<br>"
      html_content += "Attack: " + data.attack
      html_content += "<br>"
      html_content += "Defense: " + data.defense
      html_content += "<br>"
      html_content += "Catch Rate: " + data.catch_rate
      html_content += "<br>"
      html_content += "Experience: " + data.exp
      html_content += "<br>"
      html_content += "HP: " + data.hp
      html_content += "<br>"
      html_content += "Height: " + data.height
      html_content += "<br>"
      html_content += "Weight: " + data.weight
      html_content += "<br>"
      html_content += "Speed: " + data.speed
      html_content += "<br>"
      html_content += "Special Attack: " + data.sp_atk
      html_content += "<br>"
      html_content += "Special Defense: " + data.sp_def
      html_content += "<br>"
      if ( data.evolutions.length > 0 ) {
        html_content += "<br>"
        html_content += "Evolution(s): "
        html_content += "<br>"
        html_content += "<table>"
        $.each(data.evolutions, function(key, value) {
            html_content +="<tr>"
            html_content += "<td>" + value.to + "</td>"
            html_content += "</tr>"
        });
        html_content += "</table>"
        html_content += "<br>"
      }
      html_content += "Abilities: "
      html_content += "<br>"
      html_content += "<table>"
        $.each(data.abilities, function(key, value) {
            var ability = value.name
            var abilityName = ability.charAt(0).toUpperCase() + ability.slice(1);
            html_content +="<tr>"
            html_content += "<td>" + abilityName + "</td>"
            html_content += "</tr>"
        });
      html_content += "</table>"
      html_content += "<br>"
      html_content += "Egg Cycles: "
      html_content += "<br>"
      html_content += "<table>"
        $.each(data.egg_groups, function(key, value) {
            var egg = value.name
            var eggName = egg.charAt(0).toUpperCase() + egg.slice(1);
            html_content +="<tr>"
            html_content += "<td>" + eggName + "</td>"
            html_content += "</tr>"
        });
      html_content += "</table>"
      html_content += "<br>"

      if ( data.pkdx_id < 494) {
        html_content += "<audio controls>"
        html_content += "<source src='/" + data.pkdx_id + ".mp3' type='audio/mpeg'>"
        html_content += "</audio>"
      }
      /*
      //FUNTION TO MAKE GET CALL TO GET EVOLbUTION
      //TO DO:: MAKE SURE THAT EVOLUTION EXISTS IF EMPTY DONT DISPLAY ANYTHING
        $.each(data.evolutions, function(key, value) {
            console.log(value);
            console.log(value.resource_uri);
            h
            $.ajax({
              url: "http://pokeapi.co/" + value.resource_uri,
              type: 'GET',
              success: function(data) {
                console.log(data)
                console.log('IN SIDE EVOLUTION')
            }
        });
      });*/

      document.getElementById('info-container' ).innerHTML = html_content
    },
    error: function (xhr, ajaxOptions, thrownError) {
        document.getElementById('poke-info').style.display = 'block'
        document.getElementById('info-container').innerHTML = ''
        html_content = ''
        html_content += "<h1>Pokémon Not Found</h1>"
        html_content += "<br>"
        html_content += "Please make sure the Pokémon is spelt correctly or the number is correct."
        document.getElementById('info-container' ).innerHTML = html_content
      }

  });
}
