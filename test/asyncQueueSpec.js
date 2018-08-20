

const TIMEOUT = 500;

describe("Given Augmented AsynchronousQueue", () => {
	it("is defined", () => {
		expect(Struct.AsynchronousQueue).to.not.be.undefined;
	});

	describe("Given a queue", () => {
		let q, count;

	  beforeEach(() => {
	    q = new Struct.AsynchronousQueue(TIMEOUT);
			count = 0;
	  });

	  afterEach(() => {
	    q = null;
			count = 0;
	  });

		it("can define a queue with a timeout", () => {
			expect(q.timeout).to.equal(TIMEOUT);
		});

		it("can queue a few functions", () => {
			const s = q.process(
				(count) => { count++; },
				(count) => { count++; },
				(count) => { count++; },
				(count) => { count++; },
				(count) => { count++; }
			);
			expect(s).to.be.true;
		});

		it("can add a few functions to the queue", () => {
			q.add(
				(count) => { count++; },
				(count) => { count++; },
				(count) => { count++; },
				(count) => { count++; },
				(count) => { count++; }
			);

			expect(Object.keys(q.queue).length).to.equal(5);
		});

		it("can add a few functions to the queue then run them", () => {
			q.add(
				(count) => { count++; },
				(count) => { count++; },
				(count) => { count++; },
				(count) => { count++; },
				(count) => { count++; }
			);
			const s = q.process();
			expect(s).to.be.true;
		});

		it("can add a few functions to the queue then run them in sync", () => {
			q.add(
				() => { let count = () => { let x = 0; for(let i=0;i<10000;i++){ x++; } return x;}; console.info("1: " + count()); },
				() => { let count = () => { let x = 0; for(let i=0;i<10000;i++){ x++; } return x;}; console.info("2: " + count()); },
				() => { let count = () => { let x = 0; for(let i=0;i<10000;i++){ x++; } return x;}; console.info("3: " + count()); },
				() => { let count = () => { let x = 0; for(let i=0;i<10000;i++){ x++; } return x;}; console.info("4: " + count()); },
				() => { let count = () => { let x = 0; for(let i=0;i<10000;i++){ x++; } return x;}; console.info("5: " + count()); },
				() => { let count = () => { let x = 0; for(let i=0;i<10000;i++){ x++; } return x;}; console.info("6: " + count()); },
				() => { let count = () => { let x = 0; for(let i=0;i<10000;i++){ x++; } return x;}; console.info("7: " + count()); },
				() => { let count = () => { let x = 0; for(let i=0;i<10000;i++){ x++; } return x;}; console.info("8: " + count()); },
				() => { let count = () => { let x = 0; for(let i=0;i<10000;i++){ x++; } return x;}; console.info("9: " + count()); },
				() => { let count = () => { let x = 0; for(let i=0;i<10000;i++){ x++; } return x;}; console.info("10: " + count()); }
			);
			const s = q.process();
			expect(s).to.be.true;
		});
	});
});
