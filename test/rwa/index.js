import { Selector, ClientFunction } from "testcafe";

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

  // Wtedy Powinienem zobaczyć formularz startowy
  await t
    .expect(
      Selector("div").withAttribute("data-test", "user-onboarding-dialog")
        .visible
    )
    .ok();
  await t
    .expect(
      Selector("div").withAttribute("data-test", "user-onboarding-dialog-title")
        .innerText
    )
    .eql("Get Started with Real World App");

  // Kiedy Rozpocznę wypełnianie formularza
  await t.click(
    Selector("button").withAttribute("data-test", "user-onboarding-next")
  );
  await t.expect(Selector("h2").innerText).eql("Create Bank Account");

  await t
    // Oraz Wprowadze nazwę mojego banku
    .typeText("#bankaccount-bankName-input", "Narodowy Bank Polski")
    // Oraz Wprowadze numer identyfikacyjny banku
    .typeText("#bankaccount-routingNumber-input", "123456789")
    // Oraz Wprowadze numer konta bankowego
    .typeText("#bankaccount-accountNumber-input", "987654321");
  // Oraz Potwierdzę wprowadzone dane
  await t.click(
    Selector("button").withAttribute("data-test", "bankaccount-submit")
  );
  // Wtedy Powinienem móc zakończyć wypełnianie formularza
  await t
    .expect(
      Selector("div").withAttribute("data-test", "user-onboarding-dialog-title")
        .innerText
    )
    .eql("Finished");
  await t.click(
    Selector("button").withAttribute("data-test", "user-onboarding-next")
  );
  await t
    .expect(
      Selector("div").withAttribute("data-test", "user-onboarding-dialog").exist
    )
    .notOk();

  // Gdy Jestem zalogowany i wypełniłem formularz startowy
  await t
    .expect(
      Selector("h6").withAttribute("data-test", "sidenav-username").innerText
    )
    .contains("GutMat");
  await t.expect(Selector('div[data-test="transaction-list"] li').count).gte(1);

  // Wtedy Powinienem móc dodać nową transakcję
  await t.click(
    Selector("a").withAttribute("data-test", "nav-top-new-transaction")
  );
  const getLocation = ClientFunction(() => document.location.href);
  await t.expect(getLocation()).contains("/transaction/new");
  // Kiedy Wybiorę drugą osobę do wykonania transakcji
  await t.click(
    Selector("ul").withAttribute("data-test", "users-list").child(0)
  );
  await t
    .typeText("input#amount", "100")
    .typeText("input#transaction-create-description-input", "Pożyczka");
  await t.click(
    Selector("button").withAttribute(
      "data-test",
      "transaction-create-submit-request"
    )
  );
  await t
    .expect(
      Selector("div").withAttribute("data-test", "alert-bar-success").visible
    )
    .ok()
    .expect(
      Selector("div").withAttribute("data-test", "alert-bar-success").innerText
    )
    .contains("Transaction Submitted!");
});
