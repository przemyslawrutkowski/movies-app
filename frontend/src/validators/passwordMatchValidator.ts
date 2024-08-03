import { FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export default function passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const formGroup = control as FormGroup;
        return formGroup.get('password')?.value === formGroup.get('passwordConfirm')?.value
            ? null : { 'mismatch': true };
    };
}