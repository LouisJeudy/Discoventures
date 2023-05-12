describe('Scenario', () => {
  
    it('Inscription with exited compte', () => {
 
      // Page à tester
      cy.visit('http://localhost:19006/')
      // Cliquer sur le lien d'inscription
      cy.get("#signUpLink").click()
      // Récupération des éléments et écriture du login/username/mot de passe
      cy.get('#emailInputSignUp').type('louisjeudy1@gmail.com')
      cy.get('#userInputSignUp').type('louisJ')
      cy.get('#passwordInputSignUp').type('louis')
      cy.intercept('POST', '/users',{
        statusCode: 400,
        body: { message: "Nom d'utilisateur déjà utilisé !" }
      }).as("req1")
      // Appui sur le bouton de inscription
      cy.get('#btSignUp').click()
      // Tester qu'il n'y a pas d'erreurs
      cy.wait('@req1').then(({response}) => {
        expect(response.statusCode).to.eq(400)
      })
      cy.get("#errorMsgSignUp").contains("Nom d'utilisateur déjà utilisé !")
    })
   
    it('Inscription with wrong type password', () => {
      cy.intercept('POST', '/users',{
        statusCode: 400,
        body: { message: "Mot de passe erroné !" }
      }).as("req2")
      // Page à tester
      cy.visit('http://localhost:19006/')
      // Cliquer sur le lien d'inscription
      cy.get("#signUpLink").click()
      // Récupération des éléments et écriture du login/mot de passe
      cy.get('#emailInputSignUp').type('louis2@gmail.com')
      cy.get('#userInputSignUp').type('louisJ2')
      cy.get('#passwordInputSignUp').type('louis')
  
      // Appui sur le bouton de inscription
      cy.get('#btSignUp').click()
      // Tester qu'il n'y a pas d'erreurs
      cy.wait('@req2').then(({response}) => {
        expect(response.statusCode).to.eq(400)
      }) 
      cy.get("#errorMsgSignUp").contains('Mot de passe erroné !')
    })
  
    it('Inscription with wrong type email', () => {
      cy.intercept('POST', '/users',{
        statusCode: 400,
        body: { message: "Validation error: Validation isEmail on email failed" }
      }).as("req3")
        cy.wait(400)
        // Page à tester
        cy.visit('http://localhost:19006/')
        // Cliquer sur le lien d'inscription
        cy.get("#signUpLink").click()
        // Récupération des éléments et écriture du login/mot de passe
        cy.get('#emailInputSignUp').type('louis3')
        cy.get('#userInputSignUp').type('louisJ3')
        cy.get('#passwordInputSignUp').type('louisL1!')
    
        // Appui sur le bouton de inscription
        cy.get('#btSignUp').click()
        // Tester qu'il n'y a pas d'erreurs
        cy.wait('@req3').then(({response}) => {
          expect(response.statusCode).to.eq(400)
        })  
        cy.get("#errorMsgSignUp").contains("Validation error: Validation isEmail on email failed")
      })
      
      it('Inscription avec success', () => {
        cy.intercept('POST', '/users',{
          statusCode: 201,
          body: { message: "Created User successfully"  }
        }).as("req4")
        // Page à tester
        cy.visit('http://localhost:19006/')
        // Cliquer sur le lien d'inscription
        cy.get("#signUpLink").click()
        // Récupération des éléments et écriture du login/mot de passe
        cy.get('#emailInputSignUp').type('test@gmail.com')
        cy.get('#userInputSignUp').type('test')
        cy.get('#passwordInputSignUp').type('test123T!')
    
        // Appui sur le bouton de inscription
        cy.get('#btSignUp').click()
        // Tester la redirection apres reussir a inscrire
        cy.wait('@req4').then(({response}) => {
          expect(response.statusCode).to.eq(201)
        }) 
        cy.get("#errorMsgSignUp").eq("")
      })
  })
