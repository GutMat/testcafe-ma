import { Selector } from "testcafe";

// Gdy Jestem na stronie startowej aplikacji
fixture`RWA`.page`http://localhost:3000/`;

test("Wykonanie transakcji na nowym koncie użytkownika", async (t) => {
  // Kiedy Wybiorę opcję założenia nowego konta
  await t.click(
    Selector("a")
      .withAttribute("data-test", "signup")
      .withText("Don't have an account? Sign Up")
  );

  // Wtedy Powinienem zobaczyć formularz rejestracji nowego użytkownika
  Selector("h1").withAttribute("data-test", "signup-title").withText("Sign Up");
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
  Selector("h1").withAttribute("data-test", "signup-title").withText("Sign in");
});
