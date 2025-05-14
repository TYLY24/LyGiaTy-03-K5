cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label
    },

    start () {
        this.updateLabelTime();
        this.localDelay();
      //   this.measureLatency();
    },

    async updateLabelTime() {
        const time = await this.getServerTime();
        this.label.string = time.toLocaleString();//new Date(time).toLocaleString();
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
            console.log(dateHeader);
        return new Date(dateHeader);//.getTime();
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
    async  measureLatencyWithServerTime() {
    let startTime = await this.getServerTime(); 

    for (let i = 0; i < 10; i++) {
        const currentTime = await this.getServerTime(); 
        const latency = currentTime - startTime;
        startTime = currentTime;
        console.log('Độ trễ: ' + latency + ' ms');

        await this.delay(1000); // ✅ đúng
 // thêm delay nếu muốn mỗi lần đo cách nhau 1s
    }
    },

    delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

});
