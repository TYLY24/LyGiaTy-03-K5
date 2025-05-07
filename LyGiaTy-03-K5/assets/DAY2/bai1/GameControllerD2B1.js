
cc.Class({
    extends: cc.Component,

    properties: {
        Player: require("PlayerCtrD2B1"),
        Enemy: require("EnemyCtrD2B1"),
        PlayerAnimation: require("AnimationD2B1"),
        EnemyAnimation: require("AnimationD2B1"),


        BtnAttack: cc.Button,
        BtnSkill: cc.Button,
        BtnRecover: cc.Button,

        TurnLabel: cc.Label,

    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () 
     {
        this.TurnOfPlayer=true;
     },

    start () 
    {
        let PlayerAnimation = this.Player.node.getComponent("AnimationD2B1");
        let ç = this.Enemy.node.getComponent("AnimationD2B1");
        
        this.ButtonLock(true);
        this.TurnChange();
    },
    TurnChange()
    {
        this.TurnOfPlayer=!this.TurnOfPlayer;


        if(!this.TurnOfPlayer)
        {
            this.TurnLabel.string="Enemy Turn!";
            this.ButtonLock(true);
            setTimeout(() => {
                this.EnemyPlay();
            }, 1000);
            
           
            
        }
        else
        {
            this.TurnLabel.string="Your Turn!";
            this.ButtonLock(false);
        }
    },

    EnemyPlay()
    {
        let random = Math.floor(Math.random() * 3); 

    switch (random) {
        case 0:
            this.Player.attacked(this.Enemy.NormalAttack());
            break;
        case 1:
            this.Player.attacked(this.Enemy.Skill());
            break;
        case 2:
            this.Enemy.Recover();
            break;
        }

        this.PlayerAnimation.OnHit();
        setTimeout(() => {
            this.TurnChange();
        }, 1000);
    },

    ButtonLock(LoN)
    {
        this.BtnAttack.interactable=!LoN;
        this.BtnSkill.interactable=!LoN;
        this.BtnRecover.interactable=!LoN;
    },



    AttackBtn()
    {
        this.Enemy.attacked(this.Player.NormalAttack());
        this.EnemyAnimation.OnHit();
        this.TurnChange();
    },
    SkillBtn()
    {
        this.Enemy.attacked(this.Player.Skill());
        this.EnemyAnimation.OnHit();
        this.TurnChange();
    },
    RecoverBtn()
    {
        this.Player.Recover();
        this.TurnChange();
    },

    
});
