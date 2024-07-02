describe('template spec', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('http://127.0.0.1:7001/')
  })

  it('Insere uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li .destroy')
      .invoke('show')
      .click();

    cy.get('.todo-list li')
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.contains('Active').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.contains('Completed').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.contains('All').click();
    cy.get('.todo-list li')
      .should('have.length', 2);
  });

  it('Cadastra três tarefas e marca todas como completas', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}')
      .type('Tarefa 3{enter}');
    
    cy.get('.toggle-all-label')
      .first()
      .click();
    
    cy.get('.todo-list li')
      .should('have.class', 'completed');
  });

  it('Cadastra três tarefas, marca duas como completas e limpa todas tarefas completas', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}')
      .type('Tarefa 3{enter}');
    
    cy.get('.todo-list li .toggle')
      .eq(1)
      .click();

    cy.get('.todo-list li .toggle')
      .eq(2)
      .click();

    cy.get('.clear-completed')
      .first()
      .click();

    cy.get('.todo-list li')
      .should('have.length', 1);
  });

  it('Cadastra uma tarefa, marca como concluida e volta ao estado anterior', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('Tarefa 1{enter}');
    
    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.get('.todo-list li')
      .should('not.have.class', 'completed');
  });
});