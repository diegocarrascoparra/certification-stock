
import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap, tap } from 'rxjs';
import { Sentiment } from '../../interfaces/quote.interface';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css']
})
export class SentimentComponent implements OnInit {

  fecha: Date = new Date();
  public paramsSubscription!: Subscription;
  formattedDate;
  sentiment!: Sentiment;
  nombre: string | undefined = '';
  load: boolean = false;

  constructor(private router: ActivatedRoute,
    private stockService: StockService) {
      this.formattedDate = formatDate(this.fecha, 'yyyy-MM-dd', 'en-US');
    }


    firstDigit(valor:number){// añade 0 si es de 1 digito
      return valor.toString().length === 1 ? "0" + valor : valor;
    }

    cambioAnyo(year: number, mount: number) {//resta 1 año
      year = mount === -1
        ? year - 1
        : mount === -2
          ? year - 1
          : year;
      return year;
    }

    cambioMes(mount: number) {
      mount = mount === -1
        ? 11
        : mount === -2
          ? 10
          : mount;
      return mount;
    }


  fechaFrom(){
    let year = this.fecha.getFullYear();
    let mount = this.fecha.getMonth()-5;
    const day = this.fecha.getDay();

    year = this.cambioAnyo(year, mount);
    mount = this.cambioMes(mount);
    const dateFromFormated = `${year}-${this.firstDigit(mount+1)}-${this.firstDigit(day)}`;

    return dateFromFormated;
  }



  ngOnInit(): void {
    this.load=true;

    this.router.params
      .pipe(
        switchMap(({ symbol }) => {
          if (symbol) {
            this.nombre = symbol;
            const name:string = this.nombre!==undefined ? this.nombre : '';
            this.stockService.getCompanyName(name!)
              .subscribe(data => {
                this.nombre = data.result[0].description;
            })
          }
          return this.stockService.getInsiderSentiment(symbol, this.fechaFrom(), this.formattedDate);
        })
      )
      .subscribe(sentiment => {

        this.sentiment = sentiment
        this.sentiment.data.sort((a,b)=>b.month-a.month);
        this.load=false;
      })

  }








}



