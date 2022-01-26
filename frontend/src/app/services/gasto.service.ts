import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gasto } from '../models/gasto';
import { Observable, ObservableLike } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GastoService {
  selectedGasto: Gasto;
  gastos: Gasto[] = [];
  constructor(private http: HttpClient) {
    this.selectedGasto = new Gasto();
  }

  getGastos() {
    return this.http.get('http://localhost:3000/api/gastos');
  }

  readonly URL_API = 'http://localhost:3000/api/gastos';
  postGasto(Gasto: Gasto) {
    return this.http.post(this.URL_API, Gasto);
  }
  putGasto(gasto: Gasto){
    return this.http.put(this.URL_API+'/$(gasto._id)',gasto);
   }

   deleteGasto(id:string): Observable<any>{
    return this.http.delete(this.URL_API+ '/'+ id);
   }

  obtenerGasto(id: string):Observable<any>{
    return this.http.get(this.URL_API + '/' +id);
  }


  editarHorario(id:string,gasto: Gasto):Observable<any>{
    return this.http.put(this.URL_API + '/'+ id,gasto);
}
   
   
}
