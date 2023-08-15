let obj = {
  f1: function () {
    console.log(this); // obj
  },
  f2: () => {
    console.log(this); // {}
  },
};

obj.f1(); // obj is left of the dot, so this is obj
obj.f2(); // this is module.exports
