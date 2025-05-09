cc.Class({
    extends: cc.Component,

    properties: {
        Timmer: cc.ProgressBar,
        Score: cc.Label,

        Spawner: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.score=0;
        this.time=60
    },
    start () {
        this.SpawnerScript=this.Spawner.getComponent("Spawner");
        this.TimmerCountDown();
        this.EndGame();
    },

    PlusScore(points)
    {
        this.score+=points;
        this.Score.string = "Score: " + this.score;
    },

    TimmerCountDown()
    {
        let decreaseSpeed = 0.010;

       
        this.schedule(() => {
            this.time -= decreaseSpeed;

            if (this.time <= 0) {
                this.time = 0;                
                
               // this.EndGame();
            } 

            // Update the progress bar
            this.Timmer.progress = this.time / 60;
        }, decreaseSpeed);
    },

    

    EndGame()
    {
        this.scheduleOnce(() => {
            this.unscheduleAllCallbacks(); 
            console.log("End Game");
            this.SpawnerScript.allBacktoPool();
        }, 6);
        
       
    }

    // update (dt) {},
});
