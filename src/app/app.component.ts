import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle";
import { PendingLoansComponent } from "./pending-loans/pending-loans.component";
import { MatGridList, MatGridTile } from "@angular/material/grid-list";

import Chart from 'chart.js/auto';
import {GrossLoanPortfolioComponent} from "./gross-loan-portfolio/gross-loan-portfolio.component";
import {ClientsComponent} from "./clients/clients.component";
import {PendingDisbursalComponent} from "./pending-disbursal/pending-disbursal.component";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerInputEvent, MatDatepickerModule} from "@angular/material/datepicker";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatMenuModule,
    MatChipsModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatGridList,
    MatGridTile,
    PendingLoansComponent,
    PendingDisbursalComponent,
    GrossLoanPortfolioComponent,
    ClientsComponent,

    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'nextcba';
  selectedPeriod = 'This month';
  selectedDateRange: string | null = null;

  trendChart: any = [];
  trendDownChart: any = [];
  chart: any = [];

  parValue = 35;

  constructor() { }

  ngOnInit() {
    this.createGaugeChart();
    this.createTrendChart();
    this.createTrendDownChart();
  }

  createTrendDownChart() {
    const ctx = document.getElementById('trend-down-canvas') as HTMLCanvasElement;
    const chartCtx = ctx.getContext('2d');

    if (!chartCtx) return;

    const gradient = chartCtx.createLinearGradient(0, 0, 0, 80);
    gradient.addColorStop(0, 'rgba(239, 68, 68, 0.2)');
    gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');

    this.trendDownChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 20 }, (_, i) => i + 1),
        datasets: [
          {
            data: [
              100, 90, 93, 88, 80, 83, 79, 75, 73, 70, 66, 62, 65, 60, 58, 56,
              54, 52, 51, 50,
            ],
            borderColor: '#ef4444',
            backgroundColor: gradient,
            borderWidth: 2,
            fill: true,
            tension: 0.3,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#ef4444',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { display: false },
          y: { display: false },
        },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
      },
    });
  }

  createTrendChart() {
    const ctx = document.getElementById('lineCanvas') as HTMLCanvasElement;
    const chartCtx = ctx.getContext('2d');

    if (!chartCtx) return;

    const gradient = chartCtx.createLinearGradient(0, 0, 0, 80);
    gradient.addColorStop(0, 'rgba(34,197,94,0.2)');
    gradient.addColorStop(1, 'rgba(34,197,94,0)');

    this.trendChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 20 }, (_, i) => i + 1),
        datasets: [
          {
            label: 'Performance',
            data: [10, 15, 20, 25, 40, 28, 32, 35, 40, 38, 42, 45, 50, 70, 52, 55, 60, 62, 55, 70],
            borderColor: '#22c55e',
            backgroundColor: gradient,
            tension: 0.4,
            borderWidth: 2,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#22c55e',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
        scales: {
          x: { display: false },
          y: { display: false },
        },
      },
    });
  }

  createGaugeChart() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Define gauge segments with improved colors matching the image
    const segments = [
      { label: 'Low', color: '#E0F0FF', range: 25 },
      { label: 'Moderate', color: '#A8D5FF', range: 25 },
      { label: 'High', color: '#5BA3E8', range: 25 },
      { label: 'Critical', color: '#0C5CB8', range: 25 }
    ];

    const data = segments.map(s => s.range);
    const backgroundColors = segments.map(s => s.color);
    const totalValue = 100;

    // Enhanced needle plugin
    const needlePlugin = {
      id: 'needlePlugin',
      afterDatasetsDraw: (chart: any) => {
        const { ctx, chartArea: { width, height, left, top } } = chart;

        if (width <= 0 || height <= 0) return;

        // Calculate gauge center and radius
        const cx = left + width / 2;
        const cy = top + height;
        const radius = Math.min(width, height * 2) / 2;

        // Calculate needle angle based on PAR value
        const angle = Math.PI + (this.parValue / totalValue) * Math.PI;

        // Draw needle
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);

        // Needle shaft - thinner and more refined
        ctx.beginPath();
        ctx.moveTo(0, 3);
        ctx.lineTo(radius * 0.65, 0);
        ctx.lineTo(0, -3);
        ctx.fillStyle = '#1F2937';
        ctx.fill();

        ctx.restore();

        // Outer circle at needle base
        ctx.beginPath();
        ctx.arc(cx, cy, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#1F2937';
        ctx.fill();

        // Middle circle
        ctx.beginPath();
        ctx.arc(cx, cy, 7, 0, Math.PI * 2);
        ctx.fillStyle = '#F3F4F6';
        ctx.fill();

        // Inner circle (white center)
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }
    };

    // Create the gauge chart
    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: segments.map(s => s.label),
        datasets: [
          {
            data: data,
            backgroundColor: backgroundColors,
            borderWidth: 0,
            borderRadius: [
              {
                outerStart: 20,
                outerEnd: 0,
                innerStart: 20,
                innerEnd: 0
              },
              0,
              0,
              {
                outerStart: 0,
                outerEnd: 20,
                innerStart: 0,
                innerEnd: 20
              }
            ],
            circumference: 180,
            rotation: 270,
          }
        ]
      },
      options: {
        responsive: true,
        animation: {
          animateRotate: false,
          animateScale: true,
        },
        maintainAspectRatio: true,
        aspectRatio: 2.5,
        layout: {
          padding: 0
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
        cutout: '80%'
      } as any,
      plugins: [needlePlugin]
    });
  }

  selectPeriod(period: string) {
    this.selectedPeriod = period;
  }
}
