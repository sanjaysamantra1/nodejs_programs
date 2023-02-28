var nestedObject = {
  data: {
    info: {
      stuff: {
        thing: {
          moreStuff: {
            magicNumber: 22,
            something: "hello",
            manyMoreStuff: {
              number: 44,
            },
          },
        },
      },
    },
  },
};
console.log(nestedObject);
console.dir(nestedObject);
console.dir(nestedObject, { depth: 3 });
console.dir(nestedObject, { depth: 4 });
console.dir(nestedObject, { depth: null });
