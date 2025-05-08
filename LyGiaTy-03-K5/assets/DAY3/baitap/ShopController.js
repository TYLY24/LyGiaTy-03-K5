
cc.Class({
    extends: cc.Component,

    properties: {
       ItemHolder: cc.Node,
       ItemPrefab: cc.Prefab,


       SlectedItemSprite: cc.Sprite,
       SlectedItemName: cc.Label,
       SlectedItemDes: cc.Label,

       UseBtnLabel: cc.Label,
       ItemifoPanel: cc.Node,

    },

    

    start () {
        let dataScipt = this.getComponent("ItensD3"); 
        this.data = dataScipt.ItemInfo;
        this.selectedDataPos=0;
        this. updateItem();
    },


    ItemClicked(ItemName)
    {
        this.ItemifoPanel.active = true;
       // console.log("DE RUNNED SUCCES")
        for(let i=0; i<this.data.length;i++)
        {
            let dat=this.data[i];
            if(dat.name===ItemName)
            {
                this.selectedDataPos = i;
                this.SlectedItemDes.string=dat.effect;
                this.SlectedItemName.string=dat.name;
                this.SlectedItemSprite.spriteFrame=dat.spriteFrame;


                this.updateBtnLabel(i);
            }
            
        }
    },

    updateBtnLabel(position)
    {
        let dat=this.data[position];
        if(dat.type==="consumable")
            this.UseBtnLabel.string="Use!"
        else
        {
            if(dat.equiped)
            {
                this.UseBtnLabel.string="UnEquip"
            }
            else
            {
                this.UseBtnLabel.string="Equip"
            }
        }
    },

    updateItem() {
        let childlenght = this.ItemHolder.children.length;
        let DataLenght = this.data.length;

        if(DataLenght<childlenght)
        {
            for(let i =DataLenght; i<childlenght;i++)
            {
                
                let childScript=this.ItemHolder.children[i].getComponent("PrefabJSD3");
                    
                        childScript.setitem(this.node,"",null,"",false);
                    
            }
        }

            for (let i = 0; i < DataLenght; i++) {
                let child = this.ItemHolder.children[i];
                let dataUpdate =this.data[i];
                console.log(dataUpdate);
                if(child)
                {
                    let childScript=child.getComponent("PrefabJSD3");
                    if(childScript.name != dataUpdate.name || childScript.quantity != data.quantity)
                    {
                        childScript.setitem(this.node,dataUpdate.name,dataUpdate.spriteFrame,dataUpdate.quantity,dataUpdate.equiped);
                    }
                }
                else
                {
                    let spawnedItem = cc.instantiate(this.ItemPrefab);
                    spawnedItem.setParent(this.ItemHolder); 
                    let spawnedScript = spawnedItem.getComponent("PrefabJSD3");
                    spawnedScript.setitem(this.node,dataUpdate.name,dataUpdate.spriteFrame,dataUpdate.quantity,dataUpdate.equiped);
                
                }
              
            }
        
    },


    UseBtn()
    {
        //console.log("position?"+  this.selectedDataPos);
        this.getComponent("ItensD3").UseItem(this.selectedDataPos);
        this.updateItem();
        this.updateBtnLabel(this.selectedDataPos)
    },

    DropBtn()
    {
        this.getComponent("ItensD3").DropItem(this.selectedDataPos);
        this.updateItem();
       // this.updateBtnLabel(this.selectedDataPos)
    },

    // update (dt) {},
});
