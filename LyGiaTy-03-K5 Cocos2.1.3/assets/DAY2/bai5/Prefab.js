
var ItemData = cc.Class({
    name: "ItemData",  

    properties: {
        id: 0,
        name: "",
        price: 0,
        spriteFrame: cc.SpriteFrame
    }
});

cc.Class({
    extends: cc.Component,

    properties: {
        ItemList: [ItemData],

        Controller: cc.Node,

        ItemSprite: cc.Sprite,
        ItemName: cc.Label,
        ItemPrice: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {
      this.MyPoket = this.Controller.getComponent("MyPoket");
    },


    SetItem(Idname)
    {
        for (let i = 0; i < this.ItemList.length; i++)
        {
            if (this.ItemList[i].id == Idname)
            {

                console.log(this.ItemList[i].name);
                this.ItemSprite.spriteFrame = this.ItemList[i].spriteFrame;
                this.ItemName.string = this.ItemList[i].name;
                this.ItemPrice.string = this.ItemList[i].price;
            }
        }
    },
    
    onClick()
    {
        this.MyPoket. AddtoPocket(this.ItemName.string,this.ItemPrice.string)
    }
    // update (dt) {},
});
