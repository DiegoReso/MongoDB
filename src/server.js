const express = require('express')
const path = require ('path')


const db = require('./database')
const routes = require('./routes')

const app = express()



//conexao com banco de dados
db.connect()


//definindo o template engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


//defininco os arquivos publicos
app.use(express.static(path.join(__dirname, 'public')))

//habilita server para receber dados via post (formulario)
app.use(express.urlencoded({extended:true}))


//definindo as rotasrotas
app.use('/', routes)

app.use('/register', routes)


//404 error (not found)
app.use((req,res)=>{
  res.send('Pagina nao encontrada')
})

//escutando o servidor

const port = process.env.PORT || 8080
app.listen(port, ()=> console.log(`Server is listening on ${port}`))

