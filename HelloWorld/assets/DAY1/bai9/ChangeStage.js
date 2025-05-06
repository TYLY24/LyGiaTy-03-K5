
cc.Class({
    extends: cc.Component,

    properties: {
        StageName: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () 
     {
        this.Stage = true;
     },
    
    
    
    onclicked () 
    {
        this.Stage=!this.Stage;

        if(this.Stage)
        {
            this.StageName.string="Idle";
        }
        else
        {
            this.StageName.string="Running";
        }

    },

    

    // update (dt) {},
});
