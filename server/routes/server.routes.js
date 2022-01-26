const express = require('express');
const router=express.Router()
const gasto=require('../controllers/gastos.controller');

router.get('/',gasto.getGastos);
router.post('/', gasto.createGastos);
router.get('/tipo/:tipo',gasto.getGastoTipo);
router.get('/:id',gasto.getGasto); 
router.put('/:id',gasto.editGasto);
router.delete('/:id', gasto.eliminarGasto);
module.exports=router;