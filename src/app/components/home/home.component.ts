import { Component, OnInit } from '@angular/core';
import { PlandecompraService } from '../../servicios/plandecompra.service';
import { Proyecto } from '../../classes/proyecto';
import { Item } from '../../classes/item';
import 'rxjs/Rx';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  years:number[]= [ ];
  orgCode:string = "115468";
  selectedYear:string = new Date().getFullYear() + "";
  loading:boolean =  false;

  proyecto:any =null;

  proyectos:Proyecto[] = [];

  items:Item[] = [];

  page:number=1;
  timeout:boolean =  true;

  constructor(public _pdc:PlandecompraService) {
    for(let i = new Date().getFullYear() ; i > 2005 ; i-- ){
      this.years.push(i);
    }
   }

  ngOnInit() {
  }

  Buscar(){
    if(this.orgCode == "" || this.selectedYear == ""){
      this.proyectos = [];
      return;
    }

    this.timeout = false;
   this.loading = true;
    //this.proyectos = this._pdc.getProyectos(this.orgCode, this.selectedYear);
    this._pdc.getProyectos(this.orgCode, this.selectedYear)
      .subscribe( res => {
          //console.log(res);
          res.map(x => {
            this.proyectos.push({
              id : x.Id
              , nombre: x.Nombre
              , nombre_organizacion : x.Descripcion
              , monto : x.Total
              , codigo : x.Identificador
            });
          });

          //this.proyectos = this.proyectos.slice(( this.page-1)*10, 10);
          this.loading = false;
          
          window.setTimeout(() => {
            this.timeout = true;
          }, 5000);

        //console.log(res);
      }, err => {
        //console.error(err._body);
      });
  }

  mostrarItems(idx:number){
   this.items = [];
   this.proyecto =null;
   this.loading = true;
   this._pdc.getItemsPorProyecto(idx)
   .subscribe( res => {
        this.items = res.Items;

        this.proyecto= {
          id: res.Id
          , identificador : res.Identificador
          , nombre : res.Nombre
          , descripcion : res.Descripcion
          , total : res.Total
        }
        this.loading = false;
    });
    $('.modal').modal();
  }

  getOrganismo(idx:number){
    this.proyecto = null;
  }

  getSigfeCode(idx:number){
    this.loading= true;

    let item:Item[] = this.items.filter( x=> x.Id  == idx);

    this._pdc.getCodigoSigfe(idx).subscribe(
      res => {
        this.loading = false;
        item[0].CodigoPresupuestario= res;
      }
    )

    // window.setTimeout(() => {
    //   this.loading = false;
    //   if(item.length > 0)
    //     item[0].CodigoPresupuestario= Math.random().toString(36).substring(2);
    // }, 5000);
  }

}
