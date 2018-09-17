import {Component, ElementRef, OnInit} from '@angular/core';
import {HereOrderService} from '../here-order.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {
  numberT = 0; // store the number of table
  urlAddress = 'www.jajang.cloud/restaurants/'; // qr code information: urlAddress + tableKey
  restuarantId: string; // store the restaurant id
  table$; // store table information (observable)
  printStyle = '' + // print style css
    'button' +
    '{' +
    'visibility: hidden;' +
    '}';
  constructor(private hereOrderService: HereOrderService,
              private route: ActivatedRoute) {
    this.restuarantId = this.route.parent.snapshot.url[1].toString(); // get the restaurant id
    this.table$ = this.hereOrderService.getAllTable(this.restuarantId); // get the table(observable)
  }
  generateQR(input) { // generate qr code for table
    this.hereOrderService.generateTable(input.number, this.restuarantId);
  }
  deleteTable(tableId) { // delete the table
    this.hereOrderService.deleteOneTable(tableId, this.restuarantId);
  }

  ngOnInit() {
  }

}
