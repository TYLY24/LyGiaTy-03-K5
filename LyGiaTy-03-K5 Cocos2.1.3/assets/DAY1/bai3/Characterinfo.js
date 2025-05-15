

cc.Class({
    extends: cc.Component,

    properties: {
        HPView: cc.Label,
        PointsView: cc.Label,
       
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () 
     {
        this.Name = "But";
        this.Hp= 0;
        this.Score= 0;
     },

    start () {
        this.HPView.string="HP: " + this.Hp;
        this.PointsView.string="Score: " + this.Score;
    },

    PointsPlus()
    {
        this.Score++;
        if(this.Score%10==0)
            this.Hp++;

        this.HPView.string="HP: " + this.Hp;
        this.PointsView.string="Score: " + this.Score;
    }

    // update (dt) {},
});
