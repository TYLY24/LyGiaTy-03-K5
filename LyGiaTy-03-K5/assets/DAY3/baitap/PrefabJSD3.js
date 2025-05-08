
cc.Class({
    extends: cc.Component,

    properties: {
        PrefabSprites: cc.Sprite,
        Equiped: cc.Sprite,
        Quantity: cc.Label,
    },

    onLoad()
    {
        this.nameitem="";
        this.controlNode = null;
    },

    // LIFE-CYCLE CALLBACKS:

    setitem(CtrNode,name,sprite,quantity)
    {
        
        this.nameitem=name;
        this.PrefabSprites.spriteFrame= sprite;
        this.Quantity.string=quantity;
        this.controlNode=CtrNode;

       
    },

    ONCLICK () 
    {
        let data=this.controlNode.getComponent("ShopController"); 
       // console.log(this.nameitem+" truyền dô là "+typeof this.nameitem);
        data.ItemClicked(this.nameitem);
       // console.log("Item: "+ this.nameitem+" get từ "+this.controlNode+"Ta có" + data);
    },

    // update (dt) {},
});
