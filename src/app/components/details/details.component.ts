import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy{
  gameRating!: number;
  gameId: string = "";
  game!: Game;
  routeSub: Subscription = new Subscription;
  gameSub: Subscription = new Subscription;

  constructor(private ActivatedRoute: ActivatedRoute,
    private httpService: HttpService)
    {}

  ngOnInit(): void
  {
    this.routeSub = this.ActivatedRoute.params.subscribe((params: Params) =>
    {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    });
  }

  getGameDetails(id: string): void{
    this.gameSub = this.httpService.getGameDetails(id).subscribe((gameResp: Game) =>
    {
      this.game = gameResp;
      setTimeout(() => {this.gameRating = this.game.metacritic;}, 1000);
    });
  }

  getColor(value: number): string
  {
    if(value > 75)
      return '#5ee432';
    if(value > 50)
      return 'fffa50'
    if(value > 30)
      return 'f7aa38'
    return 'ef4655'
  }

  ngOnDestroy(): void
  {
    if(this.gameSub)  
      this.gameSub.unsubscribe();

    if(this.routeSub)
      this.routeSub.unsubscribe();
  }

}
