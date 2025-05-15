cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label
    },

    async start () {
        this.updateLabelTime();
        this.localDelay();

        // Bài 9 - Circuit Breaker demo
        this.getTimeLimited = await this.circuitBreaker(this.getServerTime.bind(this), 2000);

        // Gọi thử sau 300ms (trong giới hạn)
        setTimeout(async () => {
            const result = await this.getTimeLimited();
            console.log(result); // "ok" hoặc thời gian
        }, 300);

        // Gọi thử sau 2100ms (sau khi circuit breaker đóng)
        setTimeout(async () => {
            const result = await this.getTimeLimited();
            console.log(result); // "service closed"
        }, 2100);
    },

    async updateLabelTime() {
        const time = await this.getServerTime();
        this.label.string = time.toLocaleString();
    },

    localDelay() {
        const getLocalTime = (callback) => {
            callback(null, Date.now());
        };

        let startTime = Date.now();

        const measure = (i) => {
            if (i >= 10) return;

            getLocalTime((err, currentTime) => {
                if (err) {
                    console.error(err);
                    return;
                }

                const latency = currentTime - startTime;
                startTime = currentTime;
                console.log(`Độ trễ local (loop): ${latency}ms`);

                setTimeout(() => measure(i + 1), 100);
            });
        };

        measure(0);
    },

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

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // Bài 9: Circuit Breaker
    async circuitBreaker(fn, timeThreshold) {
        let isOpen = true;

        setTimeout(() => {
            isOpen = false;
        }, timeThreshold);

        return async (...args) => {
            if (!isOpen) {
                return "service closed";
            }

            try {
                return await fn(...args);
            } catch (err) {
                console.error("Circuit error:", err);
                throw err;
            }
        };
    }
});
