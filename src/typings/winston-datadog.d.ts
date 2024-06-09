// typings/winston-datadog.d.ts
declare module 'winston-datadog' {
    //import * as TransportStream from 'winston-transport';
    import TransportStream = require('winston-transport');
  
    interface DatadogTransportOptions {
      apiKey: string;
      hostname?: string;
      service?: string;
      ddsource?: string;
      ddtags?: any;
    }
  
    class DatadogTransport extends TransportStream {
      constructor(opts: DatadogTransportOptions);
    }
  
    export = DatadogTransport;
  }
