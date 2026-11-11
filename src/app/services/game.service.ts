import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  //ENDPOINT
  private apiUrl = 'http://localhost:3000/games';

  private http = inject(HttpClient);

  constructor() { }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }

  getGameById(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/${id}`);
  }

  getGamesPyPage(pag: number, tamPage: number) {

    return this.http.get<Game[]>(this.apiUrl + `?_page=${pag}&_limit=${tamPage}`, {
      observe: 'response'
    });
  }

  create(game: Game) {

    return this.http.post<Game>(this.apiUrl, game);

  }

  update(game: Game) {

    if (game.id)  {
      return this.http.put<Game>(this.apiUrl+ `/${game.id}`, game);
    }

    throw new Error(`Game a actualizar sin id = ${game}`);

  }

}
