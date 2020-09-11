function test(obj) {
  const { a, b, c } = obj;

  if (a) {
    console.group("A output");
    console.log("a " + a);
  } else if (b) {
    console.log("b " + b);
  } else if (c) {
    console.log("c " + c);
  } else {
    console.log("Opps.");
  }
}

test({ a: "25" });
