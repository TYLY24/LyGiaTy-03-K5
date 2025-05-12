

cc.Class({
    extends: cc.Component,

    properties: {
        Points: cc.Label,

        Spawner: cc.Node,
        GameController: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:


    onLoad () 
    {
        this.points=0;
        this.lifeTime=0.0;
    },

    onEnable() {
      

        this.RandomPnLT();
        this.CountDown();
    },

    start () {
        
        this.GameControllerScript=this.GameController.getComponent("GameController");
        this.SpawnerScript=this.Spawner.getComponent("Spawner");
        //this. anim = this.getComponent(cc.Animation);
    },

    RandomPnLT()
    {
        this.points= Math.floor(Math.random() * 10) + 1;
        this.lifeTime=Math.random() * (1.5-0.8) + 0.8

        this.Points.string = this.points;
    },

    CountDown()
    {
        this._scheduledCallback = () => {
            if (this.SpawnerScript)
                this.SpawnerScript.BacktoPool(this.node);
        };

        this.scheduleOnce(() => {
            this._scheduledCallback();
        }, this.lifeTime);
    },

    OnClick()
    {
        this.GameControllerScript.PlusScore(this.points);
        this.unschedule(this._scheduledCallback);
        //this.anim.play('popAnimation');
         this.endAnimation();
        

    },
    endAnimation()
    {
        //this.anim.stop('popAnimation');
        this.Points.string = "";
        console.log("endAnimation called");
        this.SpawnerScript.BacktoPool(this.node);
    }

    // update (dt) {},
});
