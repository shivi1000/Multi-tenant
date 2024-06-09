// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import StatsD from 'hot-shots';

// @Injectable()
// export class MetricsService {
//   private dogstatsd: StatsD;

//   constructor(private configService: ConfigService) {
//     this.dogstatsd = new StatsD({
//       host: this.configService.get<string>('DD_TRACE_AGENT_HOSTNAME'),
//       port: this.configService.get<number>('DD_DOGSTATSD_PORT'),
//       //prefix: this.configService.get<string>('DD_METRIC_PREFIX'),
//       //globalTags: <any>{ env: this.configService.get<string>('NODE_ENV', 'development') }
//     });
//   }

//   initializeMetrics() {
//     this.dogstatsd.increment('app.start'); 
//   }

//   incrementCounter(metricName: string, tags?: string[]) {
//     if (tags) {
//       this.dogstatsd.increment(metricName, { tags });
//     } else {
//       this.dogstatsd.increment(metricName);
//     }
//   }

//   // recordTiming(metricName: string, value: number, tags?: string[]) {
//   //   if (tags) {
//   //     this.dogstatsd.timing(metricName, value, { tags });
//   //   } else {
//   //     this.dogstatsd.timing(metricName, value);
//   //   }
//   // }

//   // gaugeMetric(metricName: string, value: number, tags?: string[]) {
//   //   if (tags) {
//   //     this.dogstatsd.gauge(metricName, value, { tags });
//   //   } else {
//   //     this.dogstatsd.gauge(metricName, value);
//   //   }
//   // }
// }
