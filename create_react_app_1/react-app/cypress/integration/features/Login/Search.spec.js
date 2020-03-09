describe("Search feature", () => {
  after(() => {
    // Build it if you want
    // cy.exec("npm run build");
  });
  beforeEach(() => {
    cy.server();
    cy.visit("/", {
      onBeforeLoad(window) {
        window.fetch = null;
      }
    });
  });
  it("As a user I can see an error with a wrong companyname or date", () => {
    cy.route({
      method: "POST",
      url: "**/api/user/token/",
      status: 401,
      response: {
        access: undefined,
        refresh: undefined
      }
    });
    const emailInput = 'input[name="companyname"]';
    const dateInput = 'input[name="date"]';
    cy.get(emailInput).type("xsasasa");
    cy.get(dateInput).type("changeme");
    cy.get("[data-testid=submit]").click();
    cy.get("[data-testid=error-message]").contains("Unauthorized");
  });
  it("As a user I can login and see a list of links", () => {
    cy.route({
      method: "POST",
      url: "**/api/user/token/",
      response: {
        access:
          "fake.token.J0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cC",
        refresh:
          "fake.token.eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwi"
      }
    });
    cy.route({
      method: "GET",
      url: "**/api/link2/",
      response: [
        {
          title: "Getting started with Django REST",
          url: "http://someurl.example",
          id: 1
        },
        {
          title: "Getting started with Django testing",
          url: "http://someurl.example",
          id: 2
        }
      ]
    });
    const emailInput = 'input[name="companyname"]';
    const dateInput = 'input[name="date"]';
    cy.get(emailInput).type("valentino");
    cy.get(dateInput).type("changeme77");
    cy.get("[data-testid=submit]").click();
    cy.get("[data-testid=welcome]")
      .last()
      .contains("Welcome back valentino!");
    cy.get("[data-testid=links-list]").contains(
      /Getting started with Django REST|Getting started with Django testing/
    );
  });
});
