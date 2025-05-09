

cc.Class({
    extends: cc.Component,

    properties: {
        BubblePrefab: cc.Prefab,
        GameController: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onEnable ()
    {
        this.bubblePool = new cc.NodePool();

        this.MaxBubble = 18;
        for (let i = 0; i < this.MaxBubble; i++)
        {
            this.SpawnBubble();
        }
    },
    
    

    SpawnBubble()
    {
        let bubble = null;
        if (this.bubblePool.size() <= 0)
            {
                bubble = cc.instantiate(this.BubblePrefab);
                bubble.getComponent("BubbleScript").Spawner = this.node;
                bubble.getComponent("BubbleScript").GameController = this.GameController;
            }
        else
            {
                bubble = this.bubblePool.get();             
            }
        this.node.addChild(bubble);
        bubble.setPosition(this.RandomPosition());

    },
    
    RandomPosition()
    {
        const screenSize = cc.view.getVisibleSize();

        const randomX = (Math.random()*0.8 + 0.1) * this.node.width;
        const randomY = (Math.random()*0.8 + 0.1) * this.node.height;

        return cc.v2(randomX, randomY);
    },

    start () {

    },

    allBacktoPool()
    {
        this.bubblePool.clear();
        this.node.removeAllChildren();
        
    },


    BacktoPool(bubble)
    {
        this.bubblePool.put(bubble);

        this.scheduleOnce(() => {
            this.SpawnBubble()
        }, Math.random());
    }

    // update (dt) {},
});
