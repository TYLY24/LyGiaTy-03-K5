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

    onLoad ()
    {
        this.equipeditems = [];
    },

    NewItem()
    {
        this.NewItemPanel.active=true;
    },
    
    UseItem(position)
    {
       // console.log("position là "+  position + "type la: "+ typeof position );
       
        
        
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
            let MaxEquip = this.node.getComponent("ShopController").EquipHolder.children.length;

            if(this.ItemInfo[position].equiped==false && this.equipeditems.length < MaxEquip)
            {
                
                this.ItemInfo[position].equiped = true;
                this.equipeditems.push(this.ItemInfo[position]);
                console.log("Da trang bi:" + this.ItemInfo[position].name + " " + this.ItemInfo[position].equiped);
            }
            else if(this.ItemInfo[position].equiped==false && this.equipeditems.length >= MaxEquip)
            {
                console.log("Khong du cho de trang bi");      
                
            }
            else 
            {
                console.log("Da bo trang bi:" + this.equipeditems.name);
                this.ItemInfo[position].equiped = false;
                for(let i=0; i<this.equipeditems.length; i++)
                {
                    if(this.equipeditems[i].name === this.ItemInfo[position].name)
                    {
                        this.equipeditems.splice(i, 1);
                        break;
                    }
                }
            }
        }
    },

    DropItem(position)
    {
        
        for(let i=0; i<this.equipeditems.length; i++)
            {
                if(this.equipeditems[i].name === this.ItemInfo[position].name)
                {
                    this.equipeditems.splice(i, 1);
                    break;
                }
            }
        this.ItemInfo.splice(position, 1);
        this.ItemifoPanel.active = false;
    }

    // Các phương thức khác
});
