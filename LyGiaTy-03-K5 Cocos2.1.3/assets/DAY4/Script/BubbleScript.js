

cc.Class({
    extends: cc.Component,

    properties: {
        Points: cc.Label,

        BubbleSpriteFrame: cc.SpriteFrame,

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
        
        this.node.getComponent(cc.Button).interactable = true;
        this.node.getComponent(cc.Sprite).spriteFrame = this.BubbleSpriteFrame;
        this.RandomPnLT();
        this.CountDown();
    },

    start () {
        
        this.GameControllerScript=this.GameController.getComponent("GameController");
        this.SpawnerScript=this.Spawner.getComponent("Spawner");
        this. anim = this.getComponent(cc.Animation);
    },

    RandomPnLT()
    {
        this.points= Math.floor(Math.random() * 10) + 1;
        this.lifeTime=Math.random() * (1.5-1) + 1;

        this.Points.string = this.points;
    },

    
    CountDown()
    {
        this._scheduledCallback = () => {
            if (this.SpawnerScript)
                this.SpawnerScript.BacktoPool(this.node);
        };

        this.scheduleOnce(this._scheduledCallback, this.lifeTime);
    },


    OnClick()
    {
        this.anim.play('Test');
        this.Points.string = "";
        this.node.getComponent(cc.Button).interactable = false;
        this.GameControllerScript.PlusScore(this.points);
        this.unschedule(this._scheduledCallback);
         
        

    },
    endAnimation()
    {
       
        this.anim.stop();
        console.log("endAnimation called");
        this.SpawnerScript.BacktoPool(this.node);
    }

    // update (dt) {},
});
