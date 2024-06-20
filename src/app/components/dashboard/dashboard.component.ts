import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/models/Appointment.model';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [BaseChartDirective, CommonModule, MatButtonModule, MatToolbarModule],
  standalone: true
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  upcomingAppointments: Appointment[] = [];
  completedAppointments: Appointment[] = [];
  allAppointments: Appointment[] = [];
  username: string = '';
  usernameInitial: string = '';

  showTotalList: boolean = false;
  showUpcomingList: boolean = false;
  showCompletedList: boolean = false;

  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> | undefined;
  public barChartData: ChartData<'bar'> | undefined;
  public pieChartType: string = 'pie';

  constructor(private router: Router, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    this.usernameInitial = this.username.charAt(0).toUpperCase();
    this.fetchDashboardData();
  }

  navigateToAppointments(): void {
    this.router.navigate(['/appointments']);
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    this.router.navigate(['/']);
  }

  fetchDashboardData(): void {
    this.appointmentService.getDashboardAppointments().subscribe(
      data => {
        if (this.username !== 'admin') {
          this.upcomingAppointments = data.upcoming.filter(appointment => appointment.clientName === this.username);
          this.completedAppointments = data.completed.filter(appointment => appointment.clientName === this.username);
        } else {
          this.upcomingAppointments = data.upcoming;
          this.completedAppointments = data.completed;
        }
        this.allAppointments = [...this.upcomingAppointments, ...this.completedAppointments];

        this.pieChartData = {
          labels: ['Upcoming Appointments', 'Completed Appointments'],
          datasets: [
            {
              data: [this.upcomingAppointments.length, this.completedAppointments.length],
              backgroundColor: [
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 99, 132, 0.8)',
              ],
              hoverOffset: 4
            },
          ],
        };

        this.barChartData = {
          labels: ['Appointment Stats'],
          datasets: [
            {
              data: [this.upcomingAppointments.length], label: 'Upcoming Appointments',
              backgroundColor: 'rgba(255, 159, 64, 0.8)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 1
            },
            {
              data: [this.completedAppointments.length], label: 'Completed Appointments', backgroundColor: 'rgba(75, 192, 192, 0.8)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            },
          ],
        };

        if (this.chart) {
          this.chart.update();
        }
      },
      error => {
        console.error('Error fetching dashboard data', error);
      }
    );
  }

  showList(type: string): void {
    if (type === 'total') {
      this.showTotalList = true;
    } else if (type === 'upcoming') {
      this.showUpcomingList = true;
    } else if (type === 'completed') {
      this.showCompletedList = true;
    }
  }

  hideList(type: string): void {
    if (type === 'total') {
      this.showTotalList = false;
    } else if (type === 'upcoming') {
      this.showUpcomingList = false;
    } else if (type === 'completed') {
      this.showCompletedList = false;
    }
  }
}
