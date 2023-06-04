describe('Scenario', () => {

    beforeEach(() => {
  
      cy.intercept('POST', '/login', (req) => {
        if(req.body.email == "superadmin@email.com" && req.body.password == "%P4ssW0rd"){
          req.reply({
            statusCode: 200,
            body: {
              message: 'Email/Mot de passe ok' 
            }
          })
        } else {
          req.reply({
            statusCode: 403,
            body: {
              message: 'Les identifiants ne sont pas corrects' 
            }
          })
        }
        
      })
  
    })
  
  it('Login', () => {
    // Page à tester
    cy.visit('http://localhost:19006/')

    // Récupération des éléments et écriture du login/mot de passe
    cy.get('#emailInputSignIn').type('superadmin@email.com')
    cy.get('#passwordInputSignIn').type('%P4ssW0rd')

    // Appui sur le bouton de connexion
    cy.get('#btnConnectSignIn').click()

    // Tester qu'il n'y a pas d'erreurs
    cy.get("#errorMsgSignIn").should('have.value', '')
  })

  it('Login with wrong credentials', () => {
    // Page à tester
    cy.visit('http://localhost:19006/')

    // Récupération des éléments et écriture du login/mot de passe
    cy.get('#emailInputSignIn').type('louis@gmail.com')
    cy.get('#passwordInputSignIn').type('louis')

    // Appui sur le bouton de connexion
    cy.get('#btnConnectSignIn').click()

    // Tester qu'il n'y a pas d'erreurs
    cy.get("#errorMsgSignIn").contains('Les identifiants ne sont pas corrects')
  })
})
