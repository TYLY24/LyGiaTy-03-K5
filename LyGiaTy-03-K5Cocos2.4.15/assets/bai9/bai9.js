cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label
    },

    start () {
        this.updateLabelTime();
        this.localDelay();
        this.measureLatency();
        this.demoCircuitBreaker(); // Gọi ví dụ circuit breaker
    },

    async updateLabelTime() {
        const time = await this.getServerTime();
        this.label.string = new Date(time).toLocaleString();
    },

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
            return Date.now(); // fallback
        }
    },

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

    async measureLatency() {
        const getLocalTime = () => new Date().getTime();

        const localTime = await this.promisify(getLocalTime)();
        const serverTime = await this.promisify(this.getServerTime.bind(this))();
        const latency = serverTime - localTime;

        console.log("Độ trễ giữa local và server: " + latency + "ms");
    },

    // ✅ Hàm Circuit Breaker tích hợp
    async circuitBreaker(fn, timeThreshold) {
        const startTime = Date.now();

        return async (...args) => {
            const now = Date.now();
            if (now - startTime <= timeThreshold) {
                return await fn(...args);
            } else {
                return "service closed";
            }
        };
    },

    // ✅ Ví dụ sử dụng circuitBreaker
    async demoCircuitBreaker() {
        // Tạo phiên bản giới hạn của getServerTime (2s)
        let getTimeLimited = await this.circuitBreaker(this.getServerTime.bind(this), 2000);

        // Gọi trong 300ms -> OK
        setTimeout(async () => {
            const result = await getTimeLimited();
            console.log("Gọi trong 300ms:", result);
        }, 300);

        // Gọi sau 2100ms -> service closed
        setTimeout(async () => {
            const result = await getTimeLimited();
            console.log("Gọi sau 2100ms:", result);
        }, 2100);
    }
});
