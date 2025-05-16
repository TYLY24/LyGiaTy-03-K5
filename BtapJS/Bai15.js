async function asyncFunc1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("asyncFunc1: Thành công");
        }, 1000);
    });
}

async function asyncFunc2() {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
           // resolve("asyncFunc2: Thành công");
             reject("asyncFunc2:Bad");
        }, 2000);
    });
}

async function asyncFunc3() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("asyncFunc3: Thất bại");
        }, 1500);
    });
}


function timeoutFunc(timeout) {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject("Timeout: Thời gian chờ vượt quá giới hạn");
        }, timeout);
    });
}

function Bai15() {
    const asyncArr = [asyncFunc1, asyncFunc2, asyncFunc3];

    const timeout = 3000;

    const promiseArr = [
        ...asyncArr.map(func => func()),
        timeoutFunc(timeout)
    ];

    Promise.race(promiseArr)
        .then(result => {
            console.log(result);
        })
        .catch(error => {

                console.error(error);
            
        });
}

Bai15();
