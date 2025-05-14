cc.Class({
    extends: cc.Component,

    properties: {
        // Create a label in the Cocos UI
      
    },

    // LIFE-CYCLE CALLBACKS:

    start () {
        // Create the Store class with label handling
        class Store {
            constructor(name) {
                this.name = name;
                this.dependencies = [];
                this.isContributed = false;
            }

            // Method to specify dependencies (other stores it has to wait for)
            wait(store) {
                this.dependencies.push(store);
            }

            // Method to contribute (wait until all dependencies are resolved)
            async contribute(stepTime, ...stores) {
                // Create a set of stores that need to be contributed
                let contributionQueue = stores.slice();
                let resultText = '';

                // Sort the stores based on dependencies, i.e., store waiting for another store
                while (contributionQueue.length > 0) {
                    for (let i = 0; i < contributionQueue.length; i++) {
                        const store = contributionQueue[i];

                        // Check if all dependencies of the store have been contributed
                        const allDependenciesMet = store.dependencies.every(dep => dep.isContributed);

                        if (allDependenciesMet) {
                            // If all dependencies are met, mark the store as contributed
                            resultText += store.name + '\n'; // Add store's name to the result text
                            store.isContributed = true;

                            // Remove the store from the queue as it's now contributed
                            contributionQueue.splice(i, 1);
                            break;
                        }
                    }
                    // Wait for the specified step time before checking again
                    await new Promise(resolve => setTimeout(resolve, stepTime * 1000));
                }

                // Once all stores have contributed, update the label
                this.updateLabel(resultText);
            }

            // Method to update the label with the final result
            updateLabel(resultText) {
                // Set the result to the label component
                console.log(resultText);
                
                
            }
        }

        // Create stores
        const store1 = new Store('store_1');
        const store2 = new Store('store_2');
        const store3 = new Store('store_3');
        const store4 = new Store('store_4');
        const store5 = new Store('store_5');

        // Define dependencies (wait for other stores)
        store1.wait(store3);
        store3.wait(store2);
        store2.wait(store5);
        store5.wait(store4);

        // Start contributing with 3 seconds interval
        store1.contribute(3, store1, store2, store3, store4, store5);
    },
});
