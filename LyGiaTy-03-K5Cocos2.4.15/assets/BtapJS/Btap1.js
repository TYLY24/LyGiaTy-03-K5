cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label
    },

    start () {
        this.updateLabelTime();

    },

    async updateLabelTime() {
        const time = await this.getServerTime();
        this.label.string = time.toLocaleString();
    },


    // Bài 1 - lấy thời gian từ server (async function)
    async getServerTime() {
        try {
            const response = await fetch(window.location.href, {
                method: 'HEAD'
            });

            const dateHeader = response.headers.get('Date');

            if (dateHeader) {
                console.log(dateHeader);
                return new Date(dateHeader);
            } else {
                throw new Error("Date header not found");
            }
        } catch (error) {
            console.error("Failed to get server time:", error);
            return Date.now();
        }
    },

    

    // ✅ delay helper
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    
});
