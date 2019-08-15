import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Order} from '../model/order.model';
import {OrderRepository} from '../model/order.repository';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';

@Component({
    moduleId: module.id,
    templateUrl: 'checkout.component.html',
    styleUrls: ['checkout.component.css']
})
export class CheckoutComponent {
    orderSent: boolean = false;
    submitted: boolean = false;

    constructor(public order: Order, public repository: OrderRepository) {}

    submitOrder(form: NgForm) {
        this.submitted = true;
        if (form.valid) {
            this.repository.saveOrder(this.order).subscribe(order => {
                this.order.clear();
                this.orderSent = true;
                this.submitted = false;
            })
        } 
    }
 }