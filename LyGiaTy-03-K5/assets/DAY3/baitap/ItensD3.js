// Khai báo ImageItem trước
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

// Component chính
cc.Class({
    extends: cc.Component,

    properties: {
        ItemInfo: [ImageItem],
    },


    UseItem(position)
    {
        console.log("position là "+  position );
        
        
        if(this.ItemInfo[position].type === "consumable")
            {
                this.ItemInfo[position].quantity--;
                if(this.ItemInfo[position].quantity === 0)
                {
                    this.ItemInfo.splice(position, 1);
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
    }

    // Các phương thức khác
});
