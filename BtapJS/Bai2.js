function CallULater(callback)
{
    console.log("đợi 2s gọi điện lại liền");
    setTimeout(callback, 2000);   
}
function Calling()
{
    console.log("Hello Konichiwa");
}

CallULater(Calling);