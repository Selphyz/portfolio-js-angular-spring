import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente'
import { ClienteService } from './cliente.service'
import { Router, ActivatedRoute } from '@angular/router'
import swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear Cliente";
  errores: string[];

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente()
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    })
  }

  create(): void {
    this.clienteService.create(this.cliente)
      .subscribe(cliente => {
        this.router.navigate(['/clientes']);
        swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} creado con éxito!`, 'success');
      },
      err =>{
        this.errores = err.error.errors as string[];
        console.log(err.status);
        console.log(err.error.errors);  
      }
    );
  }

  update(): void {
    this.clienteService.update(this.cliente)
      .subscribe(cliente => {
        swal.fire('Cliente Actualizado', `Cliente ${cliente.apellido} actualizado con éxito!`, 'success');
        console.log(cliente);
        this.router.navigate(['/clientes']);
      },
      err =>{
        this.errores = err.error.errors as string[];
        console.log(err.status);
        console.log(err.error.errors);  
      }
    )
  }
}
