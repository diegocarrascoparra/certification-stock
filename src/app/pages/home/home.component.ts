import { Component, OnInit} from '@angular/core';
import { StockService } from '../../services/stock.service';
import { Company, Quote } from '../../interfaces/quote.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public codeNameArray: string[] = [];
  termino: string = '';
  datosNombre: Company[] = [];
  nameCompany!: Company;
  stockQuote: Quote[] = [];
  historial: string[] = [];
  load: boolean = false;

  constructor(public stockService: StockService) {}
  ngOnInit(): void {
    this.loadFromStorage();
  }

  loadFromStorage(): void {
    if (localStorage.getItem('historial')) {
      let stored = JSON.parse(localStorage.getItem('historial')!);
      let res = stored.toString().split(',');
      if (res.length > 0) {
        for (const element of res) {
          this.codeNameArray.push(element);
          let symbol = element;
          if (symbol.trim().length > 1) {
            this.company(symbol);
          }
        }
      }
    }
  }

  remove(name: string) {
    this.removeFromStorage(name);
  }

  removeFromStorage(name: string): void {
    this.codeNameArray = this.codeNameArray.filter(
      (z) => z !== name.toLocaleLowerCase()
    );
    localStorage.setItem('historial', JSON.stringify(this.codeNameArray));
    this.datosNombre = this.datosNombre.filter(
      (nombreObj) => nombreObj.result[0].displaySymbol != name
    );
  }

  company(name: string) {
    if (!name) {
      return ;
    }
    name = name.trim().toLocaleLowerCase();
    this.load = true;

    if (!this.historial.includes(name)) {
      this.historial.push(name);
      localStorage.setItem('historial', JSON.stringify(this.historial));
    }
    this.stockService.getCompanyName(name).subscribe((company) => {
      this.nameCompany = company;
      if (this.nameCompany) {
        this.datosNombre = [...this.datosNombre, company];
        this.stockService.datosCotizados(this.nameCompany).subscribe((data) => {
          this.stockQuote = [...this.stockQuote, data];
          this.load = false;
        });
      }
    });
    this.termino = '';
  }
}
