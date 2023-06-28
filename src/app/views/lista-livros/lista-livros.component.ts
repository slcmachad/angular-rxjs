import { FormControl } from '@angular/forms';
import { VolumeInfo, ImageLinks, Item } from './../../models/interfaces';
import { Component, OnDestroy } from '@angular/core';
import { Subscription, map, switchMap } from 'rxjs';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { Livro } from 'src/app/models/interfaces';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy{

  listaLivros: Livro[];
  campoBusca = new FormControl();
  subscription: Subscription;
  livro: Livro;

  constructor(private service : LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges
      .pipe(
        switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
        map((items) => this.listaLivros = this.livrosResultadoParaLivros(items))
      )

/*   buscarLivros(){
    this.subscription = this.service.buscar(this.campoBusca).subscribe({
      next: (items) => {
        console.log('requisiçoes')
        this.listaLivros = this.livrosResultadoParaLivros(items)},
      error: erro => console.error(erro)
    })
  } */

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[]{
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}



