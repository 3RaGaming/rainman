function World(worldWidth, worldHeight){
    this.width = worldWidth;
    this.height = worldHeight;
    this.screenPosition = createVector(width / 2, height / 2);

    this.render = function(){
        stroke(50);
        strokeWeight(1);
        for(var i = 0; i < this.width / 20; i++){
            line(i * 20, 0, i * 20, this.height);
        }

        for(var i = 0; i < this.height / 20; i++){
            line(0, i * 20, this.width, i * 20);
        }
    };

    this.renderAccordingToPlayer = function(player){
        var xOffset = 0;
        var yOffset = 0;

        if (player.mapPosition.x <= 400){
            xOffset = 400 - player.mapPosition.x;
        }else if (player.mapPosition.x >= (this.worldWidth - 400)){

        }

        if (player.mapPosition.y <= 300){

        }else if (player.mapPosition.y >= (this.worldHeight - 300)){

        }  
    }
}