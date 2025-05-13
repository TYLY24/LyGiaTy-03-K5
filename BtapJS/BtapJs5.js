function OutPut(test)
{
    console.log(test);
}
// Bai 1============================
function Hello()
{
    return new Promise(function(resolve) {
        console.log("Chuan bi in ra trong 3 giay");
        const iDTimeOut = setTimeout(function() {
            
            resolve("Hello ");
        }
        , 3000);
    });
    
}
function World()
{
    return new Promise(function(resolve) {
        const iDTimeOut = setTimeout(function() {
            resolve("World");
        }
        , 3000);
    });
    
}

async function HelloWorldBt1() {
    const first = await Hello();
    OutPut(first);
    const Second = await World();
    OutPut(Second);
    
}
//HelloWorldBt1();

// Bai 2============================
function CallULater(callback)
{
    console.log("đợi 2s gọi điện lại liền");
    setTimeout(callback, 2000);   
}
function Calling()
{
    console.log("Hello Konichiwa");
}

//CallULater(Calling);

// Bai 3============================
function TapDem(number)
{
    return new Promise(function(resolve) {
        const iDTimeOut = setTimeout(function() {
            console.log(number);
            resolve()
        }
        , 1000);
    });
}
async function Bai3()
{
    console.log("Đếm số 1 to 10");
    for ( let i = 1; i <= 10; i++) {
        await TapDem(i);
    }
}
//Bai3();

// Bai 4============================

function Bai4()
{
    console.log("Đếm số 1 to 10");
    let i=1;
    const ID = setInterval(function() {
        console.log(i);
        i++;
    }
    , 1000);

    setTimeout(function() {
        clearInterval(ID);
    }
    , 10050);
}

//Bai4();

// Bai 5============================
function Bai5()
{
    console.log("Đếm số 10 to 1 dung setTimeout");
    for (let i = 10; i >= 1; i--) {

        setTimeout(function() {
            console.log(i);
        }
        , (10-i) * 1000);
    }
}

//Bai5();
// Bai 6============================

function timer(value, step)
{
    let ID;
    function startTimer()
    {
        ID = setInterval(function() {
            console.log(value);
            value += step;
        }
        , 1000);
    } 
    function stopTimer()
    {
        clearInterval(ID);
    }

    return {
        startTimer: startTimer,
        stopTimer: stopTimer
    };
}

// const timerInstance = timer(100, 10);

// timerInstance.startTimer();

// setTimeout(() => {
// timerInstance.stopTimer();
// }, 5000);

// Bai 7============================

function asyncFunc1(callback) {
    console.log("Started asyncFunc1");
setTimeout(() => {
console.log("Completed asyncFunc1");
callback();
}, 3000);
}
function asyncFunc2(callback) {
console.log("Started asyncFunc2");
setTimeout(() => {
console.log("Completed asyncFunc2");
callback();
}, 2000);
}
function asyncFunc3(callback) {
console.log("Started asyncFunc3");
setTimeout(() => {
console.log("Completed asyncFunc3");
callback();
}, 1000);
}

function callbackManager(functions) 
{
    console.log("Started callbackManager");
    let functionsIndex=0;
    
    function next() {
        if (functionsIndex < functions.length) {
            functions[functionsIndex++](() => {next()});
          
        }
        else{
            console.log("Complete Async");
        }
    }

    next();
}

// driver code
//callbackManager([asyncFunc1, asyncFunc2, asyncFunc3]);

// Bai 8============================

function asyncFunc1(callback) {
    setTimeout(() => {
    callback(1);
    }, 3000);
    }
    function asyncFunc2(callback) {
    setTimeout(() => {
    callback(2);
    }, 2000);
    }
    function asyncFunc3(callback) {
    setTimeout(() => {
    callback(3);
    }, 1000);
    }

    function asyncParallel(functions, callback) 
    {
        let AllRun=functions.length;

        for(let i = 0; i < functions.length; i++) {
            functions[i]((result) => {
                resultsCtr(result,i);
                AllRun--;
                if (AllRun === 0) {
                    callback(ResultsToString());
                }
            });
        }

        let resultsHolder=[];
        function ResultsToString()
        {
            let result = "";
            for (let i = 0; i < resultsHolder.length; i++) {
                result += resultsHolder[i] + " ";
            }
            return result;
        }

        function resultsCtr(Num,position)
        {
            
            resultsHolder[position]= Num;
        }

       // callback(resultsHolder);
    }

    // asyncParallel([asyncFunc1, asyncFunc2, asyncFunc3], (result) => {
    // console.log(result);
    // // 1, 2, 3 (prints results of each asynchronous function in order)
    // });

    // Bai 9============================

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
    //Bai9();

    // Bai 10============================

    async function Bai10()
    {
        try {
            await BanA();
            await BanB();
            await BanC();
            console.log("Hoàn thành");
        } catch (error) {
            console.error("Error:", error);
        }
    }

    //Bai10();


    // Bai 11============================

    function Bai11()
    {
        BanA()
    .then(BanB) .catch((error) => {  
        console.error("Lỗi của thị B:", error);
        return; 
    })
    .then(BanC)
    .catch((error) => {
        console.error("Lỗi chỗ thi C:", error);
        return;
    });
    }
    //Bai11();

    // Bai 12============================

    async function Bai12()
    {
        try {
            await BanA();
        } catch (error) {
            console.error("Lỗi của thị A:", error);
            return;
        }
        try {
            await BanB();
        } catch (error) {
            console.error("Lỗi của thị B:", error);
            return;
        }
        try {
            await BanC();
        } catch (error) {
            console.error("Lỗi chỗ thi C:", error);
            return;
        }
    }
    //Bai12();
    
    // Bai 13============================
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
        const FriendList = [BanA,BanB,BanC];
    

        FriendList.reduce((promiseChuoi, hamHienTai) => {
            return promiseChuoi
                .then(() => hamHienTai())
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

    //Bai13( );
    
    // Bai 14============================
    function Bai14()
    {
        const FriendList = [FriendA,FriendB,FriendC];

        // FriendList.forEach(friend => {
        //     friend().then();
        // });

        for (let i = 0; i < FriendList.length; i++) {
            FriendList[i]().then((result) => {
                FriendLists[i]=result+"  "
                if( i==FriendList.length-1)
                    console.log(OutPut());
            });
        }
        
        let FriendLists= []
        function OutPut()
        {
            let output="";
            for (let i = 0; i < FriendLists.length; i++) 
            {
                output+=FriendLists[i];
            }
            return output;
        }
    }
    Bai14();

