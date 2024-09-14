let f1 = function () {
    console.log(this); // this = global 
}
f1()

let f2 = () => {
    console.log(this); // this = {}
}
f2()