// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        Tile: cc.Label,
        Body: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:
     fetchDataWithTimeout(url, timeout) {
        return new Promise((resolve, reject) => {
            const controller = new AbortController(); // Tạo AbortController
            const signal = controller.signal;
    
            // Thiết lập timeout để hủy request nếu quá thời gian
            const timeoutId = setTimeout(() => {
                controller.abort(); // Hủy request
            }, timeout);
    
            // Gửi request fetch kèm theo signal để có thể hủy
            fetch(url, { signal })
                .then(response => {
                    clearTimeout(timeoutId); // Dừng timeout khi có phản hồi
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json(); // Trả dữ liệu JSON
                })
                .then(data => resolve(data))
                .catch(error => {
                    if (error.name === 'AbortError') {
                        reject(new Error('Request timed out'));
                    } else {
                        reject(error);
                    }
                });
        });
    },

    call()
    {
            const URL = 'https://jsonplaceholder.typicode.com/posts/1';
    const TIMEOUT = 5000;

    this.fetchDataWithTimeout(URL, TIMEOUT)
        .then(data => {
            this.Body.string="Fetched data:"+ data.body
            this.Tile.string="Fetched data:"+ data.title

        })
        .catch(error => {
            console.error('Error:', error.message);
        });

    },
    

    // onLoad () {},

    start () {
        this.call();
    },

    // update (dt) {},
});
