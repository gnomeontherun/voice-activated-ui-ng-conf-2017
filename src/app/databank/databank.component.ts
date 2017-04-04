import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { DatabankService, Metric, MetricType, MetricTypes, Query } from './databank.service';

@Component({
  selector: 'app-databank',
  templateUrl: './databank.component.html',
  styleUrls: ['./databank.component.css'],
  providers: [
    DatabankService
  ]
})
export class DatabankComponent implements OnInit {
  metric: MetricType;
  subscription: FirebaseListObservable<any[]>;
  query = new Query();
  metrics = new MetricTypes();
  items: Metric[] = [];
  init: boolean = false;
  loading: boolean = false;
  result: string = '';
  command: string = '';
  mode: string = 'list';
  scheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  page: number = 1;

  constructor(
    private af: AngularFire,
    private databankService: DatabankService
  ) {}

  // Setup the subscription on init
  ngOnInit() {
    this.subscription = this.af.database.list('requests', {
      query: {
        orderByChild: 'timestamp',
        limitToLast: 1
      }
    });
    this.subscription.subscribe(res => {
      console.log(res);
      if (res[0] && res[0].result.action === 'databank-display') {
        const result = res[0].result;
        this.metric = this.metrics[result.parameters.metric];
        if (this.init) {
          this.loading = true;
          this.result = result;

          setTimeout(() => {
            if (result.parameters.country) {
              this.items = this.databankService.queryCountry(this.metric.code, result.parameters.country['alpha-3']);
              result.parameters.display = 'chart';
            } else {
              this.items = this.databankService.queryAll(
                this.metric.code,
                result.parameters.relative,
                result.parameters.limit || 20
              );
            }
            this.page = 1;
            this.loading = false;
            this.mode = (result.parameters.display) ? result.parameters.display : 'list';
          }, 3000);
        }
        this.init = true;
      }
    });
  }

  onCommand(event) {
    event.preventDefault();
    this.databankService.command(this.command).subscribe(response => {
      this.command = '';
    });
  }

  try(event) {
    this.command = event.target.innerText;
    this.onCommand(event);
  }

  toggleMode() {
    if (this.mode === 'list') {
      this.mode = 'chart';
    } else {
      this.mode = 'list';
    }
  }
}
