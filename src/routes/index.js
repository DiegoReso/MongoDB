const router = require('express').Router()

const CustomersController = require('../controllers/customers')

router.get('/', (req,res)=>{
  res.render('index',{
    title: 'Pagina Inicial'
  })
})

router.get('/register', (req,res)=>{
  res.render('register',{
    title: 'Cadastro de Cliente'
  })
})


router.post('/register/add', CustomersController.add)


module.exports = router