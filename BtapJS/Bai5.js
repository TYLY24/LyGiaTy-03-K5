// function Bai5()
// {
//     console.log("Đếm số 10 to 1 dung setTimeout");
//     for (let i = 10; i >= 1; i--) {

//         setTimeout(function() {
//             console.log(i);
//         }
//         , (10-i) * 1000);
//     }
// }
// Bai5();


function TapDem(number)
{
    return new Promise(function(resolve) {
        const iDTimeOut = setTimeout(function() {
            let random =Math.floor(Math.random()*1000);

            console.log(number+": "+random);
            resolve(random)
        }
        , 1000);
    });
}

async function Bai5Moi()
{
    console.log("Bat Dau Dem So:");
    for ( let i = 1; i <= 10; i++) {
        //await TapDem(i);
        if(await TapDem(i)<200)
        {
            console.log("Chia het cho 5 D: \n Dem lai tu dau")
            Bai5Moi();
            return;
        }
    }
    console.log("DONE");
}
Bai5Moi();

//random so 1 den 1000 