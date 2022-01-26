import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Gasto } from 'src/app/models/gasto';
import { GastoService } from 'src/app/services/gasto.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
/* import { ToastrService } from 'ngx-toastr';

 */
@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
})
export class GastosComponent implements OnInit {

  constructor(public gastoService: GastoService) {

  }

  ngOnInit(): void {
    this.getGastos();
  }
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.gastoService.selectedGasto = new Gasto();
    }
  }
  addGasto(form: NgForm) {
    const GASTOS: Gasto = {
      _id: (this.gastoService.selectedGasto._id).toString(),
      tipo: this.gastoService.selectedGasto.tipo,
      ruc: this.gastoService.selectedGasto.ruc,
      empresa: this.gastoService.selectedGasto.empresa ,
      monto: this.gastoService.selectedGasto.monto

    }
    console.log((this.gastoService.selectedGasto._id).toString());

    this.gastoService.postGasto(GASTOS).subscribe((res) => {
      console.log(res);
      this.resetForm(form);
/*       M.toast({ html: 'Gasto Guardado' }); */
    });
  }

  getGastos()
  {
    this.gastoService.getGastos()
    .subscribe(res=>{
    this.gastoService.gastos=res as Gasto[];
    console.log(res);
    })
    }

    editGasto(id:any){
       if(id !=null){
        this.gastoService.obtenerGasto(id).subscribe(data =>{
          this.gastoService.selectedGasto._id =  data._id,
          this.gastoService.selectedGasto.tipo = data.tipo,
          this.gastoService.selectedGasto.ruc = data.ruc,
          this.gastoService.selectedGasto.empresa = data.empresa,
          this.gastoService.selectedGasto.monto = data.monto
        }) 
      } 
    }

    actForm(){
      const GASTOS: Gasto = {
        _id: this.gastoService.selectedGasto._id,
        tipo: this.gastoService.selectedGasto.tipo,
        ruc: this.gastoService.selectedGasto.ruc,
        empresa: this.gastoService.selectedGasto.empresa ,
        monto: this.gastoService.selectedGasto.monto

      }
    
      if( this.gastoService.selectedGasto._id !==null){
        //editamos horario
        this.gastoService.editarHorario( this.gastoService.selectedGasto._id,GASTOS).subscribe(data => {
  /*         this.toastr.info('Horario actualizado con éxito!', 'Horario actualizado!'); */
          
        });
    
    }
  }

    
    deleteGasto(id: any){
      console.log(id);
      this.gastoService.deleteGasto(id).subscribe(data => {
      /*   this.toastr.error("El usuario fue eliminado con exito", "Usuario Eliminado") */      },error =>{
        console.log(error);
      })
    }
  
}
