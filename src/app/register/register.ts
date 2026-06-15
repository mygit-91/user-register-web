import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Occupations, UserModel } from '../models/register.model';
import { ApiService } from '../services/api.services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private apiService = inject(ApiService);
  maxToday: string = new Date().toISOString().split('T')[0];
  fileName: string = '';
  profileBase64 = '';

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(10),]),
    profile: new FormControl('', [Validators.required]),
    birthDay: new FormControl('', [Validators.required]),
    occupation: new FormControl('', [Validators.required]),
    sex: new FormControl('', [Validators.required]),
  });

  occupations: Occupations[] = [
    { id: 1, name: 'Student' },
    { id: 2, name: 'Office Worker' },
    { id: 3, name: 'Freelance' },
  ];

  onProfileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      // Set up the callback to trigger when reading completes
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64String = e.target.result;
        this.profileBase64 = base64String;
      };

      // Read the image file as a data URL (Base64)
      reader.readAsDataURL(file);
    }
  }

  // Action executed upon submission
  onSubmit() {
    if (this.registerForm.valid) {
      const userData: UserModel = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        phone: this.registerForm.value.phone,
        profile: this.profileBase64,
        birthDay: this.registerForm.value.birthDay,
        occupation: this.registerForm.value.occupation,
        sex: this.registerForm.value.sex,
      };

      this.apiService.addUser(userData).subscribe({
        next: (response) => {
          window.alert('Data successfully saved and user id : ' + response.userId);
          this.onClear();
        },
        error: (err) => {
          window.alert(err);
          //console.error('API execution failed:', err);
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
      //console.log('Form is invalid. Please check fields.');
    }
  }

  onClear() {
    this.registerForm.reset();
    this.registerForm.get('occupation')?.setValue('');
    this.fileName = '';
    this.profileBase64 = '';
  }
}
