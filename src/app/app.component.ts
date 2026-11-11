import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameService } from './services/game.service';
import { Game } from './models/game';
import { JsonPipe } from '@angular/common';
import { CrudComponent } from './crud/crud.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe, CrudComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'proj-game';

  pag = 1;
  tamanoPagina = 5;
  totalCount = 0;
  totalPag = 0;
  editGame?: Game;

  games: Game[] = [];

  constructor(private gameService: GameService){}

  //HOOK - OnInit para hidratación del template ya cargado en esqueleto html
  ngOnInit(): void {
    this.loadGames();
  }

  onBuscarId(id: string) {

  }

  loadGames() {

    this.gameService.getGamesPyPage(this.pag, this.tamanoPagina).subscribe( res => {
      this.games = res.body!;
      this.totalCount = +res.headers.get('X-Total-Count')!;
      this.totalPag = Math.ceil(this.totalCount/this.tamanoPagina);
      console.log(this.games);
    });

  }

  onChangeTamPage(tamPage: string) {
     this.tamanoPagina = +tamPage;
     this.pag = 1;
     this.loadGames();
  }

  onSigPag() {
      this.pag++;
      this.loadGames();
  }

 onAntPag() {
      this.pag--;
      this.loadGames();
  }

  onActualizaGames(game: Game) {
    //ignoro el game y fuerzo recarga completa -> lo más seguro
    this.loadGames();
  }


}
