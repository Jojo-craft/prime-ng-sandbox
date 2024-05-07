import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {MultiSelectModule} from "primeng/multiselect";
import {ConfirmationService, Message, MessageService} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {RippleModule} from "primeng/ripple";
import {MessagesModule} from "primeng/messages";
import {CardModule} from "primeng/card";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {RatingModule} from "primeng/rating";
import {CommonModule} from "@angular/common";

export class SelectItem {
  constructor(
    public value: string,
    public label: string,
  ) {}

  static of(value: string, label: string): SelectItem {
    return new SelectItem(value, label);
  }
}

interface City {
  name: string,
  code: string
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CalendarModule,
    CheckboxModule, DropdownModule, InputTextModule, MultiSelectModule,
    ConfirmDialogModule, ToastModule, ButtonModule,
    MessagesModule, RippleModule,
    CardModule,
    TableModule,
    TagModule, RatingModule, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class AppComponent {

  cities: City[] = [
    {name: 'New York', code: 'NY'},
    {name: 'Rome', code: 'RM'},
    {name: 'London', code: 'LDN'},
    {name: 'Istanbul', code: 'IST'},
    {name: 'Paris', code: 'PRS'}
  ];

  form = new FormGroup({
    id: new FormControl<string>(''),
    code: new FormControl<string>('', [Validators.required, Validators.maxLength(30)]),
    name: new FormControl<string>('', [Validators.required, Validators.maxLength(60)]),
    test: new FormControl<string>(''),
    isEnabled: new FormControl<string | null>(null),
    type: new FormControl<SelectItem | null>(null),
    date: new FormControl<Date>(new Date()),
    city: new FormControl<City | null>(null),
  });

  types: SelectItem[] = [SelectItem.of('1', 'Multi Billing entity'), SelectItem.of('2', 'Mono Billing entity')];


  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {
  }

  confirm(event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }


  messages: Message[] = [];

  addMessages() {
    this.messages = [
      { severity: 'info', summary: 'Dynamic Info Message' },
      { severity: 'success', summary: 'Dynamic Success Message' },
      { severity: 'warn', summary: 'Dynamic Warning Message' },
      { severity: 'error', summary: 'Dynamic Error Message' }
    ];
  }

  clearMessages() {
    this.messages = [];
  }


  products: Product[] = [
    {
      code: 'test',
      name: 'test',
      category: 'test',
      quantity: 2,
      inventoryStatus: 'OUTOFSTOCK',
      rating:'2'
    },
    {
      code: 'test',
      name: 'test',
      category: 'test',
      quantity: 2,
      inventoryStatus: 'LOWSTOCK',
      rating:'2'
    },
    {
      code: 'test',
      name: 'test',
      category: 'test',
      quantity: 2,
      inventoryStatus: 'INSTOCK',
      rating:'2'
    },
    {
      code: 'test',
      name: 'test',
      category: 'test',
      quantity: 2,
      inventoryStatus: 'LOWSTOCK',
      rating:'2'
    }
  ];

  cols = [
    { field: 'code', header: 'Code' },
    { field: 'name', header: 'Name' },
    { field: 'category', header: 'Category' },
    { field: 'quantity', header: 'Quantity' },
    { field: 'inventoryStatus', header: 'Status' },
    { field: 'rating', header: 'Rating' }
  ];

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }

    return 'success';
  }

}


interface Product {
  code: string;
  name: string;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: string;
}
