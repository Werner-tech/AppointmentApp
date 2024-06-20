import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Appointment } from 'src/app/models/Appointment.model';

@Component({
  selector: 'app-edit-appointment-dialog',
  templateUrl: './app-edit-appointment-dialog.component.html',
  styleUrls: ['./app-edit-appointment-dialog.component.css']
})
export class EditAppointmentDialogComponent implements OnInit {
  title: string;
  appointment: Appointment;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<EditAppointmentDialogComponent>
  ) {
    this.title = data.title;
    this.appointment = data.appointment;
  }

  ngOnInit(): void {
    const username = localStorage.getItem('username') || '';
    this.appointment.clientName = username;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(this.appointment);
    } else {
      form.form.markAllAsTouched();
    }
  }
}

interface DialogData {
  appointment: Appointment;
  title: string;
}
