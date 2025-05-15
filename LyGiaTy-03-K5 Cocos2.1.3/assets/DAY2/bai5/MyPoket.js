
cc.Class({
    extends: cc.Component,

    properties: {
        MoneyTxt: cc.Label,
        ItemPrefab: cc.Prefab,
        PrefabHolder: cc.Node,

        MyPocketItems: cc.Label,

        NoMoney: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.Money=200;
        this.MyPocket = []; 


    },

    start () {
        this.MoneyTxt.string = this.Money;
        this.PrefabSpawn();
        this.MyPocketItems.string = "My Pocket:\n\n";
    },

    PrefabSpawn()
    {
        for (let i = 0; i < 9; i++)
        {
            var item = cc.instantiate(this.ItemPrefab);
            this.PrefabHolder.addChild(item);
            item.getComponent("Prefab").SetItem(i);
            item.getComponent("Prefab").Controller = this.node;
        }
        
    },

    AddtoPocket(name,price)
    {
        if(this.Money < price)
        {
            console.log("Not enough money");
            this.NoMoney.active = true;
            this.scheduleOnce(() =>{
                this.NoMoney.active = false;
            }, 0.5);
            
            return;
        }
        else
        {
            for (let i = 0; i < this.MyPocket.length; i++)
                {
                    if (this.MyPocket[i].name == name)
                    {
                        this.MyPocket[i].Quantity++;
                        this.Money -= price;
                        this.MoneyTxt.string = this.Money;
                        this.updatePoket();
                        return;
                    }
                }
                var item = {name:name,Quantity:1};
                this.MyPocket.push(item);
                this.Money -= price;
                this.MoneyTxt.string = this.Money;
        
                this.updatePoket();
        }
        
    },

    updatePoket()
    {
        this.MyPocketItems.string = "My Pocket:\n\n";
        for (let i = 0; i < this.MyPocket.length; i++)
        {
            this.MyPocketItems.string += this.MyPocket[i].name +": "+ this.MyPocket[i].Quantity +"\n";
        }
    }


    // update (dt) {},
});
