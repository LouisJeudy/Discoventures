
export async function getLieuTouristique(position,distance) {
     const lieux_all = [];
     //recupere une liste de lieux touristique a cote de position
     await fetch(`https://data.culture.gouv.fr/api/records/1.0/search/?dataset=base-des-lieux-et-des-equipements-culturels&q=&lang=fr&rows=5&geofilter.distance=${position[1]}%2C${position[0]}%2C${distance}`,{ method: 'GET'})
     .then(response => response.json())
     .then(response =>{
       const lieux = response.records;
       for (let i = 0; i < lieux.length; i++) {
         lieux_all.push({'coordinate': lieux[i].geometry.coordinates, 'nom': lieux[i].fields.nom})
       }
     });
    return lieux_all
}
export async function getDistanceEstime(position, lieux_selectionne, type) {
    let distance = 0;
    // get la distance plus court entre position - lieux touristiques - position
    // pour marcher et courir, pour courir il faut diviser un facteur pour calculer le temps estime
   const accessToken = 'pk.eyJ1IjoiY3ZuZHNoIiwiYSI6ImNsZ3V1ZzQxMzAxanMzbG11Z2E0cWJ0bmgifQ.7BRdbaWmQytXDZ8AE4CIaA';
   let query; 
   let arret_point="";
   for(let i =0; i<lieux_selectionne.length; i++){
        arret_point = arret_point + lieux_selectionne[i].coordinate[0] +','+lieux_selectionne[i].coordinate[1] +';';
   }
   if(type === 'bike'){
        // pour velo
        query = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/cycling/${position[0]},${position[1]};${arret_point}${position[0]},${position[1]}?annotations=distance&overview=full&steps=true&geometries=geojson&access_token=${accessToken}`,
            { method: 'GET' }
        );
    }else{
        query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${position[0]},${position[1]};${arret_point}${position[0]},${position[1]}?annotations=distance&overview=full&steps=true&geometries=geojson&access_token=${accessToken}`,
        { method: 'GET' }
      );
    }
      let json = await query.json();
      let data = json.routes[0];
      let route = data.geometry.coordinates;
      distance = data.distance;
      let temps = data.duration;
    return {'distance' : distance, 'temps':temps, 'route': route}
}
export async function getRoute(position, distance, type) {

    let lieux_all = await getLieuTouristique(position,distance/2)
    let lieux_selectionne = []
    let distaceEstime = 0;
    let data_parcours;
    let incertitude = distance * 0.2;
    let tempsEstime = 0;
    let parcoursCree=[];
    if((await lieux_all).length == 0){
        //s'il n'y pas de lieux touristique, on continue pas
        alert("desolee, il n'y a pas de lieux touristiques autour de la position")
        return;
    }
    for (let i = 0; i < lieux_all.length; i++) {
        // ajotuer le lieux de parcours dans la liste
        lieux_selectionne.push(lieux_all[i])
        //calcul la distance estime avec les lieux touristiques selectionnes
        data_parcours = await getDistanceEstime(position, lieux_selectionne,type)
        if(data_parcours.distance > distance + incertitude){
        // si la distance estime est plus que la distance, on va pas prendre ce lieux touristique, on recule a l'ancien cas
            lieux_selectionne.pop(lieux_all[i])
            break;
        }
        distaceEstime = data_parcours.distance;
        tempsEstime = data_parcours.temps;
        parcoursCree = data_parcours.route;
        // si la distance estime est proche de distance (la difference est moins que incertitude), on pense que on a trouve le parcours
        if(Math.abs(distaceEstime - distance) < incertitude){
            break;
        }
    }
    return {'distance' : distaceEstime, 'temps':tempsEstime, 'route': parcoursCree, 'lieux_tour':lieux_selectionne}
}
      
