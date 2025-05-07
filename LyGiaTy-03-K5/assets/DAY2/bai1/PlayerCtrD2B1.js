
cc.Class({
    extends: cc.Component,

    properties: {
        HP: cc.Label,
        MP: cc.Label,
        DEF: cc.Label,
        ATK: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () 
     {
        this.health=100;
        this.attack= this.random(10,20);
        this.defense= this.random(5,15);
        this.energy=50;
        
     },

     SetStat()
     {
        this.HP.string="HP: " + this.health;
        this.MP.string="MP: " + this.energy;
        this.DEF.string="DEF: " + this.defense;
        this.ATK.string="ATK: "+ this.attack;
     },
    attacked (x) 
    {
        if(x-this.defense>=0)
        {
            this.health-=(x-this.defense);
        }
        this.SetStat();
    },

    Recover()
    {
        this.energy += 20;
        if(this.energy> 100)
            this.energy = 100;
        this.SetStat();
    },

    Skill()
    {
        if(this.energy>=30)
        {
            this.energy-=30;
            return this.attack*2;
        }
        else
        {
            return 0;
        }
    },

    NormalAttack()
    {
        return this.attack;
    },

     random(b, c) 
    {
        return Math.floor(Math.random() * (c - b + 1)) + b;
    },

    start () {
        this.SetStat();
    },


    isDead()
    {
        if(this.health>0)
            return false;
        else
            return true;
    }
    // - `health`: 100.
    // - `attack`: Ngẫu nhiên từ 10 đến 20.
    // - `defense`: Ngẫu nhiên từ 5 đến 15.
    // - `energy`: 50.

    // update (dt) {},
});
