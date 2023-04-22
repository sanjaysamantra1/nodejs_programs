let emp = {};
// inside an object the key should be a string / symbol
emp.name = "John";
emp['sal'] = 5000;

let id = Symbol("id");
emp[id] = 101;

for (let key in emp) {
    console.log(key, emp[key]);
}
console.dir(emp);

console.log(Object.keys(emp));




