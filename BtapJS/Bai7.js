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
callbackManager([asyncFunc1, asyncFunc2, asyncFunc3]);