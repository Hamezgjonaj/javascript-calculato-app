import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../services';
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  private number1: any;
  private number2: any;
  private result: any;
  private operation: any;

  constructor(private CalculatorService: CalculatorService) { }

  ngOnInit() {
    this.clear();
  }

  /**
   * @return
   */
  clear(): void {
    this.number1 = '0';
    this.number2 = null;
    this.result = null;
    this.operation = null;
  }

  /**
   * @param string
   * @return
   */
  addNumber(number: string): void {
    if (this.operation === null) {
      this.number1 = this.concatenateNumber(this.number1, number);
    } else {
      this.number2 = this.concatenateNumber(this.number2, number);
    }
  }

  /**
   * @param string
   * @param string
   * @return
   */
  concatenateNumber(actualNumber: string, concatNumber: string): string {

    if (actualNumber === '0' || actualNumber === null) {
      actualNumber = '';
    }


    if (concatNumber === '.' && actualNumber === '') {
      return '0.';
    }


    if (concatNumber === '.' && actualNumber.indexOf('.') > -1) {
      return actualNumber;
    }

    return actualNumber + concatNumber;
  }

  /**
   * @param string
   * @return
   */
  setOperation(operation: string): void {

    if (this.operation === null) {
      this.operation = operation;
      return;
    }


    if (this.number2 !== null) {
      this.result = this.CalculatorService.calculate(
        parseFloat(this.number1),
        parseFloat(this.number2),
        this.operation);
      this.operation = operation;
      this.number1 = this.result.toString();
      this.number2 = null;
      this.result = null;
    }
  }

  /**
   * @return
   */
  calculate(): void {
    if (this.number2 === null) {
      return;
    }

    this.result = this.CalculatorService.calculate(
      parseFloat(this.number1),
      parseFloat(this.number2),
      this.operation);
  }

  /**
   * @return
   */
  get display(): string {
    if (this.result !== null) {
      return this.result.toString();
    }
    if (this.number2 !== null) {
      return this.number2;
    }
    return this.number1;
  }

}
