import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private selectCurrency$ : BehaviorSubject<string> = new BehaviorSubject<string>("INR");
  constructor() { }

  getCurrency(){
    return this.selectCurrency$.asObservable();
  }
  setCurrency( currency :string) {
    this.selectCurrency$.next(currency)
  }
}
