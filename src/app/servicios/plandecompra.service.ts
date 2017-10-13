import { Injectable } from '@angular/core';

import { Proyecto } from '../classes/proyecto'
import { Http, Headers, Jsonp}  from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class PlandecompraService {

  proyectos:Proyecto[] = [];
  urlBase = "http://10.0.0.223:81/PlanDeCompras/v0/Publico/Proyecto/";
  

  constructor(private http:Http, private jsonp:Jsonp) { 
    //console.log("inicializado");
   }

   getProyectos(orgCode:string, agno:string){
    let query = `${orgCode}/${agno}?callback=JSONP_CALLBACK&ticket=F8537A18-6766-4DEF-9E59-426B4FEE2844`;
    let url = this.urlBase + query;
    return this.http.get(url)
      .map(res => res.json());
   }

   getItemsPorProyecto(idx:number){
    let query = `${idx}?callback=JSONP_CALLBACK&ticket=F8537A18-6766-4DEF-9E59-426B4FEE2844`;
    let url = this.urlBase + query;
    return this.http.get(url)
      .map(res => res.json());
   }

   //http://localhost:81/PlanDeCompras/v1/Publico/ObtenerCodigoPresupuestario2/?ticket=F8537A18-6766-4DEF-9E59-426B4FEE2844

   getCodigoSigfe(pdc:number){
     let query = "http://localhost:81/PlanDeCompras/v1/Publico/ObtenerCodigoPresupuestario2/?ticket=F8537A18-6766-4DEF-9E59-426B4FEE2844";
     return this.http.post(query, {})
      .map(res => res.json());
   }
}
