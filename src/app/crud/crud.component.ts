import { Component, inject, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { GameService } from '../services/game.service';
import { Game } from '../models/game';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-crud',
  imports: [ ReactiveFormsModule, JsonPipe ],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent implements OnChanges{

  private gameService = inject(GameService);

  title = new FormControl('',
    { nonNullable: true,
      validators: [ Validators.required, Validators.minLength(3) ]
    });

    genre = new FormControl('',{
      nonNullable: true,
      validators: [Validators.required]
    });

    platform = new FormControl('',{
      nonNullable: true,
      validators: [Validators.required]
    });

    price = new FormControl('',{
      nonNullable: true,
      validators: [Validators.required,
        Validators.min(0.01),
        Validators.max(100)
      ]
    });

  stock = new FormControl('',{
    nonNullable: true,
    validators: [Validators.required,
      Validators.min(0),
      Validators.max(999)
    ]
  });

  formGroup = new FormGroup({
    title: this.title,
    genre: this.genre,
    platform: this.platform,
    price: this.price,
    stock: this.stock
  });



  edit = false;
  editGame = input.required<Game | undefined>();
  ngOnChanges(changes: SimpleChanges): void {

    if (changes['editGame']?.currentValue ) {
      //this.game = {...changes['editGame'].currentValue};
      this.formGroup.setValue(changes['editGame'].currentValue);
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

  onSaveGame(form: FormGroupDirective) {

    if (form.invalid) {
      return;
    }

    //Traza...
    console.log(this.game);
    console.log(form.value);

    if (this.edit) {
    //if (this.game.id) {}

      this.gameService.update(this.game).subscribe( gameUpdated => {
          console.log(`Game updated: ${gameUpdated}`);
          form.resetForm();
          //delete this.game.id;
          this.edit = false;
          this.actualizaGames.emit(gameUpdated);
      } );

    } else {
      //CREAR - POST
      this.gameService.create(this.game).subscribe( gameSaved => {
      console.log(`Game saved: ${gameSaved}`);
      form.resetForm();
      this.actualizaGames.emit(gameSaved);

    });

    }

  }

}
