import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartItem } from '../models';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit, OnChanges {

  @Input()
  cartItem: CartItem;

  @Output()
  onUpdate = new EventEmitter<CartItem>()

  @Output()
  onDelete = new EventEmitter<CartItem>()

  @Output() onAdd = new EventEmitter<CartItem>()
  
  form: FormGroup = this.createForm();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    console.info('Item details: ', this.cartItem)
  }

  ngOnChanges() {
    this.form = this.createForm(this.cartItem)
  }

  updateItem() {
    // cast, coercion
    const updatedValues = this.form.value as CartItem
    this.onUpdate.next(updatedValues)
    // clear the form
    this.form.reset()
  }

  clearItem() {
    this.form.reset()
  }

  deleteItem() {
    const deletedValues = this.form.value as CartItem
    this.onDelete.next(deletedValues)
    console.log('deletedValues: ', deletedValues)
    this.form.reset()
  }

  addItem() {
    const addedValues = this.form.value as CartItem
    this.onAdd.next(addedValues)
    this.form.reset()
  }

  createForm(item: CartItem = null): FormGroup {
    return this.fb.group({
      id: this.fb.control(item?.id, [ Validators.required ]),
      item: this.fb.control(item?.item,
        [ Validators.required, Validators.minLength(3) ]),
      quantity: this.fb.control(item?.quantity,
        [ Validators.required, Validators.min(1), Validators.max(100) ])
    })
  }

}
