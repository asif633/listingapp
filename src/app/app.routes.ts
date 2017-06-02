import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CardViewComponent } from './card-view/card-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthGuard } from './shared/authguard.service';
import { ProductManageComponent } from './product-manage/product-manage.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OuterNavbarComponent } from './outer-navbar/outer-navbar.component';
import { SignedUpComponent } from './signed-up/signed-up.component';
import { CategoryManageComponent } from './category-manage/category-manage.component';

const appRoutes: Routes = [
    {path: '', component: AppComponent, children: [
        {path: '', component: NavbarComponent, children: [
            {path: 'cardView', component: CardViewComponent},
            {path: 'listView', component: ListViewComponent},
            {path: 'manageProducts', component: ProductManageComponent, canActivate: [AuthGuard]},
            {path: 'manageCategory', component: CategoryManageComponent, canActivate: [AuthGuard]},
            {path: 'signin', component: SignInComponent},
        ]},
        {path: 'signup', component: OuterNavbarComponent ,children: [
            {path: '', component: SignUpComponent},
            {path: 'signedup', component: SignedUpComponent}
        ]}
    ]},
];

export const routes = RouterModule.forRoot(appRoutes, {useHash: false});