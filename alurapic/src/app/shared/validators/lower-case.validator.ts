import { AbstractControl } from '@angular/forms';

export function lowerCaseValidator(control: AbstractControl) { // todo validador recebe AbstractControl

    if(control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)) {
        return { lowerCase: true } // lowerCase este é o nome que deve estar no template
    }
    return null;
} 