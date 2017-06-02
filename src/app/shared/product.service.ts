import { Injectable, Inject } from '@angular/core';
import { Product } from './product.model';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

@Injectable()
export class ProductService {

    private uid: string;
    private firebasestorage: any;

    initializeNew(): Product {
        return { name: '', sku: '', price: '', description: '', imageUrl: '' };
    }

    constructor(private afAuth: AngularFireAuth, private afd: AngularFireDatabase, fbApp: FirebaseApp) {
        this.afAuth.authState.subscribe(auth => {
            if (auth != undefined && auth != null)
                this.uid = auth.uid;
        }
        );
        this.firebasestorage = fbApp.storage();
    }

    addProduct(prod: Product, file: File) {
        if (this.uid != undefined && this.uid != null) {
            let key = this.afd.list('products').$ref.ref.push().key;
            this.firebasestorage.ref(`products` + `/` + key + `/` + prod.name).put(file).then(
                snapshot => {
                    prod.imageUrl = snapshot.downloadURL;
                    this.afd.object('products/' + key).set(prod);
                    this.afd.object('userProducts/' + this.uid + '/' + key).set(true);
                    //alternate method this.afd.list('userProducts').$ref.ref.child(this.uid).child(key).set(true).then(res=> this.afd.list('products').$ref.ref.child(key).set(prod));
                });
        }
    }

    updateProduct(cas: Product, file: File) {
        if (this.uid != undefined && this.uid != null) {
            if (file != undefined && file != null) {
                this.firebasestorage.ref(`products` + `/` + cas.$key + `/` + file.name).put(file).then(
                    snapshot => {
                        cas.imageUrl = snapshot.downloadURL;
                        this.afd.object('products/' + cas.$key).update({ name: cas.name, sku: cas.sku, price: cas.price, description: cas.description, imageUrl: cas.imageUrl });
                    });
            }
            else {
                this.afd.object('products/' + cas.$key).update({ name: cas.name, sku: cas.sku, price: cas.price, description: cas.description, imageUrl: cas.imageUrl });
            }
        }
    }

    getProducts(): Observable<Product[]> {
        return this.afd.list('products');
    }

    getCategoryProducts(catKey: string) {
        return this.afd.list('categoryProducts/' + catKey)
            .map(res => res.map(res => res.$key))
            .map(lspc => lspc.map(lessonKey => this.afd.object('products/' + lessonKey)))
            .mergeMap(fbojs => Observable.combineLatest(fbojs))
    }

    getProductsOfUser(): Product[] {
        let products: Product[] = [];
        if (this.uid != undefined || this.uid != null) {
            this.afd.list('userProducts/' + this.uid)
                .forEach(res => res.forEach(
                    res => {
                        console.log(res.$key);
                        this.afd.object(`products/` + res.$key).subscribe(res => {
                            console.log(res);
                            products.push(res);
                        })
                    }
                ));
        }
        return products;
    }

    getUserProducts(): Observable<Product[]> {
        if (this.uid != undefined || this.uid != null) {
            return this.afd.list('userProducts/' + this.uid)
                .map(res => res.map(res => res.$key))
                .map(lspc => lspc.map(lessonKey => this.afd.object('products/' + lessonKey)))
                .mergeMap(fbojs => Observable.combineLatest(fbojs))
        }
    }

    deleteProduct(cas: Product) {
        if (this.uid != undefined && this.uid != null) {
            return this.afd.list('products').remove(cas.$key).then(
                onResolve => {
                    this.afd.object('userProducts/' + this.uid + '/' + cas.$key).remove();
                    this.firebasestorage.ref(`products` + `/` + cas.$key + `/` + cas.name).delete().then(
                        snapshot => {
                            //console.log(snapshot.downloadURL);
                        });
                }
            );
        }
    }

}