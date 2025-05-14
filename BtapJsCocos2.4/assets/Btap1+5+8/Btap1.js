cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label
    },

    start () {
        this.updateLabelTime();
        this.localDelay();
        this.measureLatency();
    },

    async updateLabelTime() {
        const time = await this.getServerTime();
        this.label.string = new Date(time).toLocaleString();
    },

    // Bài 5 - đo thời gian local (chạy vòng lặp đo latency đơn giản)
    localDelay() {
        const getLocalTime = () => new Date().getTime();
        let startTime = getLocalTime();
        
        for (let i = 0; i < 10; i++) {
            const currentTime = getLocalTime();
            const latency = currentTime - startTime;
            startTime = currentTime;
            console.log('Độ trễ local (loop): ' + latency + 'ms');
        }
    },

    // Bài 1 - lấy thời gian từ server
    async  getServerTime() {
    try {
        const response = await fetch(window.location.href, {
        method: 'HEAD'
        });

        const dateHeader = response.headers.get('Date');

        if (dateHeader) {
        return new Date(dateHeader).getTime();
        } else {
        throw new Error("Date header not found");
        }
    } catch (error) {
        console.error("Failed to get server time:", error);
        // Nếu fetch không hoạt động, có thể trả về thời gian của client như fallback
        return Date.now();
    }
    },


    // Hàm promisify (được tích hợp vào)
    promisify(fn) {
        return function (...args) {
            try {
                const result = fn(...args);
                if (result instanceof Promise) {
                    return result;
                } else {
                    return Promise.resolve(result);
                }
            } catch (error) {
                return Promise.reject(error);
            }
        };
    },

    // Đo độ trễ giữa local time và server time
    async measureLatency() {
        const getLocalTime = () => new Date().getTime();

        const localTime = await this.promisify(getLocalTime)();
        const serverTime = await this.promisify(this.getServerTime.bind(this))();
        const latency = serverTime - localTime;

        console.log("Độ trễ giữa local và server: " + latency + "ms");
    }
});
