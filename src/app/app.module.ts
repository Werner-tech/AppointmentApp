import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppointmentService } from './services/appointment.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { EditAppointmentDialogComponent } from './components/app-edit-appointment-dialog/app-edit-appointment-dialog.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

@NgModule({ declarations: [
        AppComponent,
        EditAppointmentDialogComponent,
        AppointmentsComponent,
        SpinnerComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatFormFieldModule,
        MatTableModule,
        MatIconModule,
        FormsModule,
        MatProgressSpinnerModule], providers: [AppointmentService, provideCharts(withDefaultRegisterables()), provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }