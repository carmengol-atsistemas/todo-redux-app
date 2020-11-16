import { Todo } from './models/todo.model';
import { createReducer, on } from '@ngrx/store';
import { crear, toggle, editar, borrar, toggleAll, limpiarCompletados } from './todo.actions';

export const initialState: Todo[] = [
    new Todo('Salvar al soldado Ryan'),
    new Todo('La naranja mecanica'),
    new Todo('Karate a muerte en Torremolinos'),
    new Todo('Alguien volo sobre el nido del cuco'),
];

const _todoReducer = createReducer(
  initialState,
  on(crear, (state, {texto}) => [...state, new Todo(texto)] ),
  on(toggle, (state, {id}) =>
    state.map(todo => {
      if (todo.id === id) {
        return {...todo, completado: !todo.completado}
      }else{
        return todo;
      }
    })
  ),
  on(toggleAll, (state, {toggle}) =>
    state.map(todo => {
        return {...todo, completado: toggle};
    })
  ),
  on(editar, (state, {id, texto}) =>
    state.map(todo => {
      if (todo.id === id){ 
        return {...todo, texto};
      } else { 
        return todo;
      }
    })
  ),
  on(borrar, (state, {id}) =>
    state.filter(todo => todo.id !== id)
  ),
  on(limpiarCompletados, (state) =>
    state.filter(todo => !todo.completado)
  ),

);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
