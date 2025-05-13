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

const timerInstance = timer(100, 10);

timerInstance.startTimer();

setTimeout(() => {
timerInstance.stopTimer();
}, 5000);