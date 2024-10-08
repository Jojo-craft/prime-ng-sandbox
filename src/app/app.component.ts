import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {MultiSelectModule} from "primeng/multiselect";
import {ConfirmationService, MessageService, PrimeNGConfig} from "primeng/api";
import {MessageModule} from 'primeng/message';
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {RippleModule} from "primeng/ripple";
import {CardModule} from "primeng/card";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {RatingModule} from "primeng/rating";
import {CommonModule} from "@angular/common";
import {FloatLabelModule} from "primeng/floatlabel";
import {AuraPreset, LaraPreset, NoraPreset} from "./my-preset";
import {SelectButtonModule} from "primeng/selectbutton";
import {RadioButtonModule} from "primeng/radiobutton";
import {SliderModule} from "primeng/slider";
import {ToggleSwitchModule} from "primeng/toggleswitch";

export class SelectItem {
  constructor(
    public value: string,
    public label: string,
  ) {
  }

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
    RippleModule,
    CardModule,
    TableModule,
    TagModule, RatingModule, CommonModule, FormsModule, FloatLabelModule,
    SelectButtonModule,
    RadioButtonModule,
    SliderModule,
    MessageModule,
    ToggleSwitchModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class AppComponent {

  themes: SelectItem[] = [SelectItem.of('1', 'Aura'), SelectItem.of('2', 'Lara'), SelectItem.of('2', 'Nora')];
  selectedTheme: SelectItem | undefined;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig) {

    // Aura, Lara or Nora
    this.primengConfig.theme.set({preset: AuraPreset});
    //this.primengConfig.theme.set({preset: Aura});
    //this.primengConfig.ripple.set(true);
  }

  showSuccess() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Message Content'});
  }

  showInfo() {
    this.messageService.add({severity: 'info', summary: 'Info', detail: 'Message Content'});
  }

  showWarn() {
    this.messageService.add({severity: 'warn', summary: 'Warn', detail: 'Message Content'});
  }

  showError() {
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
  }

  showContrast() {
    this.messageService.add({severity: 'contrast', summary: 'Error', detail: 'Message Content'});
  }

  showSecondary() {
    this.messageService.add({severity: 'secondary', summary: 'Secondary', detail: 'Message Content'});
  }

  selectedProducts!: Product;

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
    age: new FormControl<number>(18),
    test2: new FormControl<string>(''),
    isEnabled: new FormControl<string | null>(null),
    type: new FormControl<SelectItem | null>(null),
    date: new FormControl<Date>(new Date()),
    city: new FormControl<City | null>(null),
    checked: new FormControl(true),
  });

  types: SelectItem[] = [SelectItem.of('1', 'Multi Billing entity'), SelectItem.of('2', 'Mono Billing entity')];

  confirm(event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'You have accepted'});
      },
      reject: () => {
        this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000});
      }
    });
  }


  messages = signal<any[]>([]);

  addMessages() {
    this.messages.set([
      {severity: 'info', content: 'Dynamic Info Message'},
      {severity: 'success', content: 'Dynamic Success Message'},
      {severity: 'warn', content: 'Dynamic Warning Message'},
      {severity: 'error', content: 'Dynamic Error Message'}
    ]);
  }

  clearMessages() {
    this.messages.set([]);
  }


  products: Product[] = [
    {
      code: 'test',
      name: 'test',
      category: 'test',
      quantity: 1,
      inventoryStatus: 'OUTOFSTOCK',
    },
    {
      code: 'test',
      name: 'test',
      category: 'test',
      quantity: 2,
      inventoryStatus: 'LOWSTOCK',
    },
    {
      code: 'test',
      name: 'test',
      category: 'test',
      quantity: 3,
      inventoryStatus: 'INSTOCK',
    },
    {
      code: 'test',
      name: 'test',
      category: 'test',
      quantity: 4,
      inventoryStatus: 'LOWSTOCK',
    }
  ];

  cols = [
    {field: 'code', header: 'Code'},
    {field: 'name', header: 'Name'},
    {field: 'category', header: 'Category'},
    {field: 'quantity', header: 'Quantity'},
    {field: 'inventoryStatus', header: 'Status'}
  ];

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warn';
      case 'OUTOFSTOCK':
        return 'danger';
    }

    return 'success';
  }

  onChangeTheme(): void {
    if (this.selectedTheme?.label == 'Aura') {
      this.primengConfig.theme.set({preset: AuraPreset});
    } else if (this.selectedTheme?.label == 'Lara') {
      this.primengConfig.theme.set({preset: LaraPreset});
    } else if (this.selectedTheme?.label == 'Nora') {
      this.primengConfig.theme.set({preset: NoraPreset});
    }
  }
}


interface Product {
  code: string;
  name: string;
  category: string;
  quantity: number;
  inventoryStatus: string;
}
