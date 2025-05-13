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
 
 
 function Bai14()
    {
        const FriendList = [FriendA,FriendB,FriendC];

        // FriendList.forEach(friend => {
        //     friend().then();
        // });
        let FriendListcount=FriendList.length;
        for (let i = 0; i < FriendList.length; i++) {
            FriendList[i]().then((result) => {
                FriendLists[i]=result+"  "
                FriendListcount--;
                if( FriendListcount==0)
                    console.log(OutPut());
            });
        }
        
        let FriendLists= []
        function OutPut()
        {
            let output="";
            for (let i = 0; i < FriendLists.length; i++) 
            {
                output+=FriendLists[i] + " \n";
            }
            return output;
        }
    }
    Bai14();