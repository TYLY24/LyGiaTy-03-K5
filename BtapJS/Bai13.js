function FriendA()
    {
        return new Promise(function(resolve) {
            setTimeout(function() {
               
                resolve("Nguyễn thị A");
            }
            , 1000);
        });
    }
    function FriendB()
    {
        return new Promise(function(resolve,reject) {
            setTimeout(function() {
               
                resolve("Lê thị B");
                //reject("B Khong co nha");
            }
            , 3000);
        });
    }
    function FriendC()
    {
        return new Promise(function(resolve,reject) {
            setTimeout(function() {

                resolve("Trần thị C");
                //reject("Lỗi thị C");
            }
            , 2000);
        });
    }
 
    function Bai13()
    {
        const FriendList = [FriendA, FriendB, FriendC];
    

        FriendList.reduce((promiseChuoi, hamHienTai) => {
            return promiseChuoi
                .then(() => hamHienTai().then(result =>{
                    console.log(result);
                }))
                .catch((error) => {
                    console.error("ERROr:", error);
                    // vẫn resolve để tiếp tục chuỗi
                    return Promise.resolve();
                });
        }, Promise.resolve())
        .then(() => {
            console.log("All done");
        });
    }

    Bai13( );