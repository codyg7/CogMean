import { Component, OnInit } from '@angular/core';
import { CogmeanService } from '../services/cogmean';
import CogMean from '../models/cogmean';

@Component({
  selector: 'app-cogmean',
  templateUrl: './cogmean.component.html',
  styleUrls: ['./cogmean.component.scss']
})
export class CogmeanComponent implements OnInit {

  constructor(private cogmeanService: CogmeanService) { }

  //Declaring the new cogmean Object and initilizing it
  newCogmean: CogMean = new CogMean();

  //An Empty list for the visible cogmean list
  cogmeansList: CogMean[];
  editCogmeans: CogMean[] = [];

  ngOnInit() {
    //At component initialization the 
    this.cogmeanService.getCogMeans()
      .subscribe(cogmeans => {
        //assign the cogmeanlist property to the proper http response
        this.cogmeansList = cogmeans
        console.log(cogmeans)
      })
  }

  create() {
    this.cogmeanService.createCogmean(this.newCogmean)
      .subscribe((res) => {
        this.cogmeansList.push(res.data)
        this.newCogmean = new CogMean()
      })
  }

  editCogmean(cogmean: CogMean) {
    console.log(cogmean)
     if(this.cogmeansList.includes(cogmean)){
      if(!this.editCogmeans.includes(cogmean)){
        this.editCogmeans.push(cogmean)
      }else{
        this.editCogmeans.splice(this.editCogmeans.indexOf(cogmean), 1)
        this.cogmeanService.editCogmean(cogmean).subscribe(res => {
          console.log('Update Succesful')
         }, err => {
            this.editCogmean(cogmean)
            console.error('Update Unsuccesful')
          })
        }
      }
    }

    doneCogmean(cogmean:CogMean){
      cogmean.status = 'Done'
      this.cogmeanService.editCogmean(cogmean).subscribe(res => {
        console.log('Update Succesful')
      }, err => {
        this.editCogmean(cogmean)
        console.error('Update Unsuccesful')
      })
    }

    submitCogmean(event, cogmean:CogMean){
      if(event.keyCode ==13){
        this.editCogmean(cogmean)
      }
    }

    deleteCogmean(cogmean: CogMean) {
      this.cogmeanService.deleteCogmean(cogmean._id).subscribe(res => {
        this.cogmeansList.splice(this.cogmeansList.indexOf(cogmean), 1);
      })
    }

}