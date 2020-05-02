import {ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {CodeScannerComponent} from '../../scan/code-scanner/code-scanner.component';

@Component(
  {
    selector: 'app-name-or-barcode',
    templateUrl: './name-or-barcode.component.html',
    styles: [`
      :host ::ng-deep video {
        max-width: 45vw;
        object-fit: contain;
      }`]
  })

export class NameOrBarcodeComponent {
  @Input() nameOrEan: string;
  @Output() nameOrEanChange = new EventEmitter();
  @ViewChild(CodeScannerComponent) scanner: CodeScannerComponent;
  showScanner: boolean;

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  codeDetected(barcode: string) {
    this.scanner.stopScan();
    this.showScanner = false;
    this.nameOrEan = barcode;
    this.nameOrEanChange.emit(barcode);
  }

  startScan() {
    this.showScanner = true;
    this.changeDetector.detectChanges();
    this.scanner.startScan();
  }
}
