var ImageItem = cc.Class({
    name: "ImageItem",  
    properties: {
        spriteFrame: cc.SpriteFrame,
        name: "",
        quantity: 0,
        type: "",
        effect: "",
        equiped: true,
    }
});

cc.Class({
    extends: cc.Component,

    properties: {
        ItemInfo: [ImageItem],

        ItemifoPanel: cc.Node,
        NewItemPanel: cc.Node,
    },

    NewItem()
    {
        this.NewItemPanel.active=true;
    },
    
    UseItem(position)
    {
        console.log("position là "+  position + "type la: "+ typeof position );
       
        
        
        if(this.ItemInfo[position].type === "consumable")
            {
                this.ItemInfo[position].quantity--;
                if(this.ItemInfo[position].quantity === 0)
                {
                    this.ItemInfo.splice(position, 1);
                    this.ItemifoPanel.active = false;
                }
            }
        else
        {
            this.ItemInfo[position].equiped = !this.ItemInfo[position].equiped;
        }
    },

    DropItem(position)
    {
        this.ItemInfo.splice(position, 1);
        this.ItemifoPanel.active = false;
    }

    // Các phương thức khác
});
