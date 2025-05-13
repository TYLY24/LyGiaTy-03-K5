cc.Class({
    extends: cc.Component,

    properties: {
        Timmer: cc.ProgressBar,
        Score: cc.Label,
        HighScore: cc.Label,

        Spawner: cc.Node,

        GamePlayer: cc.Node,
        GameOver: cc.Node,
        GameOverScore: cc.Label,
        GameOverHighScore: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:
    
    onEnable () 
    {
        this.score=0;
        this.Score.string = "Score: " + this.score;
        this.time=60
        var savedScore = cc.sys.localStorage.getItem("highScore");
        {
            if (savedScore == null) {
                this.highScore = 0;
              //  this.highScore.string = "High Score: " + this.highScore;
            } else {
                this.highScore = parseInt(savedScore);
               // this.highScore.string = "High Score: " + this.highScore;
            }
            this.HighScore.string = "High Score: " + this.highScore;
        }
   
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
        if(this.score > this.highScore)
        {
            this.HighScore.string = "High Score: " + this.score;
            this.highScore = this.score;
            cc.sys.localStorage.setItem("highScore", this.highScore);
        }
    },

  

    countDownCallback() {
        this.time -= this.decreaseSpeed;
        //console.log(this.time);
    
        if (this.time <= 0) {
            this.time = 0;
            this.EndGame(); 
        }
    
        this.Timmer.progress = this.time / 60;
    },
    
    EndGame() {
        
            this.unschedule(this.countDownCallback);
            console.log("End Game called");
            this.GamePlayer.active = false;
            this.GameOver.active = true;
            this.GameOverScore.string = "Score: " + this.score;
            this.GameOverHighScore.string = "Best: " + this.highScore;
        
    }

    // update (dt) {},
});
