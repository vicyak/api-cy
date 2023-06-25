/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contracts'

describe('Testes da Funcionalidade Usuários', () => {

    it.only('Deve validar contrato de usuários', () => {
         cy.request('usuarios').then(response =>{
          return contrato.validateAsync(response.body)
         })
    });

    it('Deve listar usuários cadastrados', () => {
     cy.request({
     method: 'get',
     url: 'usuarios',
     body: {
          "nome": "Victor da Silva",
          "email": "email@qa.com.br",
          "password": "teste",
          "administrador": "true",
         "_id": "LeAI1KWgi8pGvNdJ"
            }
     }).then((response) => {
          expect(response.status).to.equal(200)
     })
    });

    it('Deve cadastrar um usuário com sucesso', () => {
     let email = 'victor'+Math.floor(Math.random()*71)
     cy.request({
          method: 'post',
          url: 'usuarios',
          body: {
               "nome": "Victor da Silva4",
               "email": email+"@qa.com.br",
               "password": "teste",
               "administrador": "true",
          
                 }
          }).then((response) => {
               expect(response.status).to.equal(201)
          })
    });

    it('Deve validar um usuário com email inválido', () => {
     cy.request({
          failOnStatusCode: false,
          method: 'post',
          url: 'usuarios',
          body: {
               "nome": "Victor da Silva",
               "email": "victor@qa.com.br",
               "password": "teste",
               "administrador": "true",
          }
          }).then((response) => {
               expect(response.status).to.equal(400)
               expect(response.body.message).to.equal('Este email já está sendo usado')
          })
    });

    it('Deve editar um usuário previamente cadastrado', () => {
     cy.request('usuarios').then(response => {     
     let id = response.body.usuarios[0]._id
          cy.request({
               method: 'post',
               url: 'usuarios',
               body: {
                    "nome": "Victor da Silva2",
                    "email": "victorwqwx@qa.com.br",
                    "password": "teste2",
                    "administrador": "true"
                              }               
          }).then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Registro alterado com sucesso')
          })
         }) 
    });

    it('Deve deletar um usuário previamente cadastrado', () => {
 let email = 'victor'+Math.floor(Math.random()*71)+'@ebac.com'
     cy.cadastrarusuario("teste",email,"testesd","true").then(response => {
          let id = response.body._id
          cy.request({
               method: 'DELETE',
               url: `usuarios/${id}`
          }).then((response)=>{
               expect(response.status).to.equal(200)
               expect(response.body.message).to.equal("Registro excluído com sucesso")
          })
     })
    })
});