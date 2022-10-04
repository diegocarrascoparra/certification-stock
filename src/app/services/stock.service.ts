import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company,  Quote, Result, Sentiment } from '../interfaces/quote.interface';
import { from, Observable, switchMap, mergeMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private baseUrl: string = 'https://finnhub.io/api/v1/';
  private apiKey: string = 'bu4f8kn48v6uehqi3cqg';
  public datos!: Result;
  public nombre: string = '';

  public nameList: Map<string, Result> = new Map();
  public stockList: Map<string, Quote> = new Map();
  datosNombre!: Company[];
  datosNombre2!: Company;
  datosQuote!: Quote[];

  private names: string[] = [];

  constructor(private http: HttpClient) {}

  public removeLocation(name: string): void {
    this.names = this.names.filter((z) => z !== name);
    this.stockList.delete(name);
    this.nameList.delete(name);
  }

  getCompanyName(name: string) {
    return this.http
      .get<Company>(`${this.baseUrl}search?q=${name}&token=${this.apiKey}`)
      .pipe(
        tap((names) => {
          this.datosNombre2 = names;
        })
      );
  }

  datosCotizados(company: Company): Observable<Quote> {
    return this.http.get<Quote>(
      `${this.baseUrl}quote?symbol=${company.result[0].displaySymbol}&token=${this.apiKey}`
    );
  }

  getInsiderSentiment(
    symbol: string,
    from: string,
    to: string
  ): Observable<Sentiment> {
    return this.http.get<Sentiment>(
      `${this.baseUrl}stock/insider-sentiment?symbol=${symbol}&from=${from}&to=${to}&token=${this.apiKey}`
    );
  }
}

