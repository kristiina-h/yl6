(function() {
    "use strict";
    
    //clock

        document.addEventListener("DOMContentLoaded", function() {
        
        var c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            var date = new Date();
            
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();

            if (h > 12) {
                h =  h-12;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    var e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    var kokku = 0.0;
    function estimateDelivery(event) {
        event.preventDefault();
        kokku=0; //et uue valiku korral nulliks seisu
        var linn = document.getElementById("linn");
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
        
        } else if(document.getElementById("fname").value === "") {
            alert("Palun sissestage eesnimi");
            return;
        } else if (document.getElementById("lname").value === "") {
            alert("Palun sissestage perekonnanimi");
        
             
        } else if(/\d/.test(document.getElementById("fname").value)) {
            alert("Eesnimi ei tohi sisaldada numbreid");
            return;
        } else if(/\d/.test(document.getElementById("lname").value)) {
            alert("Perekonnanimi ei tohi sisaldada numbreid");
            return;
        
            return;       
       } else if ((document.getElementById("pysi").checked == false) &&(document.getElementById("uus").checked == false)) {
            alert("Palun valige, kas olete püsiklient või uus klient");
            return;
            
        } else {
            if (linn.value == "trt") {
                kokku += 2.5;
            } else if (linn.value == "nrv") {
                kokku += 2.5;
            } else if (linn.value == "prn") {
                kokku += 3;
            }
            if (document.getElementById("v1").checked) {
                kokku += 5;
            }

            if (document.getElementById("v2").checked) {
                kokku += 1;
            }

            e.innerHTML =kokku+ " &euro;";
            
                                }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map
//https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/infoboxes/infobox-when-pushpin-clicked
var mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

var map, infobox;

function GetMap() {
    
    "use strict";

    var centerPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
        var voruPoint = new Microsoft.Maps.Location(
            57.84403, 
            26.99167  
        );


    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 7.5,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
      //Create an infobox at the center of the map but don't show it.
        infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
            visible: false
        });

        //Assign the infobox to a map instance.
        infobox.setMap(map);
    var pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });
   //Store some metadata with the pushpin. 
    pushpin.metadata = {
            title: 'Tartu linn',
            description: 'Tartu on rahvaarvult Eesti teine linn, Lõuna-Eesti suurim keskus.'
        }; 
    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
    map.entities.push(pushpin);
    
    var pushpin_v = new Microsoft.Maps.Pushpin(voruPoint,{
    title: 'Võru',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });
    //Store some metadata with the pushpin. 
    pushpin_v.metadata = {
            title: 'Võru linn',
            description: 'Võru (võru keeles Võro) on linn Eesti kaguosas'
        }; 
     //Add a click event handler to the pushpin.
    Microsoft.Maps.Events.addHandler(pushpin_v, 'click', pushpinClicked);
     //Add pushpin to the map.
    map.entities.push(pushpin_v);

   function pushpinClicked(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

