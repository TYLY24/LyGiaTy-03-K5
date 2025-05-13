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

function OutPut(test)
{
    console.log(test);
}

async function HelloWorldBt1() {
    const first = await Hello();
    OutPut(first);
    const Second = await World();
    OutPut(Second);
    
}
HelloWorldBt1();