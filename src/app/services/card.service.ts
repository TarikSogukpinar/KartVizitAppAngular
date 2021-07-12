import { Card } from 'src/app/models/card';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  cards!: Card[];

  constructor(private httpClient: HttpClient, @Inject('apiUrl') private apiUrl: string) { }

  getCards(): void {
    this.httpClient.get<Card[]>(this.apiUrl + 'cards')
      .subscribe((response: Card[]) => {
        this.cards = response
      });

  }
  addCard(card: Card) {
    return this.httpClient.post(this.apiUrl + 'cards', card)
  }

  updateCard(card: Card, cardId: number): Observable<any> {
    return this.httpClient.put(this.apiUrl + 'cards/' + cardId, card)
  }

  deleteCard(cardId: number): Observable<any> {
    return this.httpClient.delete(this.apiUrl + 'cards/' + cardId)
  }
}
