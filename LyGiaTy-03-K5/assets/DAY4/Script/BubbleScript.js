

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
       // console.log("Bubble position.x: " + this.node.position.x);

        this.RandomPnLT();
        this.CountDown();
    },

    start () {
        this.GameControllerScript=this.GameController.getComponent("GameController");
        this.SpawnerScript=this.Spawner.getComponent("Spawner");
    },

    RandomPnLT()
    {
        this.points= Math.floor(Math.random() * 10) + 1;
        this.lifeTime=Math.random() * (0.8-0.3) + 0.3

        this.Points.string = this.points;
    },

    CountDown()
    {
        this.scheduleOnce(() => {
            this.SpawnerScript.BacktoPool(this.node);
        }, this.lifeTime);
    },

    OnClick()
    {
        this.GameControllerScript.PlusScore(this.points);
        this.SpawnerScript.BacktoPool(this.node);

    },

    // update (dt) {},
});
