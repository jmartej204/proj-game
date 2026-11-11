import { Component, inject, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { GameService } from '../services/game.service';
import { Game } from '../models/game';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-crud',
  imports: [ FormsModule, JsonPipe ],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent implements OnChanges{

  private gameService = inject(GameService);

  edit = false;
  editGame = input.required<Game | undefined>();
  ngOnChanges(changes: SimpleChanges): void {

    if (changes['editGame']?.currentValue ) {
      this.game = {...changes['editGame'].currentValue};
      this.edit = true;
    }

  }

  actualizaGames = output<Game>();

  game: Game = {
      title: '',
      genre: '',
      platform: '',
      price: 0,
      stock: 0
  };

  onSaveGame(form: NgForm) {

    if (form.invalid) {
      return;
    }

    //Traza...
    console.log(this.game);
    console.log(form.value);

    if (this.edit) {

      this.gameService.update(this.game).subscribe( gameUpdated => {
          console.log(`Game updated: ${gameUpdated}`);
          form.resetForm();
          this.actualizaGames.emit(gameUpdated);
      } );

    } else {

      this.gameService.create(this.game).subscribe( gameSaved => {
      console.log(`Game saved: ${gameSaved}`);
      form.resetForm();
      this.actualizaGames.emit(gameSaved);

    });

    }

  }

}
