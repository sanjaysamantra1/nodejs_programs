console.log('GEC Started')
function displayA() { console.log('aaaaaaaa') }
function displayB() { console.log('bbbbbbbb') }
function displayC() { console.log('cccccccc') }
function displayD() { console.log('ddddddd') }
setTimeout(displayC, 1000);
displayA();
Promise.resolve().then(displayD);
displayB();
console.log('GEC closed');