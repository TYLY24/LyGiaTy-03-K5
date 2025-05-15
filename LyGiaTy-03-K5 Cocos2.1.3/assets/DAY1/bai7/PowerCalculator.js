
cc.Class({
    extends: cc.Component,

    properties: {
        HP: cc.EditBox,
        Mana: cc.EditBox,
        Output: cc.Label,
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    Onclick () 
    {
        this.Output.string="Power: " + parseFloat(this.HP.string)*parseFloat(this.Mana.string)
    },

    // update (dt) {},
});
