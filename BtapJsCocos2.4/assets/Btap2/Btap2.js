cc.Class({
    extends: cc.Component,

    properties: {
        Label : cc.Label,
    },

    start () {
        this.fetchWithRetry('https://jsonplaceholder.typicode.com/posts/1', 3)
            .then(data => {
                cc.log("Kết quả:", data.substring(0, 200)); 
                this.Label.string=data.substring(0, 200);// In 200 ký tự đầu
            })
            .catch(error => {
                cc.error("Lỗi request:", error.message);
                 this.Label.string=error.message;
            });
    },

    async fetchWithRetry(url, maxRetries = 3, delay = 500) {
        let attempt = 0;

        while (attempt < maxRetries) {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                return await response.text(); // Hoặc .json() nếu là API JSON

            } catch (error) {
                attempt++;
                cc.warn(`Thử lần ${attempt} thất bại: ${error.message}`);
                this.Label.string=(`Thử lần ${attempt} thất bại: ${error.message}`);
                 await new Promise((resolve) => setTimeout(resolve, delay));
                if (attempt >= maxRetries) {
                    throw new Error(`Thất bại sau ${maxRetries} lần thử`);
                }

                // Chờ một thời gian trước khi thử lại
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
    },
});
