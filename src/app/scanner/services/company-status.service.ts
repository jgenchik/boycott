import { Injectable } from '@angular/core';
import { CompanyStatus } from '../types/company-status.type';

@Injectable({
  providedIn: 'root'
})
export class CompanyStatusService {

  companies: {[key: string]: CompanyStatus} = {
    'HEINEKEN': {name: 'Heineken', status: 'GOOD', reason: 'Stopped operations in russia'},
    'POLAND SPRING': {name: 'Poland Spring', status: 'BAD', reason: 'Operates in russia'},
    'GOYA': {name: 'Goya', status: 'GOOD', reason: 'Stopped operations in russia'},
    'IVGEL': {name: 'Test', status: 'BAD', reason: 'Operates in russia'},
    // 'IVGEL': {name: 'Test', status: 'GOOD', reason: 'Stopped operations in russia'},
  };


  constructor() { }

  evaluateCompany(name: string): CompanyStatus | void {
    console.log(' in evaluateCompany. name', name);
    console.log('this.companies[name.toUpperCase()]', this.companies[name.toUpperCase()]);

    return this.companies[name.toUpperCase()];
  }


}
