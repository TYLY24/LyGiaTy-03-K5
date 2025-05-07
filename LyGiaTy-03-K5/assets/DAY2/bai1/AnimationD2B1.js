
cc.Class({
    extends: cc.Component,

    properties: {
        Character: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    OnHit () {
        this.Character.color=cc.Color.RED;
        setTimeout(() => {
            this. Character.color=cc.Color.WHITE;
        }, 300);
    },

    // update (dt) {},
});
