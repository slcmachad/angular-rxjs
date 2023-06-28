import { FormControl } from '@angular/forms';
import { Item } from './../../models/interfaces';
import { Component } from '@angular/core';
import { map, switchMap, tap } from 'rxjs';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {
  campoBusca = new FormControl();

  constructor(private service : LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges
      .pipe(
        tap(() => console.log('inicio')),
        switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
        tap(() => console.log('requisição')),
        map((items) => this.livrosResultadoParaLivros(items))
      )

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[]{
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }
}



