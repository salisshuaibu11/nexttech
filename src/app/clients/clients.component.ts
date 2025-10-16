import {Component, OnInit, signal} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import Chart from "chart.js/auto";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    MatCard,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit {
  selectedChatPeriods = signal('12 months');
  chartPeriods = [
    { label: '12 months', active: false },
    { label: '3 months', active: false },
    { label: '30 days', active: false },
    { label: '7 days', active: false }
  ];

  chart: any = [];

  constructor() {
  }

  ngOnInit() {
    this.createTrendClientChart()
  }

  createTrendClientChart() {
    const ctx = document.getElementById('trendClientCanvas') as HTMLCanvasElement;
    const chartCtx = ctx.getContext('2d');

    if (!chartCtx) return;

    const gradient = chartCtx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(118,156,218,0.2)');
    gradient.addColorStop(1, 'rgba(59,130,246,0)');

    this.chart = new Chart(chartCtx, {
      type: 'line',
      data: {
        labels: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        datasets: [
          {
            label: 'Clients',
            data: [600, 620, 500, 640, 660, 600, 720, 440, 780, 500, 800, 400],
            borderColor: '#2E90FA',
            backgroundColor: gradient,
            tension: 0.4,
            borderWidth: 2,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#2E90FA',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: '#3b82f6',
            titleColor: '#fff',
            bodyColor: '#fff',
            displayColors: false,
            padding: 8,
            cornerRadius: 6,
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: '#6B7280',
              font: { size: 12 }
            }
          },
          y: {
            beginAtZero: true,
            max: 1000,
            ticks: {
              stepSize: 200,
              color: '#6B7280',
              font: { size: 12 }
            },
            grid: { color: '#F3F4F6' },
          },
        },
      },
    });
  }
}
