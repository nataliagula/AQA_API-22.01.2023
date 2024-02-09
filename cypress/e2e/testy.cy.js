<reference types="cypress" />;

describe("HTTPBin API Tests", () => {
  it("should send a GET request and check the response content", () => {
    cy.request("GET", "https://httpbin.org/get")
      .its("status")
      .should("eq", 200);
  });

  it("should send a POST request with custom headers and check the response", () => {
    cy.request({
      method: "POST",
      url: "https://httpbin.org/post",
      headers: {
        "Content-Type": "application/json",
        "X-Custom-Header": "custom-value",
      },
      body: {
        key: "value",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.json).to.deep.equal({ key: "value" });
    });
  });

  it("should send a request with query parameters and verify them in the response", () => {
    const queryParam = "test123";
    cy.request("GET", `https://httpbin.org/get?param=${queryParam}`)
      .its("body.args")
      .should("deep.equal", { param: queryParam });
  });

  it("should send a request with random query parameters and check response", () => {
    const randomQueryParam = Math.random().toString(36).substring(7);
    cy.request("GET", `https://httpbin.org/get?param=${randomQueryParam}`)
      .its("body.args")
      .should("have.property", "param");
  });

  it("should send a PATCH request and verify the response", () => {
    cy.request("PATCH", "https://httpbin.org/patch")
      .its("status")
      .should("eq", 200);
  });

  it("should send a DELETE request and verify the response", () => {
    cy.request("DELETE", "https://httpbin.org/delete")
      .its("status")
      .should("eq", 200);
  });

  it("should check the User-Agent header in the response", () => {
    cy.request("GET", "https://httpbin.org/user-agent")
      .its("body")
      .should("include", "Cypress");
  });

  it("should check the response time is within acceptable limits", () => {
    cy.request("GET", "https://httpbin.org/delay/2")
      .its("duration")
      .should("be.lt", 3000);
  });

  it("should send a PUT request and verify the response", () => {
    cy.request("PUT", "https://httpbin.org/put")
      .its("status")
      .should("eq", 200);
  });

  it("should send a HEAD request and verify the response", () => {
    cy.request("HEAD", "https://httpbin.org/status/200")
      .its("status")
      .should("eq", 200);
  });
});
