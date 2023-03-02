import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDatepicker,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { Location } from '@angular/common';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { DialogData } from 'src/app/core/models/dialog-data.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay, map, tap } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  isEditing = false;
  passwordIsSameConfirmPassword = true;
  showIconAndHintDtBorn = false;
  @ViewChild(MatDatepickerToggle) dtBornToggle!: MatDatepickerToggle<any>;
  //@Output("dtBornToggle") dtBornToggle : any;

  form = this.fb.group({
    cpf: ['', [Validators.required]],
    dtBorn: [Date, [Validators.required]],
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    genre: ['M', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  goBack(): void {
    this.location.back();
  }
  resetForm(): void {
    this.form.reset();
  }

  create(): void {
    const { valid, value } = this.form;

    if (valid) {
      const user: User = {
        name: value.name,
        genre: value.genre,
        cpf: value.cpf,
        email: value.email,
        password: value.password,
        dtBorn: value.dtBorn
      } as unknown as User;

      this.userService.create(user).subscribe(
        (response) => {
          this.snackBar.open('User was create! ' + response.email, '', {
            duration: 3000,
            verticalPosition: 'top',
          }),
            this.goBack();
        },
        (responseErros) => {
          this.snackBar.open(
            'User was not create! Please contact support.',
            '',
            {
              duration: 3000,
              verticalPosition: 'top',
            }
          );
        }
      );
    } else {
      //this.showErrorMsg();
    }
  }

  update(): void {}
  validateEmail(): void {
   const  existByEmail =
    this.userService.getByEmail(this.form.get('email')?.value+'')
    if(existByEmail){
      this.snackBar.open('Email has been created! ', '', {
        duration: 3000,
        verticalPosition: 'top',
      })
    }

  }
  validateConfirmPassword(): void {
    this.passwordIsSameConfirmPassword =
      this.form.get('password')?.value ===
      this.form.get('confirmPassword')?.value;
  }
  focusOnFieldDtBorn(): void {
    this.showIconAndHintDtBorn = !this.showIconAndHintDtBorn;
  }
}
