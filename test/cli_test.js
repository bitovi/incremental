const assert = require("assert");
const cli = require("../lib/cli");
const fetch = require("node-fetch");

describe("CLI", function() {
	this.timeout(10000);

	describe('Plain JS app', function() {
		let server;

		before(() => {
			let options = {
				port: 8055
			};
			server = cli(__dirname + '/tests/basics/index.html', options);
		});

		after(done => {
			server.close(done);
		})

		it('Renders a page', async function() {
			let res = await fetch('http://localhost:8055', {
				headers: {
					"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
				}
			});
			let html = await res.text();

			assert.ok(/<main>/.test(html), "Rendered with the initial HTML");
		});
	})
});
