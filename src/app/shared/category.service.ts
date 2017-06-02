import { Injectable, Inject } from '@angular/core';
import { Category } from './category.model';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class CategoryService {

    private uid: string;

    initializeNew(): Category {
        return { name: ''};
    }

    constructor(private afAuth: AngularFireAuth, private afd: AngularFireDatabase) {
        this.afAuth.authState.subscribe(auth => {
            if (auth != undefined && auth != null)
                this.uid = auth.uid;
        }
        );
    }

    addCategory(cat: Category) {
        if (this.uid != undefined && this.uid != null) {
            let key = this.afd.list('categories').push(cat);
        }
    }

    updateCategory(cas: Category) {
        if (this.uid != undefined && this.uid != null) {
            this.afd.object('categories/' + cas.$key).update({ name: cas.name});
        }
    }

    getCategorys(): Observable<Category[]> {
        return this.afd.list('categories');
    }

    deleteCategory(cas: Category) {
        if (this.uid != undefined && this.uid != null) {
            return this.afd.list('categories').remove(cas.$key);
        }
    }

}