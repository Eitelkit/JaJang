import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { UserService } from './user.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from 'angular5-data-table';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartService } from './shopping-cart.service';
import { DragScrollModule } from 'ngx-drag-scroll';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantFilterComponent } from './restaurants/restaurant-filter/restaurant-filter.component';
import { CarouselComponent } from './carousel/carousel.component';
import { RestaurantService } from './restaurant.service';
import { AdminRestaurantsComponent } from './admin/admin-restaurants/admin-restaurants.component';
import { RestaurantsFormComponent } from './admin/restaurants-form/restaurants-form.component';
import { RestaurantProductComponent } from './restaurant-product/restaurant-product.component';
import { RestaurantProductService } from './restaurant-product.service';
import { ManageProductsComponent } from './manage/manage-products/manage-products.component';
import { ManageProductsFormComponent } from './manage/manage-products-form/manage-products-form.component';
import { RestaurantDashboardComponent } from './manage/restaurant-dashboard/restaurant-dashboard.component';
import { RestaurantsCardGroupComponent } from './restaurants-card-group/restaurants-card-group.component';
import { ManageRestaurantComponent } from './manage/manage-restaurants/manage-restaurant.component';
import { ManageRestaurantsFormComponent } from './manage/manage-restaurants-form/manage-restaurants-form.component';
import { RestaurantProductFilterComponent } from './restaurant-product-filter/restaurant-product-filter.component';
import { UserShoppingCartsComponent } from './user-shopping-carts/user-shopping-carts.component';
import {UserShoppingCartsService} from './user-shopping-carts.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatDividerModule} from '@angular/material';
import {CheckOutService} from './check-out.service';
import { ManageOrdersComponent } from './manage/manage-orders/manage-orders.component';
import { OrderDetailComponent } from './manage/order-detail/order-detail.component';
import { MenuMakerComponent } from './menu-maker/menu-maker.component';
import { ProductsSidebarComponent } from './products-sidebar/products-sidebar.component';
import { SvgMakerComponent } from './svg-maker/svg-maker.component';
import { ManagerComponent } from './manager/manager.component';
import { QrCodeComponent } from './qr-code/qr-code.component';
import {HereOrderService} from './here-order.service';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {ENgxPrintModule} from 'e-ngx-print';
import { ManagerTableCardComponent } from './manager-table-card/manager-table-card.component';
import { InRestaurantOrderComponent } from './in-restaurant-order/in-restaurant-order.component';
import { TableDetailComponent } from './table-detail/table-detail.component';
import {PaperMenuService} from './paper-menu.service';
import { SvgMakerThumbnailComponent } from './svg-maker-thumbnail/svg-maker-thumbnail.component';
import { OrderReportComponent } from './order-report/order-report.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { OrderReportDetailComponent } from './order-report-detail/order-report-detail.component';
import {NeuChartsModule} from 'neu-charts';
import { OrderChartComponent } from './order-chart/order-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    RestaurantsComponent,
    RestaurantFilterComponent,
    CarouselComponent,
    AdminRestaurantsComponent,
    RestaurantsFormComponent,
    RestaurantProductComponent,
    ManageProductsComponent,
    ManageProductsFormComponent,
    RestaurantDashboardComponent,
    RestaurantsCardGroupComponent,
    ManageRestaurantComponent,
    ManageRestaurantsFormComponent,
    RestaurantProductFilterComponent,
    UserShoppingCartsComponent,
    ManageOrdersComponent,
    OrderDetailComponent,
    MenuMakerComponent,
    ProductsSidebarComponent,
    SvgMakerComponent,
    ManagerComponent,
    QrCodeComponent,
    ManagerTableCardComponent,
    InRestaurantOrderComponent,
    TableDetailComponent,
    SvgMakerThumbnailComponent,
    OrderReportComponent,
    VerifyEmailComponent,
    OrderReportDetailComponent,
    OrderChartComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'shopping-cart', component: UserShoppingCartsComponent},
      {path: 'restaurants/:id', component: RestaurantProductComponent},
      {path: 'restaurants', component: RestaurantsComponent},
      {path: 'in-restaurant-service', component: InRestaurantOrderComponent},
      {path: 'verify-email', component: VerifyEmailComponent},

      {path: 'check-out/:restId', component: CheckOutComponent, canActivate: [AuthGuard]},
      {path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard]},
      {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard]},
      {path: 'manage-restaurants-form/new', component: ManageRestaurantsFormComponent, canActivate: [AuthGuard]},
      {path: 'manage-restaurants-form/:restId', component: ManageRestaurantsFormComponent, canActivate: [AuthGuard]},
      {path: 'manage-restaurants', component: ManageRestaurantComponent, canActivate: [AuthGuard]},
      {path: 'restaurant-dashboard/:restId', component: RestaurantDashboardComponent, canActivate: [AuthGuard],
      children: [
        {path: '', component: ManagerComponent, canActivate: [AuthGuard]},
        {path: 'qr-code-maker', component: QrCodeComponent, canActivate: [AuthGuard]},
        {path: 'manage-products/new', component: ManageProductsFormComponent, canActivate: [AuthGuard]},
        {path: 'manage-products/:productId', component: ManageProductsFormComponent, canActivate: [AuthGuard]},
        {path: 'manage-products', component: ManageProductsComponent, canActivate: [AuthGuard]},
        {path: 'manage-orders', component: ManageOrdersComponent, canActivate: [AuthGuard]},
        {path: 'order-detail/:orderId', component: OrderDetailComponent, canActivate: [AuthGuard]},
        {path: 'table-detail/:tableId', component: TableDetailComponent, canActivate: [AuthGuard]},
        {path: 'menu-maker/:menuId', component: MenuMakerComponent, canActivate: [AuthGuard]},
        {path: 'menu-maker', component: MenuMakerComponent, canActivate: [AuthGuard]},
        {path: 'report', component: OrderReportComponent, canActivate: [AuthGuard]},
        {path: 'report-detail/:orderId', component: OrderReportDetailComponent, canActivate: [AuthGuard]},
        {path: 'chart', component: OrderChartComponent, canActivate: [AuthGuard]}
      ]},

      {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuardService]},
      {path: 'admin/restaurants/:id', component: RestaurantsFormComponent, canActivate: [AuthGuard, AdminAuthGuardService]},
      {path: 'admin/restaurants', component: AdminRestaurantsComponent, canActivate: [AuthGuard, AdminAuthGuardService]},
      {path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuardService]},
      {path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuardService]},
      {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuardService]}
    ]
   ),
    NgbModule.forRoot(),
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    DragScrollModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    NgxQRCodeModule,
    ENgxPrintModule,
    NeuChartsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuardService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    RestaurantService,
    RestaurantProductService,
    UserShoppingCartsService,
    CheckOutService,
    HereOrderService,
    PaperMenuService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
