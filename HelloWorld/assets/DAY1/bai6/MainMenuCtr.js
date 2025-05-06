
cc.Class({
    extends: cc.Component,

    properties: {
        GamePlay: cc.Label,
        MainMenu: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },


    StartBtn()
    {
        this.MainMenu.active=false;
        this.GamePlay.node.active=true;
        this.GamePlay.string="Game is starting .....";
    },

    ExitBtn()
    {
        this.MainMenu.active=false;
        this.GamePlay.node.active=true;
        this.GamePlay.string="Good Bye!";
    }

    // update (dt) {},
});
