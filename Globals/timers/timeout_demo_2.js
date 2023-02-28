function hello(){
    console.log("Hello World!!");
    setTimeout(hello, 2000);
}
setTimeout(hello, 2000);