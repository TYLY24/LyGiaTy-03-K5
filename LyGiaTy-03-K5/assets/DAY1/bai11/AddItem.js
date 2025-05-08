
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () 
     {
        
        this.itemCatalog = ["Sword", "Shield", "Potion"]
     },

    onClickAddItem () {
        this.itemCatalog.push("new Item")
    },
    onClickedShow()
    {
        console.log(this.itemCatalog);
        
    }

    // update (dt) {},
});
