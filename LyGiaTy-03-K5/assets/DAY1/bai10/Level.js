
cc.Class({
    extends: cc.Component,

    properties: {
        Lv: 0,
        Output: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onClick() {
        if (this.Lv >= 1 && this.Lv <= 3) {
            this.Output.string = "Lv: " + this.Lv + " Beginner";
        } else if (this.Lv >= 4 && this.Lv <= 7) {
            this.Output.string = "Lv: " + this.Lv + " Intermediate";
        } else if (this.Lv >= 8 && this.Lv <= 10) {
            this.Output.string = "Lv: " + this.Lv + " Expert";
        } else {
            this.Output.string = "Lv: " + this.Lv + " Invalid Level";
        }
    }
    

    
});
