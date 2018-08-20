describe("Given a Map", () => {
  let map;

  beforeEach(() => {
    map = new Struct.AugmentedMap();
  });

  afterEach(() => {
    map = null;
  });

  it("is defined", () => {
    expect(Struct.AugmentedMap).to.not.be.undefined;
  });

  it("can create an instance", () => {
    expect(map instanceof Struct.AugmentedMap).to.be.true;
  });

  it("can add a string to the map", () => {
    map.set("name", "bubba");

    expect(map.size()).to.equal(1);
  });

  it("can get a string from the map", () => {
    map.set("name", "bubba");

    expect(map.get("name")).to.equal("bubba");
  });

  it("can get an array from the map", () => {
    map.set("names", ["bubba", "bob"]);

    expect(map.get("names").length).to.equal(2);
  });

  it("can get an map from the map", () => {
    map.set("map", new Struct.AugmentedMap());
    const m = map.get("map");

    expect(m instanceof Struct.AugmentedMap).to.be.true;
  });

  it("can get an object from the map", () => {
    map.set("object", { "x": "y" });

    expect(map.get("object").x).to.equal("y");
  });

  it("can remove a string to the map", () => {
    map.set("name", "bubba");
    map.remove("name");
    expect(map.size()).to.equal(0);
  });

  it("has a string in the map", () => {
    map.set("name", "bubba");

    expect(map.has("name")).to.be.true;
  });

  it("does not have a string in the map", () => {
    map.set("name", "bubba");

    expect(map.has("x")).to.be.false;
  });

  it("has a string key in the map", () => {
    map.set("name", "bubba");

    expect(map.key(0)).to.equal("name");
  });

  it("has a entries in the map", () => {
    map.set("name", "Bob");
    map.set("age", 36);
    map.set("height", "6.0\"");

    expect(map.entries().length).to.equal(3);
  });

  it("has a values in the map", () => {
    map.set("name", "Bob");
    map.set("age", 36);
    map.set("height", "6.0\"");

    expect(map.values().length).to.equal(3);
  });

  it("can marshall a map via constructor", () => {
    map.set("name", "Bob");
    map.set("age", 36);
    map.set("height", "6.0\"");

    const map2 = new Struct.AugmentedMap(map);
    expect(map.values()).to.deep.equal(map2.values());
  });

  it("can marshall a map", () => {
    const map2 = new Struct.AugmentedMap();
    map2.set("name", "Bob");
    map2.set("age", 36);
    map2.set("height", "6.0\"");

    const success = map.marshall(map2);
    expect(map.values()).to.deep.equal(map2.values());
  });

  it("can marshall a JSON object value pair", () => {
    const o = { p1: "p1", p2: "p2" };

    const success = map.marshall(o);
    expect(success);
    expect(map.toJSON()).to.equal(o);
  });

  it("does not marshall a string", () => {
    const success = map.marshall("junk");
    expect(success).to.be.false;
  });

  it("does not marshall a number", () => {
    const success = map.marshall(50);
    expect(success).to.be.false;
  });

  it("does not marshall an empty object", () => {
    const success = map.marshall({});
    expect(success).to.be.false;
  });

  it("does marshall an array as a numbered map", () => {
    const success = map.marshall(["x", "y", "z"]);
    expect(success).to.be.true;
  });

  it("can set an item with a number as a key", () => {
    map.set(16, "sixteen");
    expect(map.get(16)).to.deep.equal("sixteen");
  });

  it("can set an item with an object as a key", () => {
    map.set({ name: "Bob", age: 36 }, { data: "xxxxxxx" });
    expect(map.get({ name: "Bob", age: 36 }).data).to.equal("xxxxxxx");
  });

  it("can produce a string from the map", () => {
    const o = { p1: "p1", p2: "p2" };
    const success = map.marshall(o);
    expect(success).to.be.true;
    expect(map.toString()).to.equal("{\"p1\":\"p1\",\"p2\":\"p2\"}");
  });

  it("can marshall a stringified JSON", () => {
    const success = map.marshall("{\"p1\":\"p1\",\"p2\":\"p2\"}");
    expect(success).to.be.true;
    expect(map.toString()).to.equal("{\"p1\":\"p1\",\"p2\":\"p2\"}");
  });
});
