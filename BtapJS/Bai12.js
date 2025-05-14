  function BanA()
    {
        return new Promise(function(resolve) {
            setTimeout(function() {
                console.log("Nguyễn thị A");
                resolve("A OK");
            }
            , 1000);
        });
    }
    function BanB()
    {
        return new Promise(function(resolve,reject) {
            setTimeout(function() {
                console.log("Lê thị B");
                //resolve();
                reject("B Khong co nha");
            }
            , 3000);
        });
    }
    function BanC()
    {
        return new Promise(function(resolve,reject) {
            setTimeout(function() {
                console.log("Trần thị C");
                resolve("A OK");
                //reject("Lỗi thị C");
            }
            , 2000);
        });
    }

    let ErrorPart= null
    async function Bai12()
    {
        try {
            await BanA();
            
        } catch (error) {
           // console.error("Lỗi của thị A:", error);
            if(ErrorPart) ErrorPart("Lỗi của thị A:"+ error);
        }
        try {
            await BanB();
        } catch (error) {
           // console.error("Lỗi của thị B:", error);
            if(ErrorPart) ErrorPart("Lỗi của thị B:"+ error);
        }
        try {
            await BanC();
        } catch (error) {
           // console.error("Lỗi chỗ thi C:", error);
            if(ErrorPart) ErrorPart("Lỗi của thị C:"+ error);
        }
    }
    
    async function Bai12Test2() {
        console.log("Bắt đầu kiểm tra...");
        const PromiseError = new Promise((resolve) =>
        {
            ErrorPart =resolve;
            
        }
        );
        let ErrorName= await PromiseError;
        console.log("Error:" + ErrorName);
    }

     Bai12();
    Bai12Test2();