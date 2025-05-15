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

        NotifyPanel: cc.Node,
        NotifyLabel: cc.Label,
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
                this.Notify("Yummy!");
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
                this.Notify("Equiped!");
                //console.log("Da trang bi:" + this.ItemInfo[position].name + " " + this.ItemInfo[position].equiped);
            }
            else if(this.ItemInfo[position].equiped==false && this.equipeditems.length >= MaxEquip)
            {
                //console.log("Khong du cho de trang bi");   
                this.Notify("Full Slot!");     
                
            }
            else 
            {
                this.Notify("UnEquiped!");
                //console.log("Da bo trang bi:" + this.equipeditems.name);
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


    Notify(message)
    {
        this.NotifyPanel.active = true;
        this.NotifyLabel.string = message;
        this.scheduleOnce(function() {
            this.NotifyPanel.active = false;
        }, 0.7);
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
        this.Notify("Sad D:");
    }

    // Các phương thức khác
});
