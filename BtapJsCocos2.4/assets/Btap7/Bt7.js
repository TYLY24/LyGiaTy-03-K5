cc.Class({
    extends: cc.Component,

    properties: {
        Label: cc.Label,
    },

    start() {
        const self = this; // Lưu lại context của component

        class LazyMan {
            constructor(name, labelRef) {
                this.tasks = [];
                this.label = labelRef;

                this.tasks.push(() => {
                    
                    setTimeout(() => {
                       console.log(`My name is ${name}`);
                       if (this.label) this.label.string = `My name is ${name}`;
                        this.next();
                    }, 1000);
                    
                });

                setTimeout(() => {
                    this.next();
                }, 0);
            }

            next() {
                const task = this.tasks.shift();
                if (task) task();
            }

            eat(food) {
                this.tasks.push(() => {
                    

                     setTimeout(() => {
                       console.log(`I am eating ${food}`);
                        if (this.label) this.label.string = `I am eating ${food}`;
                        this.next();
                    }, 1000);
                });
                return this;
            }

            sleep(ms) {
                this.tasks.push(() => {
                    setTimeout(() => {
                        console.log(`I am sleeping...`);
                        if (this.label) this.label.string = `I am sleeping...`;
                    }, 1000);
                    
                    setTimeout(() => {
                        console.log(`After ${ms / 1000} seconds`);
                        if (this.label) this.label.string = `After ${ms / 1000} seconds`;
                        this.next();
                    }, ms);
                });
                return this;
            }
        }

        // Gọi LazyMan và truyền this.Label vào
        const lazyMan = new LazyMan('jack', self.Label);
        lazyMan
            .eat('apple')
            .sleep(5000)
            .eat('hamburger')
            .sleep(3000)
            .eat('pear');
    },
});
