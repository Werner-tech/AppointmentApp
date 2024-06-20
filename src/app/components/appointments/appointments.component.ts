import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Appointment } from 'src/app/models/Appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { EditAppointmentDialogComponent } from '../app-edit-appointment-dialog/app-edit-appointment-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  loading: boolean = false;
  username: string = '';
  usernameInitial: string = '';

  constructor(
    private appointmentService: AppointmentService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    this.usernameInitial = this.username.charAt(0).toUpperCase();
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.loading = true;
    this.appointmentService.getAppointments().subscribe(
      data => {
        if (this.username !== 'admin') {
          this.appointments = data.filter(appointment => appointment.clientName === this.username);
        } else {
          this.appointments = data;
        }
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

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    this.router.navigate(['/']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
