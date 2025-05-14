var async = require("async");
cc.Class({
    extends: cc.Component,

    properties: {
        Label: cc.Label
    },

    start () {
        this.updateServerTime();
    },

    async updateServerTime() {
        const serverTime = await getServerTime();
        const date = new Date(serverTime);
        this.Label.string = date.toLocaleString();
    },

  
});