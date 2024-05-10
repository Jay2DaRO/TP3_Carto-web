// Script pour la carte - Leaflet

// Création d'une variable osm pour le fond de carte Open Street Map et paramétrage de celui-ci
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

// Création d'une variable StadiaWC pour un fond de carte alternatif style peinture et paramétrage de celui-ci
var StadiaWC = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.{ext}', {
	minZoom: 1,
	maxZoom: 16,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'jpg'
});

// Création d'une variable StadiaSD pour un fond de carte alternatif style foncé et paramétrage de celui-ci
var StadiaSD = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});

// Création d'une variable myIcon affectée d'un icone personnalisé se retrouvant dans un dossier Images et paramétrage
var myIcon = L.icon({
    iconUrl: '/Images/pecheur.png',
    iconSize: [30, 30],
    iconAnchor: [10, 10]
});

// Création de 3 variables pour chacun des 3 commerces de location d'emplacements de pêche (entités ponctuelles)
// avec leurs coordonnées et attribution de l'icone personnalisé
var pBf = L.marker([48.31734537912386, -70.85265545890958], {icon: myIcon});
var pAs = L.marker([48.35668818873542, -70.86580000001484], {icon: myIcon});
var gDf = L.marker([48.344346387792754, -70.87953747595253], {icon: myIcon});

// Paramétrage d'une première interaction avec la carte, un bindPopup pour chaque marqueurs ajoutés pour les sites de location
pBf.bindPopup("<b>Pêche blanche du Fjord</b>").openPopup();
pAs.bindPopup("<b>Pêche Aventures Saguenay</b>").openPopup();
gDf.bindPopup("<b>Glaces du Fjord</b>").openPopup();

// Création d'une variable pour regrouper les 3 marqueurs en un seul layerGroup
var emplacement = L.layerGroup([pBf, pAs, gDf]);

// Création de la variable map et de ses paramètres par défaut: son centre, le niveau de zoom et les couches ajoutées
var map = L.map('map', {
    center: [48.338, -70.85],
    zoom: 13,
    layers: [osm, emplacement, sentiersMotoneige]
})

// Ajout d'une échelle à la carte
L.control.scale().addTo(map);

// Création de la variable baseMaps afin de répertorier les fonds de cartes disponibles
var baseMaps = {
    "Open Street Map": osm,
    "Stadia Water Color": StadiaWC,
    "Stadia Smooth Dark": StadiaSD,
};

// Création de la variable overlayMaps afin de répertorier les couches venant au-dessus : les couches fonctionnelles
var overlayMaps = {
    "Location d'emplacements de pêche": emplacement,
    "Sentiers de motoneige à proximité": sentiersMotoneige
};

// Ajout d'un contrôle à la carte permettant de selectionner le fond de carte et les couches vectorielles voulues
var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);


// **** Code trouver sur internet pour l'ajout d'une légende ***
// ****
// Création de la variable legend representant le control qui sera ajouté
var legend = L.control({ position: "bottomright" });
// ****
legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  // URL ajusté pour aller chercher l'icone, span avec la bonne description
  div.innerHTML += '<i class="icon" style="background-image: url(\'../Images/pecheur.png\'); background-repeat: no-repeat;"></i><span>Location emplacement</span><br>';
  // Paramétrage d'un svg (vecteur ... une ligne) représentant les sentiers de motoneige avec la symbologie la plus proche possible
  div.innerHTML += '<svg height="15" width="55"><line x1="0" y1="10" x2="30" y2="10" style="stroke:dodgerblue;stroke-width:2.5" /></svg><span>Sentiers de motoneige</span><br>';

  return div;
};

// Ajout de la légende à la carte
legend.addTo(map);

// Création de la variable circle1 représentant un village de pêche sous forme de cercle, paramètrage de celui-ci et ajout à la carte
var circle1 = L.circle([48.326263, -70.851541], {
    color: 'crimson',
    fillColor: 'coral',
    fillOpacity: 0.75,
    radius: 75
}).addTo(map);

// Création de la variable circle2 représentant un autre village de pêche sous forme de cercle, paramètrage de celui-ci et ajout à la carte
var circle2 = L.circle([48.347488, -70.865954], {
    color: '#176577',
    fillColor: '#509fb1',
    fillOpacity: 0.75,
    radius: 75
}).addTo(map);

// Un bindPopup pour chaque village de pêche
circle1.bindPopup("Village de pêche de Grande-Baie");
circle2.bindPopup("Village de pêche de l'Anse-à-Benjamin");

// Définition de la deuxième interaction avec la carte, une fonction onMapClick pour afficher les coordonnées de l'endroit cliqué
function onMapClick(e) {
    alert("Voici les coordonnées de ce point : " + e.latlng);
}

// Ajout de la fonction onMapClick à la carte
map.on('click', onMapClick);