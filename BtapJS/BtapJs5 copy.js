function task1() {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log("✔ Task 1 done");
        resolve("data from task1");
      }, 1000);
    });
  }
  
  function task2(input) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log("✔ Task 2 done, input:", input);
        resolve("data from task2");
      }, 1000);
    });
  }
  
  function task3(input) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log("✔ Task 3 done, input:", input);
        resolve("done");
      }, 1000);
    });
  }
  
  // Cách dùng async/await
  async function runTasks() {
    const result1 = await task1();
    const result2 = await task2(result1);
    const result3 = await task3(result2);
    console.log("🎉 Tất cả xong!");
  }
  
  runTasks();
  