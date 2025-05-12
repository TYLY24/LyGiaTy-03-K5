
cc.Class({
    extends: cc.Component,

    properties: {
        MainMenu: cc.Node,
        GameScene: cc.Node,
        GameOver: cc.Node,
    },

  

    start () {

    },

    PlayGamebtn() 
    {
        this.MainMenu.active = false;
        this.GameScene.active = true;       
    },

    ReplayGamebtn() 
    {
        this.GameOver.active = false;
        this.GameScene.active = true;       
    },

    BacktoMainMenu()
    {
        this.GameOver.active = false;
        this.MainMenu.active = true;       
    }




    // update (dt) {},
});
