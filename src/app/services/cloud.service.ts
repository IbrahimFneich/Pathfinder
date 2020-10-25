import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  private matrixSource = new BehaviorSubject<number[][]>(this.InitializeMatrix());
  currentMatrix = this.matrixSource.asObservable();

  constructor() { }

  updateMatrix(matrix:number[][]){
    this.matrixSource.next(matrix);

  }

  InitializeMatrix():number[][]{

    const matrix = [];
    for (let row = 0; row < 15; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        if(row==8 && col == 8){
          currentRow.push(-1);
        }
        else if(row==8 && col == 42){
          currentRow.push(-2);
        }
        else        
        currentRow.push(0);
      }

      matrix.push(currentRow);

    }

    return matrix;


    

  }

}
