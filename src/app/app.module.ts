import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { NavbarComponent } from './navbar/navbar.component';
import { CardViewComponent } from './card-view/card-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { CardContainerComponent } from './card-container/card-container.component';
import { CardComponent } from './card/card.component';
import { ListContainerComponent } from './list-container/list-container.component';
import { ListItemComponent } from './list-item/list-item.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthenticationService } from './shared/authentication.service';
import { AuthGuard } from './shared/authguard.service';
import { ProductManageComponent } from './product-manage/product-manage.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { ProductService } from './shared/product.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignedUpComponent } from './signed-up/signed-up.component';
import { OuterNavbarComponent } from './outer-navbar/outer-navbar.component';
import { ProductInfoService } from './shared/productinfo.service';
import { CategoryService } from './shared/category.service';
import { CategoryManageComponent } from './category-manage/category-manage.component';
import { CategoryTableComponent } from './category-table/category-table.component';
import { CategoryFormComponent } from './category-form/category-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CardViewComponent,
    ListViewComponent,
    CardContainerComponent,
    CardComponent,
    ListContainerComponent,
    ListItemComponent,
    SignInComponent,
    ProductManageComponent,
    ProductFormComponent,
    ProductsTableComponent,
    SignUpComponent,
    SignedUpComponent,
    OuterNavbarComponent,
    CategoryManageComponent,
    CategoryTableComponent,
    CategoryFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  providers: [AuthenticationService, AuthGuard, ProductService, ProductInfoService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
