import { Injectable, Inject } from '@angular/core';
import { Product } from './product.model';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProductInfo } from './productinfo.model';

@Injectable()
export class ProductInfoService {

    private uid: string;

    initializeNew(): ProductInfo {
        return { features: new Map() };
    }

    constructor(private afAuth: AngularFireAuth, private afd: AngularFireDatabase) {
        this.afAuth.authState.subscribe(auth => {
            if (auth != undefined && auth != null)
                this.uid = auth.uid;
        }
        );
    }

    addProductInfo(prod: ProductInfo, prodKey: string) {
        if (this.uid != undefined && this.uid != null) {
            let key = this.afd.list('productInfos').$ref.ref.push().key;
            this.afd.list('productInfoList').$ref.ref.child(prodKey).child(key).set(true).then(
                res => this.afd.list('productInfos').$ref.ref.child(key).set(prod)
            );
        }
    }

    updateProductInfo(cas: ProductInfo) {
        if (this.uid != undefined && this.uid != null) {
            this.afd.object('productInfos/' + cas.$key).update({ name: cas.features });
        }
    }

    getProductInfos(): Observable<ProductInfo[]> {
        return this.afd.list('productInfos');
    }

    getProductInfoOfProduct(prodKey: string) {
        let product: ProductInfo;
        this.afd.list('productInfoList/' + prodKey)
            .forEach(res => res.forEach(
                res => {
                    this.afd.object(`productInfos/` + res.$key).subscribe(res => {
                        product = res;
                    })
                }
            ));
        return product;
    }

    deleteProductInfo(cas: ProductInfo) {
        if (this.uid != undefined && this.uid != null) {
            return this.afd.list('products').remove(cas.$key).then(
                resove => this.afd.list('productInfos').$ref.ref.child(cas.$key).remove()
            );
        }
    }

}