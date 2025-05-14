cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label
    },

    start () {
        this.updateLabelTime();
        this.localDelay();
    },

    async updateLabelTime() {
        const time = await this.getServerTime();
        this.label.string = new Date(time).toLocaleString();
    },
    
    //Bai5 LOG PROMISE
    localDelay() {
        const getLocalTime = () => new Date().getTime();
        let startTime = getLocalTime();
        
        for (let i = 0; i < 10; i++) {
            const currentTime = getLocalTime();
            const latency = currentTime - startTime;
            startTime = currentTime;
            console.log('Độ trễ: ' + latency + 'ms');
        }
    },
//BAI1 getSeverTime
    async getServerTime() {
        try {
            const response = await fetch(window.location.href.toString(), {
                method: 'HEAD',
                
            });

            const dateHeader = response.headers.get('Date');
            if (dateHeader) {
                return new Date(dateHeader).getTime();
            } else {
                throw new Error("Date header not found in response");
            }

        } catch (error) {
            alert("AJAX not supported or request failed");
            return Date.now(); // fallback to local time
        }
    }
});
