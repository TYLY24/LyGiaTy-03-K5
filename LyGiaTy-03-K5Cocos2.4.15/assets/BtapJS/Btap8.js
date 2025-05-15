cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label
    },

    start () {
        this.updateLabelTime();
        this.localDelay();
        this.measureLatencyWithServerTime();
    },

    async updateLabelTime() {
        const time = await this.getServerTime();
        this.label.string = time.toLocaleString();
    },

    // Bài 5 - đo thời gian local (callback-style)
    localDelay() {
        // Callback-style function
        const getLocalTime = (callback) => {
            callback(null, Date.now());
        };

        const promisifiedGetLocalTime = this.promisify(getLocalTime);

        let measure = async () => {
            let startTime = await promisifiedGetLocalTime();

            for (let i = 0; i < 10; i++) {
                const currentTime = await promisifiedGetLocalTime();
                const latency = currentTime - startTime;
                startTime = currentTime;
                console.log('Độ trễ local (loop): ' + latency + 'ms');
            }
        };

        measure(); // gọi async function
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

    // ✅ Đo độ trễ giữa local time và server time
    async measureLatencyWithServerTime() {
        const getLocalTime = (callback) => {
            callback(null, Date.now());
        };

        const promisifiedGetLocalTime = this.promisify(getLocalTime);
        const promisifiedGetServerTime = this.promisify(this.getServerTime.bind(this));

        let localTime = await promisifiedGetLocalTime();
        let serverTime = await promisifiedGetServerTime();

        const latency = serverTime - localTime;
        console.log("Độ trễ: " + latency + " ms");

        // Đo lặp lại 10 lần
        for (let i = 0; i < 10; i++) {
            const nextLocal = await promisifiedGetLocalTime();
            const nextServer = await promisifiedGetServerTime();
            const delta = nextServer - nextLocal;
            console.log("Độ trễ (lần " + (i + 1) + "): " + delta + " ms");
            await this.delay(1000);
        }
    },

    // ✅ delay helper
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // ✅ promisify hỗ trợ cả callback-style và async
    promisify(fn) {
        return function (...args) {
            return new Promise((resolve, reject) => {
                // Nếu là callback-style function (fn.length > args.length)
                if (fn.length > args.length) {
                    fn(...args, (err, result) => {
                        if (err) reject(err);
                        else resolve(result);
                    });
                } else {
                    // Async hoặc sync
                    try {
                        const result = fn(...args);
                        if (result instanceof Promise) {
                            result.then(resolve).catch(reject);
                        } else {
                            resolve(result);
                        }
                    } catch (err) {
                        reject(err);
                    }
                }
            });
        }
    }
});
