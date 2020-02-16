import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  // tslint:disable-next-line: variable-name
  private _listFilter: string;

  /**
   * fixing ngIf with viewchild undefined problem
   * 
   * @ViewChild('filterElement') filterElementRef: ElementRef;
   * private _filterInput: NgModel;
   * private _sub: Subscription;
   * 
   * get filterIntput(): NgModel {
   *  return this._filterInput;
   * }
   * 
   * @ViewChild(NgModel)
   * set filterInput(value: NgModel) {
   *  this._filterInput = value;
   *  console.log(this.filterInput);
   *  if(this.filterInput && !this._sub){
   *    console.log('Subscribing');
   *    _sub = this.filterInput.valueChanges.subscribe(
   *      () => {
   *        this.preformFilter(this.listFilter);
   *        console.log('Peformed the filter');
   *      }
   *    );
   *  }
   *  if(this.filterElementRef){
   *    this.filterElementRef.nativeElement.focus();
   *  }
   * }
   * 
   */

  // dependency injection
  constructor(private productService: ProductService) { }

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this._listFilter
      ? this.performFilter(this._listFilter)
      : this.products;
  }

  filteredProducts: IProduct[];
  products: IProduct[] = [];
  errorMessage: string;

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => this.errorMessage = error as any
    );
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter(
      (product: IProduct) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }
}
