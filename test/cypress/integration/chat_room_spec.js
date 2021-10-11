describe('Timesheets feature', function() {
  before(() => {
    cy.app('clean')
    cy.appScenario('basic')
    cy.login("user1@example.com", "123456")
  })
  beforeEach(() => {
    cy.preserveAllCookiesOnce()
  })

  it('should not have any chat rooms', function() {
    cy.get('[data-cy="chat_room_table"]').find('tbody').should(($tbody) => {
      expect($tbody).not.to.contain('<tr>')
    })
  })

  it('should error messages in chat room', function() {
    cy.get('[data-cy="new_chat_room_btn"]').contains("New chat room")
    cy.get('[data-cy="new_chat_room_btn"]').click()
    cy.get('[data-cy="create_chat_room_btn"]').click()
    cy.get('[data-cy="chat_room_errors"]').contains("Title can't be blank")
    cy.get('[data-cy="chat_room_errors"]').contains("Title is too short (minimum is 2 characters)")
    cy.get('[data-cy="chat_room_form_back_btn"]').click()
    cy.get('[data-cy="chat_room_table"]').find('tbody').should(($tbody) => {
      expect($tbody).not.to.contain('<tr>')
    })
  })

  it('create new chat room', function() {
    cy.get('[data-cy="new_chat_room_btn"]').contains("New chat room")
    cy.get('[data-cy="new_chat_room_btn"]').click()
    cy.get('[data-cy="chat_room_name_textbox"]').type("Chat Room 1")
    cy.get('[data-cy="create_chat_room_btn"]').click()
    cy.get('[data-cy="chat_room_table"] > tbody > tr').its('length').should('be.eq', 1)
  })


  it('should send message in chat room', function() {
    cy.get('[data-cy="chat_room_table"] > tbody > tr').its('length').should('be.eq', 1)
    cy.get('[data-cy="chat_room_table"] > tbody > tr').first().within(() => {
      cy.get('[data-cy="chat_room_enter_btn"]').click()
    })
    cy.get('[data-cy="message_txt_box"]').type("First User Message")
    cy.get('[data-cy="message_send_btn"]').click()
    
    cy.get('[data-cy="messages_box"]').contains("First User Message")
    cy.get('[data-cy="chat_room_back_btn"]').click()
    
  })

  it('should be able to see messages in chat room', function() {
    cy.get('[data-cy="chat_room_table"] > tbody > tr').its('length').should('be.eq', 1)
    cy.get('[data-cy="chat_room_table"] > tbody > tr').first().within(() => {
      cy.get('[data-cy="chat_room_enter_btn"]').click()
    })
    cy.contains("Chat Room 1")
    cy.wait(1000)
    cy.get('[data-cy="messages_box"]').contains("First User Message")
    cy.get('[data-cy="chat_room_back_btn"]').click()
  })

  it('should see error message when sending message', function() {
    cy.get('[data-cy="chat_room_table"] > tbody > tr').its('length').should('be.eq', 1)
    cy.get('[data-cy="chat_room_table"] > tbody > tr').first().within(() => {
      cy.get('[data-cy="chat_room_enter_btn"]').click()
    })
    cy.contains("Chat Room 1")
    cy.wait(1000)
    cy.get('[data-cy="message_send_btn"]').click()
    cy.get('[data-cy="messages_box"]').contains("Body can't be blank")
    cy.get('[data-cy="messages_box"]').contains("Body is too short (minimum is 2 characters)")
    cy.get('[data-cy="message_txt_box"]').type("A")
    cy.get('[data-cy="message_send_btn"]').click()
    cy.get('[data-cy="messages_box"]').contains("Body is too short (minimum is 2 characters)")

  })

  it('should send message to another user', function() {
    cy.logout()
    cy.login("user2@example.com", "123456")
    cy.get('[data-cy="chat_room_table"] > tbody > tr').its('length').should('be.eq', 1)
    cy.get('[data-cy="chat_room_table"] > tbody > tr').first().within(() => {
      cy.get('[data-cy="chat_room_enter_btn"]').click()
    })

    cy.contains("Chat Room 1")
    cy.wait(1000)
    cy.get('[data-cy="messages_box"]').contains("First User Message")

    cy.get('[data-cy="message_txt_box"]').type("Second User Message")
    cy.get('[data-cy="message_send_btn"]').click()
    
    cy.get('[data-cy="messages_box"]').contains("Second User Message")
    cy.get('[data-cy="chat_room_back_btn"]').click()

    cy.get('[data-cy="chat_room_table"] > tbody > tr').its('length').should('be.eq', 1)
    cy.get('[data-cy="chat_room_table"] > tbody > tr').first().within(() => {
      cy.get('[data-cy="chat_room_enter_btn"]').click()
    })
    cy.get('[data-cy="messages_box"]').contains("First User Message")
    cy.get('[data-cy="messages_box"]').contains("Second User Message")

  })
})
