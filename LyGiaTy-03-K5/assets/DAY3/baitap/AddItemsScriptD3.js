
cc.Class({
    extends: cc.Component,

    properties: {
        Name: cc.Label,
        Quantity: cc.Label,
        Effect: cc.Label,
        Consumable: cc.Toggle,
        NewItemSprite: cc.SpriteFrame,

        Data: cc.Node,
        ShopCtr:cc.Node,
    },


    start () 
    {
        this.DataScript= this.Data.getComponent("ItensD3"); 
        this.data = this.DataScript.ItemInfo;
        this.ShopScript=this.ShopCtr.getComponent("ShopController"); 
        ResetText();
    },

    CancelBtn () 
    {
        this.ResetText();
        this.node.active = false;
    },

    ResetText()
    {
        this.Name.string="";
        this.Quantity.string="";
        this.Effect.string="";
        this.Consumable.isChecked=false;
    },

    SaveBtn()
    {
        let item={}
        item.spriteFrame=this.NewItemSprite;
        item.name= this.Name.string;
        item.quantity= this.Quantity.string;
        item.effect=this.Effect.string
        if(this.Consumable.isChecked)
            item.type="consumable"
        else
            item.type="equipment"


        this.data.push(item);

        this.ShopScript.updateItem(this.data);
        this.CancelBtn();
    }

    // update (dt) {},
});
