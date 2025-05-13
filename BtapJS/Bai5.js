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
Bai5();