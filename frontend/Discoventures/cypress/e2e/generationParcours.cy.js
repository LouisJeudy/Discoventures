describe('Scenario', () => {
   
    it('Generation sans activite', () => {
        // Page à tester
        cy.visit('http://localhost:19006/')
        // Récupération des éléments et écriture du login/mot de passe
        cy.get('#emailInputSignIn').type('louisjeudy1@gmail.com')
        cy.get('#passwordInputSignIn').type('louis')
        // Appui sur le bouton de connexion
        cy.get('#btnConnectSignIn').click()
        cy.wait(2000)
        // entrer un titre et une distance
        cy.get('#titreParcoursInput').type('titre test')
        cy.get('#distanceInput').type('2')
        // Appui sur le bouton de generer le parcours
        cy.get('#btnGenerateParcours').click()
        // Tester qu'il y a d'erreurs
        cy.get("#errorMsgGeneration").contains("Veuillez choisir un type d'activite")
    })

    it('Generation sans titre', () => {
      // Page à tester
      cy.visit('http://localhost:19006/')
      // Récupération des éléments et écriture du login/mot de passe
      cy.get('#emailInputSignIn').type('louisjeudy1@gmail.com')
      cy.get('#passwordInputSignIn').type('louis')
      // Appui sur le bouton de connexion
      cy.get('#btnConnectSignIn').click()
      // entrer une distance et choisir un type d'activite
      cy.get('#distanceInput').type('2')
      cy.get('#walk').click()
      // Appui sur le bouton de generer le parcours
      cy.get('#btnGenerateParcours').click()
      // Tester qu'il y a d'erreurs
      cy.get("#errorMsgGeneration").contains("Veuillez remplir le titre de parcours")
    })
  
    it('Generation sans distance', () => {
       // Page à tester
       cy.visit('http://localhost:19006/')
       // Récupération des éléments et écriture du login/mot de passe
       cy.get('#emailInputSignIn').type('louisjeudy1@gmail.com')
       cy.get('#passwordInputSignIn').type('louis')
       // Appui sur le bouton de connexion
       cy.get('#btnConnectSignIn').click()
       // entrer une titre et choisir un type d'activite
       cy.get('#titreParcoursInput').type('titre test')
       cy.get('#walk').click()
       // Appui sur le bouton de generer le parcours
       cy.get('#btnGenerateParcours').click()
       // Tester qu'il y a d'erreurs
       cy.get("#errorMsgGeneration").contains("Veuillez inserer une distance")    
    })
    it('Generation reussie', () => {
        // Page à tester
        cy.visit('http://localhost:19006/')
        // Récupération des éléments et écriture du login/mot de passe
        cy.get('#emailInputSignIn').type('louisjeudy1@gmail.com')
        cy.get('#passwordInputSignIn').type('louis')
        // Appui sur le bouton de connexion
        cy.get('#btnConnectSignIn').click()
        // entrer une distance et choisir un type d'activite
        cy.get('#titreParcoursInput').type('titre test')
        cy.get('#walk').click()
        cy.get('#distanceInput').type('2')
        // Appui sur le bouton de generer le parcours
        cy.get('#btnGenerateParcours').click()
        // Tester qu'il y a d'erreurs
        cy.get("#errorMsgGeneration").eq("")    
     })
  })
