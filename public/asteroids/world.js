function World(gameSettings){
    this.width = gameSettings.worldWidth;
    this.height = gameSettings.worldHeight;
    this.screenPosition = createVector(gameSettings.clientWindowWidth / 2, gameSettings.clientWindowHeight / 2);
    this.gridLineSpacing = 20;

    this.renderAccordingToPlayer = function(player){
        var xOffset = 0;
        var yOffset = 0;

        if (player.mapPosition.x <= this.screenPosition.x){
            xOffset = this.screenPosition.x - player.mapPosition.x;
        }else{
            xOffset = -player.mapPosition.x + this.screenPosition.x;
        }

        if (player.mapPosition.y <= this.screenPosition.y){
            yOffset = this.screenPosition.y - player.mapPosition.y;
        }else{
            yOffset = -player.mapPosition.y + this.screenPosition.y; 
        }  

        push();

        translate(xOffset, yOffset);
        stroke(50); // Gray Color Lines

        //////////////////////////////////////////////////
        // DRAW GRIDLINES (Temporary World)
        // Vertical Lines
        for(var i = 0; i <= this.width / this.gridLineSpacing; i++){
            line(i * this.gridLineSpacing, 0, i * this.gridLineSpacing, this.height);
        }
        // Horizontal Lines
        for(var i = 0; i <= this.height / this.gridLineSpacing; i++){
            line(0, i * this.gridLineSpacing, this.width, i * this.gridLineSpacing);
        }
        //////////////////////////////////////////////////

        pop();
    }
}