import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Appointment } from '../models/Appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  // private apiUrl = 'https://localhost:7003/api/Appointments';
  private apiUrl = 'https://appointmentapibackend.azurewebsites.net/api/Appointments';

  constructor(private http: HttpClient) { }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  getAppointment(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointment);
  }

  updateAppointment(id: number, appointment: Appointment): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, appointment);
  }

  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getDashboardAppointments(): Observable<{ upcoming: Appointment[], completed: Appointment[] }> {
    return this.http.get<Appointment[]>(this.apiUrl).pipe(
      map(appointments => {
        const today = new Date();
        const upcomingAppointments = appointments.filter(appointment => new Date(appointment.appointmentDate) > today);
        const completedAppointments = appointments.filter(appointment => new Date(appointment.appointmentDate) < today);
        return { upcoming: upcomingAppointments, completed: completedAppointments };
      })
    );
  }
}