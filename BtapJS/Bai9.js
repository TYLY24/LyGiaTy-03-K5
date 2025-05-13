function BanA()
    {
        return new Promise(function(resolve) {
            setTimeout(function() {
                console.log("Nguyễn thị A");
                resolve();
            }
            , 1000);
        });
    }
    function BanB()
    {
        return new Promise(function(resolve,reject) {
            setTimeout(function() {
                console.log("Lê thị B");
                resolve();
                //reject("B Khong co nha");
            }
            , 3000);
        });
    }
    function BanC()
    {
        return new Promise(function(resolve,reject) {
            setTimeout(function() {
                console.log("Trần thị C");
                resolve();
                //reject("Lỗi thị C");
            }
            , 2000);
        });
    }
    function Bai9()
    {
        BanA()
        .then(BanB)
        .then(BanC)
        .then(() => {
            console.log("Hoàn thành");
        })
        .catch((error) => { 
            console.error("Error:", error);
        });
    }
    Bai9();