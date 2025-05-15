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
        this.label.string = time.toLocaleString();
    },

    // Bài 5 - đo thời gian local (callback-style nhưng không dùng promisify nữa)
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

                setTimeout(() => measure(i + 1), 100); // thêm delay nhỏ nếu cần
            });
        };

        measure(0);
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

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
});
