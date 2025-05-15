
cc.Class({
    extends: cc.Component,

    properties: {
        PrefabSprites: cc.Sprite,
        Equiped: cc.Sprite,
        Quantity: cc.Label,

        CtrolNode: cc.Node,
        DragSprite: cc.Sprite,

    },

    onLoad()
    {
        this.nameitem="";
        this.Equip=false;
        this.Type="";
        
        
    },
    start () {
        
    
  },


    ONSTART(event)
    {
        if(this.Type!=="consumable") 
            {
                this.DragSprite.node.active=true;
                //this.DragSprite.node.position = event.getLocation();
                let pos = event.getLocation(); // vị trí trong world space
                let localPos = this.DragSprite.node.parent.convertToNodeSpaceAR(pos);
                this.DragSprite.node.position = localPos;
                this.DragSprite.spriteFrame = this.PrefabSprites.spriteFrame;
            }
            
            this.ONCLICK();
       
    },

    ONDRAG(event)
    {
        let pos = event.getLocation(); 
            let localPos = this.DragSprite.node.parent.convertToNodeSpaceAR(pos);
            this.DragSprite.node.position = localPos;
       // this.DragSprite.node.position = event.getLocation();
        
    },
    ONEND(event) {
        if(this.Type!=="consumable")
        {
            this.DragSprite.node.active = false;
            let dragBox = this.DragSprite.node.getBoundingBoxToWorld();

            let shopCtrl = this.CtrolNode.getComponent("ShopController");
            let equipBox = shopCtrl.EquipHolder.getBoundingBoxToWorld();
            let itemBox = shopCtrl.ItemHolder.getBoundingBoxToWorld();

            if (dragBox.intersects(equipBox)&& this.Equip==false) 
                {
                console.log("Đã thả item vào equipBox");
                shopCtrl.UseBtn();

                } 
            else if (dragBox.intersects(itemBox) && this.Equip==true) 
                {
                    console.log("Đã thả item vào itemBox");
                    shopCtrl.UseBtn();
                }
            else 
                {
                    console.log("Thả sai chỗ");
                }
        }
        
    },

    // LIFE-CYCLE CALLBACKS:

    setitem(CtrNode,data)
    {
        console.log("setitem: "+data);
        if(data===null)
        {
            this.PrefabSprites.spriteFrame=null;
            this.Quantity.string="";

            if(this.Equiped)
            this.Equiped.node.active=false;

            this.nameitem="";
            this.Equip=false;
            return;
        }
        this.nameitem=data.name;
        this.PrefabSprites.spriteFrame= data.spriteFrame;
        this.Quantity.string=data.quantity;
        this.CtrolNode=CtrNode;
        
        //console.log("SPRITE: "+this.DragSprite+" "+this.controlNode.getComponent("ShopController").DragSprite);
       
        this.Type=data.type;
        if(this.Equiped)
         this.Equiped.node.active=data.equiped;

        this.Equip=data.equiped;
        let shopCtrl = this.CtrolNode.getComponent("ShopController");
        this.DragSprite = shopCtrl.DragSprite;

        this.node.on(cc.Node.EventType.TOUCH_START, this.ONSTART, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.ONEND, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.ONEND, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.ONDRAG, this);
        
       
    },

    ONCLICK () 
    {
        let data=this.CtrolNode.getComponent("ShopController"); 
       // console.log(this.nameitem+" truyền dô là "+typeof this.nameitem);
        data.ItemClicked(this.nameitem);
       // console.log("Item: "+ this.nameitem+" get từ "+this.controlNode+"Ta có" + data);
    },

    // update (dt) {},
});
