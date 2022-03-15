import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tareas } from '../../models/tareas';

@Component({
  selector: 'app-eliminar-tarea',
  templateUrl: './eliminar-tarea.component.html',
  styleUrls: ['./eliminar-tarea.component.css']
})
export class EliminarTareaComponent implements OnInit {

  tareas:tareas[];
  
  constructor( 
    private router:Router
  ) { }

  ngOnInit(): void {
  }

}
