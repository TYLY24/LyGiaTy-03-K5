
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
           
                this.EnemyPlay();
           
            
           
            
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
            if(this.Enemy.ManaCheck())
            this.Player.attacked(this.Enemy.Skill());
            else
            this.EnemyPlay();
            break;
        case 2:
            this.Enemy.Recover();
            break;
        }

        this.PlayerAnimation.OnHit();
        
            this.WinCheck();
        
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
        this.WinCheck();
    },
    SkillBtn()
    {
        if(this.Player.ManaCheck())
        {
            this.Enemy.attacked(this.Player.Skill());
            this.EnemyAnimation.OnHit();
            this.WinCheck();
        } 
        else
        {
            this.TurnLabel.string="Not Enough Mana!"
         

        }
        
    },
    RecoverBtn()
    {
        this.Player.Recover();
        this.WinCheck();
    },


    WinCheck()
    {
        
        if(this.Player.isDead())
        {
            this.PlayerAnimation.Dead();
            this.TurnLabel.string="You LOse! Noob"
        }
        else if(this.Enemy.isDead())
        {
            this.EnemyAnimation.Dead();
            this.TurnLabel.string="You Win! Lucky u"
        }
        else 
        setTimeout(() => {
            this.TurnChange();
        }, 1000);
        
    }

    
});
