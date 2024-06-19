import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Appointment } from 'src/app/models/Appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { EditAppointmentDialogComponent } from '../app-edit-appointment-dialog/app-edit-appointment-dialog.component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {

  appointments: Appointment[] = [];
  loading: boolean = false;

  constructor(
    private appointmentService: AppointmentService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.loading = true;
    this.appointmentService.getAppointments().subscribe(
      data => {
        this.appointments = data;
        this.loading = false;
      },
      error => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  editAppointment(appointment: Appointment): void {
    const dialogRef = this.dialog.open(EditAppointmentDialogComponent, {
      data: {
        appointment: appointment,
        title: 'Edit Appointment'
      }
    });
  
    dialogRef.afterClosed().subscribe((result: Appointment) => {
      if (result) {
        this.appointmentService.updateAppointment(result.id, result).subscribe(
          () => this.loadAppointments(),
          error => console.error(error)
        );
      }
    });
  }
  
  openAddModal(): void {
    const newAppointment = {};
    const dialogRef = this.dialog.open(EditAppointmentDialogComponent, {
      data: {
        appointment: newAppointment,
        title: 'Add Appointment'
      }
    });
  
    dialogRef.afterClosed().subscribe((result: Appointment) => {
      if (result) {
        this.appointmentService.createAppointment(result).subscribe(
          () => this.loadAppointments(),
          error => console.error(error)
        );
      }
    });
  }


  deleteAppointment(id: number): void {
    this.appointmentService.deleteAppointment(id).subscribe(
      () => this.loadAppointments(),
      error => console.error(error)
    );
  }
}
