import { toggle, editar, borrar } from './../todo.actions';
import { AppState } from './../../app.reducer';
import { FormControl, Validators } from '@angular/forms';
import { Todo } from './../models/todo.model';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('inputFisico') txtInputFisico: ElementRef;

  chkCompletado: FormControl;
  txtInput: FormControl;
  editando = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.store.select('todos').subscribe();
    this.chkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);
    this.chkCompletado.valueChanges.subscribe( valor => {
      this.store.dispatch( toggle( {id: this.todo.id} ))
      console.log('click');
    });
  }

  editar(){
    this.editando = true;
    this.txtInput.setValue(this.todo.texto);
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 0);
  }

  terminarEdicion(){
    this.editando = false;

    if(this.txtInput.invalid ||
      this.txtInput.value === this.todo.texto){
      return;
    }
    this.store.dispatch(editar({
      id: this.todo.id,
      texto: this.txtInput.value
    }));
  }

  borrar(){
    this.store.dispatch(borrar({id:this.todo.id}));
  }

}
