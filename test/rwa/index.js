import { Selector } from "testcafe";

fixture`RWA`.page`http://localhost:3000/`;

test("Wykonanie transakcji na nowym koncie użytkownika", async (t) => {
  // Gdy Jestem na stronie startowej aplikacji
  await t.expect(Selector("h1").innerText).eql("Sign in");

  // Kiedy Wybiorę opcję założenia nowego konta
  await t.click(
    Selector("a")
      .withAttribute("data-test", "signup")
      .withText("Don't have an account? Sign Up")
  );
  // Wtedy Powinienem zobaczyć formularz rejestracji nowego użytkownika  await t
  await t
    .expect(Selector("h1").withAttribute("data-test", "signup-title").innerText)
    .eql("Sign Up");

  await t
    // Kiedy Wprowadzę moje imię
    .typeText("#firstName", "Mateusz")
    // Oraz Wprowadze moje nazwisko
    .typeText("#lastName", "Gut")
    // Oraz Wprowadze moją nazwę użytkownika
    .typeText("#username", "GutMat")
    // Oraz Wprowadze moje hasło użytkownika
    .typeText("#password", "Test123$%")
    // Oraz Wprowadze powtórnie moje hasło
    .typeText("#confirmPassword", "Test123$%");

  // Wtedy Powinienem móc założyć nowe konto
  await t
    .expect(Selector("button").hasAttribute("disabled"))
    .notOk()
    // Kiedy Założę nowe konto
    .click(Selector("button"));

  // Wtedy Powinienem zobaczyć ekran startowy
  await t.expect(Selector("h1").innerText).eql("Sign in");

  await t
    // Kiedy Wprowadzę moją nazwę użytkownika
    .typeText("input#username", "GutMat")
    // Oraz Wprowadze moje hasło
    .typeText("input#password", "Test123$%");

  // Wtedy Powinienem móc zalogować się do aplikacji
  await t
    .expect(Selector("button").hasAttribute("disabled"))
    .notOk()
    // Kiedy Zaloguje się do aplikacji
    .click(Selector("button"));

  //   cy.intercept("GET", "/transactions/public").as("transaction");
  //   cy.get("@signinButton").click();
  //   // Wtedy Powinienem zobaczyć ekran powitalny
  //   cy.wait("@transaction");
});
