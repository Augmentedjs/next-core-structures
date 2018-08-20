describe("Given Augmented Stack", () => {
  let s;
  beforeEach(() => {
    s = new Struct.Stack();
  });
  afterEach(() => {
    s = null;
  });

  it("can create a stack", () => {
    expect(s instanceof Struct.Stack).to.be.true;
  });

  it("can check for empty", () => {
    expect(s.empty()).to.be.true;
  });

  it("can push data to a stack", () => {
    s.push("monkey");
    expect(s.size()).not.to.equal(0);
  });

  it("can peek data in a stack", () => {
    s.push("monkey");
    const d = s.peek();
    expect(s.size()).not.to.equal(0);
    expect(d).to.equal("monkey");
  });

  it("can pop data in a stack", () => {
    s.push("monkey");
    s.pop();
    expect(s.size()).to.equal(0);
  });

  it("can search for data in a stack", () => {
    s.push("monkey");
    s.push("bonobo");
    s.push("chungito");
    expect(s.search("bonobo")).to.equal(1);
  });

  it("can check the size for data in a stack", () => {
    s.push("monkey");
    s.push("bonobo");
    s.push("chungito");
    expect(s.size()).to.equal(3);
  });

  it("can clear a stack", () => {
    s.push("monkey");
    s.clear();
    expect(s.empty()).to.be.true;
  });
});
