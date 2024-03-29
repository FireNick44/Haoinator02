import { Component, ViewChild } from '@angular/core';
import { AlertController, IonRadioGroup  } from '@ionic/angular';
import { StorageService } from '../_services/storage.service';

//import { Observable, of } from "rxjs";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})

export class Tab1Page {

  constructor(
    private storageService: StorageService,
    private alertController: AlertController,
  ) {
    //if(this.radioGroup.value == undefined) this.radioGroup.value = "0";
    this.load();
  }

  ngOnInit() {}

  @ViewChild('radioGroup') radioGroup: IonRadioGroup

  counter: number = 0;
  createdObj: cList[] = [];

  selectedValue: any;

  checkValue() {
    //https://stackoverflow.com/questions/68348217/how-to-get-the-value-of-the-selected-ion-radio-button-after-submission-using-ang
      console.log('Selected value: ', this.selectedValue);
  }

  async load() {
    var c: cList[] = JSON.parse(await this.storageService.get('cObj'));

    if (c == null || c == undefined) {
      //first load
      var n: string = 'First Counter';
      this.createdObj = [{ id: 0, name: n , count: 0 }];
      this.storageService.set('cId', 0);
      this.selectedValue = 0;
    } else {
      //after first load
      this.createdObj = c;
    }
    //this.radioGroup.value = "0";
    //this.selectedValue = 0 ;
    this.save();
  }

  async save() {
    this.storageService.set('cObj', JSON.stringify(this.createdObj));
  }

  add() {
    //console.log(this.createdObj[this.selectedValue]);
    //this.counter++;
    this.createdObj[this.selectedValue].count++;
    this.save();
  }

  sub() {
    this.createdObj[this.selectedValue].count--;
    this.save();
  }

  remove() {
    var indexOfArray = this.selectedValue - 1;
    var v: string = String(indexOfArray);
    this.createdObj.splice(indexOfArray, 1);
    this.radioGroup.value = v;
    console.log("selected value via. var:");
    console.log(v);
    this.save();
  }

  async create() {
    const alert = await this.alertController.create({
      header: 'Create a counter',
      message: 'Add a name to your counter',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Ok',
          role: 'confirm',
          handler: async (alertData) => {
            var id: number = JSON.parse(await this.storageService.get('cId'));
            id++;
            var c: cList[] = [{ id: id , name: alertData.name, count: 0 }];

            this.createdObj.push(c[0]);
            this.storageService.set('cId', id);
            this.save();
          },
        },
      ],
      inputs: [
        {
          name: 'name',
          placeholder: 'Name (max 15 characters)',
          attributes: {
            maxlength: 15,
          },
        },
      ],
    });
    await alert.present();
  }
}

export interface cList {
  id: number;
  name: string;
  count: number;
}
