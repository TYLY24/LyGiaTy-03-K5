cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label
    },

    onLoad() {
        this.output = [];
    },

    start() {
        this.runContributeExample();
    },

    // ----------- Class Store ------------
    Store: class {
        constructor(name) {
            this.name = name;
            this.dependencies = [];
            this.executed = false;
        }

        wait(otherStore) {
            this.dependencies.push(otherStore);
        }

        async run() {
            if (this.executed) return;
            for (let dep of this.dependencies) {
                await dep.run();
            }
            this.executed = true;
        }
    },

    async contribute(stepTime, ...stores) {
        for (let store of stores) {
            await store.run(); // Đảm bảo tất cả được đánh dấu executed đúng cách
        }

        // Lọc ra theo thứ tự thực thi dựa trên dependencies
        const executedOrder = [];

        const visited = new Set();
        async function dfs(store) {
            if (visited.has(store)) return;
            for (let dep of store.dependencies) {
                await dfs(dep);
            }
            visited.add(store);
            executedOrder.push(store);
        }

        for (let store of stores) {
            await dfs(store);
        }

        // In ra từng store theo thời gian stepTime
        for (let store of executedOrder) {
            await this.delay(stepTime * 1000);
            console.log(store.name);
            this.appendLabel(store.name);
        }
    },

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    appendLabel(text) {
        this.output.push(text);
        this.label.string = this.output.join("\n");
    },

    async runContributeExample() {
        const Store = this.Store; // shorthand

        const store1 = new Store('store_1');
        const store2 = new Store('store_2');
        const store3 = new Store('store_3');
        const store4 = new Store('store_4');
        const store5 = new Store('store_5');

        store1.wait(store3);
        store3.wait(store2);
        store2.wait(store5);
        store5.wait(store4);

        await this.contribute(3, store1, store2, store3, store4, store5);
    }
});
