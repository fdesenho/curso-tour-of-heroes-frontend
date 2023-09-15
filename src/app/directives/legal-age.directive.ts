import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appLegalAge]',
  providers: [{
      provide: NG_VALIDATORS,
      useExisting: LegalAgeDirective,
      multi: true}]
})
export class LegalAgeDirective {

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    console.log("teste");
    const dataNascimento = control.value;
    const anoNascimento = new Date(dataNascimento).getFullYear();
    const anoNascMais18 = anoNascimento + 18;
    const anoAtual = new Date().getFullYear();

    const ehMaior = anoNascMais18 <= anoAtual;

    return ehMaior ? null : {'ageLegal': true};
}
}
