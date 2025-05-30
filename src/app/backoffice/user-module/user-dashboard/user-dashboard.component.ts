import { Component, OnInit } from '@angular/core';
import {StatisticsResponse, UserService, UserStatistics} from '../services/user.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import {NgForOf, NgIf} from '@angular/common';
import {BaseChartDirective} from 'ng2-charts';
import {User} from '../../../shared/interfaces/interfaces.general';

// Register all chart controllers
Chart.register(...registerables);

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  templateUrl: './user-dashboard.component.html',
  imports: [
    NgIf,
    BaseChartDirective,
    NgForOf
  ],
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  stats?: UserStatistics;

  // Chart configurations
  roleChart!: ChartConfiguration;
  registrationChart!: ChartConfiguration;
  pointsChart!: ChartConfiguration;

  // Chart types
  pieChartType: ChartType = 'pie';
  lineChartType: ChartType = 'line';
  barChartType: ChartType = 'bar';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getStatistics().subscribe({
      next: (response: StatisticsResponse) => {
        this.stats = response.statistics;
        this.initCharts();
      },
      error: (err) => console.error('Error loading statistics:', err)
    });
  }

  private initCharts() {
    // Convert object to chart data format
    const convertToChartData = (data: { [key: string]: number }) => ({
      labels: Object.keys(data),
      values: Object.values(data)
    });

    // Role Distribution Pie Chart
    const roles = convertToChartData(this.stats!.roleDistribution);
    this.roleChart = {
      type: 'pie',
      data: {
        labels: roles.labels,
        datasets: [{
          data: roles.values,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
      },
      options: { responsive: true }
    };

    // Registration Trends Line Chart
    this.registrationChart = {
      type: 'line',
      data: {
        labels: this.stats!.registrationTrends.map(t => `${t.month}/${t.year}`),
        datasets: [{
          label: 'Registrations',
          data: this.stats!.registrationTrends.map(t => t.count),
          borderColor: '#4CAF50',
          tension: 0.3
        }]
      },
      options: { responsive: true }
    };

    // Loyalty Points Bar Chart
    this.pointsChart = {
      type: 'bar',
      data: {
        labels: ['Average', 'Max', 'Min'],
        datasets: [{
          label: 'Points',
          data: [
            this.stats!.loyaltyPoints.average,
            this.stats!.loyaltyPoints.maximum,
            this.stats!.loyaltyPoints.minimum
          ],
          backgroundColor: '#2196F3'
        }]
      },
      options: { responsive: true }
    };
  }


}
