
cc.Class({
    extends: cc.Component,

    properties: {
       MissionPrefab: cc.Prefab,
       MissionHolder: cc.Node,
       MissionIndexTest: 10,
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () 
     {
        this.missions = [
        { name: "Khám Phá Rừng Bí Ẩn", done: false },
        { name: "Tiêu Diệt Quái Vật", done: false },
        { name: "Thu Thập Đá Quý", done: false },
        { name: "Bảo Vệ Làng Xoáy", done: false },
        { name: "Giải Cứu Thế Giới", done: false },
        { name: "Hoàn Thành Cuộc Hành Trình", done: false },
        { name: "Đánh Bại Tên Thủ Lĩnh", done: false },
        { name: "Khám Phá Hang Động", done: false },
        { name: "Tìm Kiếm Chìa Khóa Vàng", done: false },
        { name: "Đưa Món Quà Tới Người Dân", done: false },
        { name: "Cứu Con Tin", done: false },
        { name: "Tìm Ra Kẻ Phản Bội", done: false },
        { name: "Khám Phá Địa Ngục", done: false },
        { name: "Vượt Qua Pháo Đài Cổ", done: false },
        { name: "Điều Tra Lịch Sử Xoáy", done: false }
            ];
     },

    start () {
        this.SpawnMission();
    },

    completeQuestBtn()
    {
        this.completeQuest(this.MissionIndexTest);
    },
    completeQuest(index)
    {
        let mission =this.missions[index];
        mission.done=true;
        this.updateMissionView();
    },

    updateMissionView()
    {
        for (let i = 0; i < this.MissionHolder.children.length; i++) {
            let spawnedItem = this.MissionHolder.children[i];
            let mission = this.missions[i];
                let labelNode = spawnedItem.getChildByName("label");
                if (labelNode) {
                    let label = labelNode.getComponent(cc.Label);
                    if (label) {
                        label.string = mission.name;
                    }
                }

            
                let toggleNode = spawnedItem.getChildByName("toggle");
                if (toggleNode) {
                    let toggle = toggleNode.getComponent(cc.Toggle);
                    if (toggle) {
                        toggle.isChecked = mission.done;
                    }
                }
            }
    },

    SpawnMission()
    {
        for (let i = 0; i < this.missions.length; i++) 
        {
            
            var spawnedItem = cc.instantiate(this.MissionPrefab);
            this.MissionHolder.addChild(spawnedItem);

        
        }
        this.updateMissionView();
    }

    // update (dt) {},
});
