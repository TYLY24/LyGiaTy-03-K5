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
    , 11000);
}

 
Bai4();