import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Company,  Quote } from '../../interfaces/quote.interface';

@Component({
  selector: 'app-stock-preview',
  templateUrl: './stock-preview.component.html',
  styleUrls: ['./stock-preview.component.css']
})
export class StockPreviewComponent implements OnInit {


  @Input() datosNombre: Company[]=[]
  @Input() stockQuote: Quote[] = [];

  @Output() onRemove = new EventEmitter<string>();

  @Input() nombreCompany: string | undefined = '';
  @Input() symbolCompany: string | undefined = '';

  @Input() symbol!: Quote ;

  constructor() {}

  ngOnInit(): void {
  }


  onRemoveClick() {
    this.onRemove.emit(this.symbolCompany);
  }

}
