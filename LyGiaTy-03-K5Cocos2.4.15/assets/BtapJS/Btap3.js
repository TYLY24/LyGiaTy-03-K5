cc.Class({
    extends: cc.Component,

    properties: {
        sprite1: cc.Sprite,
        sprite2: cc.Sprite,
        sprite3: cc.Sprite,
        sprite4: cc.Sprite
    },

    onLoad() {
        const urls = [
            'https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU',
            'https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4',
            'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ',
            'https://fastly.picsum.photos/id/3/5000/3333.jpg?hmac=GDjZ2uNWE3V59PkdDaOzTOuV3tPWWxJSf4fNcxu4S2g'
        ];

        const spriteList = [this.sprite1, this.sprite2, this.sprite3, this.sprite4];

        this.loadImagesToSprites(urls, spriteList);
    },

    async loadImagesToSprites(urls, spriteList) {
        for (let i = 0; i < urls.length; i++) {
            try {
                const response = await fetch(urls[i]);
                const blob = await response.blob();
                const image = await this.createImageElement(blob);
                const texture = new cc.Texture2D();
                texture.initWithElement(image);
                texture.handleLoadedTexture();
                const spriteFrame = new cc.SpriteFrame(texture);

                spriteList[i].spriteFrame = spriteFrame;
                console.log(`Ảnh ${i + 1} đã gán vào sprite`);
            } catch (err) {
                console.error(`Lỗi tải ảnh ${i + 1}:`, err);
            }

            await this.delay(2000); 
        }
    },

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    createImageElement(blob) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = URL.createObjectURL(blob);
        });
    }
});
