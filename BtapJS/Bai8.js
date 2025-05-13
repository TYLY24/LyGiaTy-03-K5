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

    asyncParallel([asyncFunc1, asyncFunc2, asyncFunc3], (result) => {
    console.log(result);
    // 1, 2, 3 (prints results of each asynchronous function in order)
    });