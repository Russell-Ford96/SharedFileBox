import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

export function matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
  return (group: FormGroup) => {
    let password = group.controls[passwordKey];
    let confirmPassword = group.controls[confirmPasswordKey];
    
    if (password.value !== confirmPassword.value) {
        return confirmPassword.setErrors({mismatchedPasswords: true});
    } else {
        return confirmPassword.setErrors(null);
    }
  }
}
