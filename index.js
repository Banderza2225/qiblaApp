
qiblaBearing = 0;

navigator.geolocation.getCurrentPosition(async(position) => {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    qiblaBearing = getQiblaDirection(lat, lon);
})

function getQiblaDirection(lat, lon)  {

 const kaabaLat = 21.4225 * Math.PI / 180;
  const kaabaLon = 39.8262 * Math.PI / 180;
  const userLat = lat * Math.PI / 180;
  const userLon = lon * Math.PI / 180;

  const deltaLon = kaabaLon - userLon;
  const y = Math.sin(deltaLon) * Math.cos(kaabaLat);
  const x = Math.cos(userLat) * Math.sin(kaabaLat) -
            Math.sin(userLat) * Math.cos(kaabaLat) * Math.cos(deltaLon);
  let bearing = Math.atan2(y, x) * 180 / Math.PI;
  return (bearing + 360) % 360; 
}

window.addEventListener('deviceorientationabsolute', (event) => {
  const heading = event.alpha; 
  const rotation = qiblaBearing - heading;
  document.getElementById('qibla-arrow').style.transform = `rotate(${rotation}deg)`;
});


