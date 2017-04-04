import { Injectable } from '@angular/core';
import { MetricsData } from './databank.model';
import { Http, Headers } from '@angular/http';

declare const localStorage: any;

export interface Metric {
  countryName: string;
  countryCode: string;
  seriesName: string;
  seriesCode: string;
  year1960: number;
  year1965: number;
  year1970: number;
  year1975: number;
  year1980: number;
  year1985: number;
  year1990: number;
  year1995: number;
  year2000: number;
  year2005: number;
  year2010: number;
  year2015: number;
  value?: number;
  name?: string;
}

export interface MetricType {
  code: string,
  format: string
}

export class MetricTypes {
  population: MetricType = {
    code: 'SP.POP.TOTL',
    format: 'number'
  };
  urban: MetricType = {
    code: 'SP.URB.TOTL.IN.ZS',
    format: 'percent'
  };
  rural: MetricType = {
    code: 'SP.RUR.TOTL.ZS',
    format: 'percent'
  };
  gdp: MetricType = {
    code: 'NY.GDP.MKTP.CD',
    format: 'currency'
  };
  migration: MetricType = {
    code: 'SM.POP.NETM',
    format: 'number'
  };
}

export class Query {
  limit: number = 10;
  metric: string = 'population';
  relative: string = 'top';
  display: string = 'list';
}

@Injectable()
export class DatabankService {
  private data: Metric[] = MetricsData;

  constructor(private http: Http) {}

  queryAll(code, sort, limit = 216) {
    return this.data
      .slice()
      .filter(item => item.seriesCode === code)
      .filter(item => item.year2015)
      .sort((a, b) => {
        if (sort === 'last') {
          return (a.year2015 - b.year2015);
        } else {
          return b.year2015 - a.year2015;
        }
      })
      .slice(0, limit)
      .map(item => {
        item.name = item.countryName;
        item.value = item.year2015;
        return item;
      });
  }

  queryCountry(code, country) {
    let item = this.data
      .slice()
      .find(item => item.countryCode === country && item.seriesCode === code);

    let items = [];
    for (let prop of Object.keys(item)) {
      if (prop.indexOf('year') === 0) {
        items.push({
          name: prop.substr(4),
          value: item[prop]
        });
      }
    }
    return items;
  }

  command(text) {
    const sessionId = localStorage.getItem('sessionId');
    const bearerId = localStorage.getItem('bearerId');
    return this.http.get(`/api/query?v=20150910&query=${text}` +
    `&lang=en&sessionId=${sessionId}`, {
      headers: new Headers({
        Authorization: `Bearer ${bearerId}`
      })
    });
  }
}
