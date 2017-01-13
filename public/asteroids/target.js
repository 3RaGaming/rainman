
function Target(targetSettings, gameSettings) {
  this.mapPosition = createVector(targetSettings.x, targetSettings.y);
  this.screenPosition = createVector(gameSettings.clientWindowWidth / 2, gameSettings.clientWindowHeight / 2);
  this.attributes = {
    size: 15, // Examples for later
  };


  this.render = function(distanceObj) {
    push();
    translate(this.screenPosition.x - distanceObj.x, this.screenPosition.y - distanceObj.y);
    fill(255, 0, 0);
    var txt = 'TARGET POSITION \n X: ' + this.mapPosition.x + ' Y: ' + this.mapPosition.y;
    text(txt, 20, 0);
    ellipse(0, 0, this.attributes.size * 2, this.attributes.size * 2); 
    pop();
  };

}