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
Bai3();