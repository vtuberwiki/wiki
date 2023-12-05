(async function () {
    'use strict';
  
    // Custom scripts
    document.addEventListener("DOMContentLoaded", async function() {
  
      // Live Awesomplete Search 
        var inputHero = document.getElementById("search-hero");
        var inputNavbar = document.getElementById("search-navbar");

        
      var data = await fetch("/api/v1/search-list.json").then(response => response.json());
      var list = data.data.map((_) => ({
        label: _.label,
        value: _.value
      }))
  
      if (inputHero) {
        inputHero.addEventListener("awesomplete-selectcomplete", function(e) {
          window.location.href = e.text.value;
        }, false);
        
        new Awesomplete(inputHero, {
          autoFirst: true,
          list: list,
          replace: function(suggestion) {
            this.input.value = suggestion.label;
          }
        });
      }
  
      if (inputNavbar) {
        inputNavbar.addEventListener("awesomplete-selectcomplete", function(e) {
          window.location.href = e.text.value;
        }, false);
        
        new Awesomplete(inputNavbar, {
          autoFirst: true,
          list: list,
          replace: function(suggestion) {
            this.input.value = suggestion.label;
          }
        });
      }
  
    });
  
  }());
  