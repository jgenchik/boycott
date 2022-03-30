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
    // 'IVGEL': {name: 'Test', status: 'BAD', reason: 'Operates in russia'},
    // 'IVGEL': {name: 'Test', status: 'GOOD', reason: 'Stopped operations in russia'},
    'PFIZER': {name: 'Pfizer', status: 'BAD', reason: 'Operates in russia'},
    'ASTRAZENECA': {name: 'ASTRAZENECA', status: 'BAD', reason: 'Operates in russia'},
    'ADIDAS': {name: 'Adidas', status: 'BAD', reason: 'Operates in russia'},
    'ABBOTT': {name: 'Abbott', status: 'BAD', reason: 'Operates in russia'},
    'ACCOR': {name: 'Accor', status: 'BAD', reason: 'Operates in russia'},
    'GENERAL MILLS': {name: 'General Mills', status: 'BAD', reason: 'Operates in russia'},
    'NESTLE': {name: 'Nestle', status: 'BAD', reason: 'Operates in russia'},
    'SUBWAY': {name: 'Subway', status: 'BAD', reason: 'Operates in russia'},
    'BAYER': {name: 'Bayer', status: 'BAD', reason: 'Operates in russia'},
    'COLGATE-PALMOLIVE': {name: 'Colgate-Palmolive', status: 'BAD', reason: 'Operates in russia'},
    'COLGATE PALMOLIVE': {name: 'Colgate-Palmolive', status: 'BAD', reason: 'Operates in russia'},
    'CINNABON': {name: 'Cinnabon', status: 'BAD', reason: 'Operates in russia'},
    'GLAXOSMITHKLINE': {name: 'GlaxoSmithKline', status: 'BAD', reason: 'Operates in russia'},
    'JOHNSON & JOHNSON': {name: 'Johnson & Johnson', status: 'BAD', reason: 'Operates in russia'},
    'KIMBERLY-CLARK': {name: ' Kimberly-Clark', status: 'BAD', reason: 'Operates in russia'},
    'KIMBERLY CLARK': {name: ' Kimberly-Clark', status: 'BAD', reason: 'Operates in russia'},
    'KRAFT HEINZ': {name: 'Kraft Heinz', status: 'BAD', reason: 'Operates in russia'},
    'KRAFT': {name: 'Kraft Heinz', status: 'BAD', reason: 'Operates in russia'},
    'HEINZ': {name: 'Kraft Heinz', status: 'BAD', reason: 'Operates in russia'},
    'MARS': {name: 'Mars', status: 'BAD', reason: 'Operates in russia'},
    'PROCTER & GAMBLE': {name: 'Procter & Gamble', status: 'BAD', reason: 'Operates in russia'},
    'UNILEVER': {name: 'Unilever', status: 'BAD', reason: 'Operates in russia'},
    // '': {name: '', status: 'BAD', reason: 'Operates in russia'},
  };


  constructor() { }

  evaluateCompany(name: string): CompanyStatus | void {
    console.log(' in evaluateCompany. name', name);
    console.log('this.companies[name.toUpperCase()]', this.companies[name.toUpperCase()]);

    return this.companies[name.toUpperCase()];
  }


}
