const { query } = require('express')
const CustomersModel = require('../models/customers')
const {crypto} = require('../utils/password')

const defaulTitle= "Cadastro de clientes"

function index (req,res){
  res.render('register',{
    title: defaulTitle,
  })
}


async function add(req,res){
  const {
    name,
    age,
    email,
    password,
  } = req.body


  const passwordCrypto = await crypto(password)


  const register = new CustomersModel({
    name,
    age,
    email,
    password: passwordCrypto,
  })

register.save()

res.render('register',{
  title : defaulTitle,
  message: "Cadastrado com sucesso",
})
}



async function list(req,res){

 const users = await CustomersModel.find()


  res.render('list', {
    title: 'Lista de Usuarios',
    users,
  })
}


async function formEdit (req,res){

  const {id} = req.query

  const user = await CustomersModel.findById(id)

  res.render('edit',{
    title: 'Editar Usuarios',
    user,
  })
}


async function edit(req,res){
  const {
    name,
    age,
    email,
    
  } = req.body

const {id} = req.params


const user = await CustomersModel.findById(id)

user.name = name
user.age = age
user.email = email

user.save()


res.render('edit',{
  title: 'Editar Usuarios',
  user,
  message: 'Usuario alterado com sucesso'
})

}



async function remove(req,res){

  const {id} = req.params

 const remove = await CustomersModel.deleteOne({_id : id})

 if(remove.ok){
  res.redirect('list')
 }
}

module.exports = {
  index,
  add,
  list,
  formEdit,
  edit,
  remove,
}