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
        this.decreaseSpeed = 0.010;
        this.countDownCallback = this.countDownCallback.bind(this); 
        this.schedule(this.countDownCallback, this.decreaseSpeed);

        this.SpawnerScript=this.Spawner.getComponent("Spawner");
       
        this.EndGame();
    },

    PlusScore(points)
    {
        this.score+=points;
        this.Score.string = "Score: " + this.score;
    },

  

    countDownCallback() {
        this.time -= this.decreaseSpeed;
        console.log(this.time);
    
        if (this.time <= 0) {
            this.time = 0;
            console.log("End Game");          
        }
    
        this.Timmer.progress = this.time / 60;
    },
    
    EndGame() {
        this.scheduleOnce(() => {
            this.unschedule(this.countDownCallback);
            console.log("End Game called");
            this.SpawnerScript.allBacktoPool();
        }, 60);
    }

    // update (dt) {},
});
