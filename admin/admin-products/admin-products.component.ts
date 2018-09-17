import {Component, OnDestroy} from '@angular/core';
import {ProductService} from '../../product.service';
import {Subscription} from 'rxjs/Subscription';
import {Product} from '../../models/product';
import {DataTableResource} from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  products: Product[];
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;
  private subsription: Subscription;
  constructor(private productService: ProductService) {
    this.subsription = productService.getAll()
      .subscribe(p => {
      this.products = p;
      this.initializeTable(p);
    });
  }
  filter(query: string) {
    const filterProducts = (query) ?
      this.products.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()))
      : this.products;
    this.initializeTable(filterProducts);
  }
  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource<Product>(products);
    this.tableResource.query({ offset: 0})
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }
  reloadItems(params) {
    if (this.tableResource) {
      this.tableResource.query(params)
        .then(items => this.items = items);
    }
  }
  ngOnDestroy() {
    this.subsription.unsubscribe();
  }

}
