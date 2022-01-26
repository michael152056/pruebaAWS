const express = require('express');
const app = express();
const morgan = require('morgan');
const {mongoose} = require('./database');
const cors = require('cors');


/* Configuraciones */
app.set('nombreApp','Aplicación para manejo de gastos SRI');
app.set('puerto',process.env.PORT || 3000);

/* Middleware */
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));


/* Routes */
app.use('/api/gastos',require('./routes/server.routes'));


app.listen(app.get('puerto'),() => 
{
    console.log("Nombre de la App", app.get('nombreApp'));
    console.log("Puerto del servidor",app.get('puerto'));
})
