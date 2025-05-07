
cc.Class({
    extends: cc.Component,

    properties: {
        Score: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () 
     {
        this.scores=0;
     },

    onBonus () 
    {
        this.scores +=10;
        this.Score.string=this.scores;
    },
    onReseted()
    {
        this.scores  =0;
        this.Score.string=this.scores;
    },

    // update (dt) {},
});
