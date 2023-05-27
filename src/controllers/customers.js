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





async function listUsers(req,res){

 const users = await CustomersModel.find()


  res.render('listUsers', {
    title: 'Lista de Usuarios',
    users,
  })
}


module.exports = {
 index,
 add,
 listUsers,
}