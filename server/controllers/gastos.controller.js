const express = require('express');
const router = express.Router();
const Gasto = require("../models/gastos");
router.get('/', (req, res) => {

    res.json({ status: 'API works' });
})

const gastosController = {};
/* Consultar todos los gastos */
gastosController.getGastos = async (req, res) => {
    try {
        const gastos = await Gasto.find();
        res.json(gastos)
    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }

}

/* Consultar por id */
gastosController.getGasto = async (req, res) => {
    console.log(req.params.id);
    const gasto = await Gasto.findById(req.params.id);
    res.json(gasto);
}

/* Consultar por tipo */
gastosController.getGastoTipo = async (req, res) => {
    console.log(req.params.tipo);
    const gasto = await Gasto.find({tipo: req.params.tipo});
    res.json(gasto);
}

/* Registrar gasto */
gastosController.createGastos = async (req, res) => {
    const gasto = new Gasto(req.body);
    console.log(gasto);
    await gasto.save();
    res.json('status: Gasto guardado');
}

/* Actualizar por id */
gastosController.editGasto = async (req, res) => {
    const { id } = req.params;
    const gasto = {
        tipo: req.body.tipo,
        ruc: req.body.ruc,
        empresa: req.body.empresa,
        monto: req.body.monto
    };
    await Gasto.findByIdAndUpdate(id, { $set: gasto }, { new: true });
    res.json('status: Gasto actualizado');
}

/* Eliminar por id */
gastosController.eliminarGasto = async (req,res) => {
    try {
      
        let gasto = await Gasto.findById(req.params.id);
        if (!gasto){
            res.status(404).json({msg: "No existe un gasto"})
        }
        await Gasto.findByIdAndRemove({_id: req.params.id})
        res.json({msg: "Gasto eliminado con éxito"})

    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }
}


module.exports = gastosController;