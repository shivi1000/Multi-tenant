declare module 'hot-shots' {
    interface StatsDConfig {
      host?: string;
      port?: number;
      prefix?: string;
      suffix?: string;
      globalTags?: string[];
      mock?: boolean;
      globalize?: boolean;
      cacheDns?: boolean;
      sampleRate?: number;
      errorHandler?: (error: Error) => void;
      useDefaultRoute?: boolean;
      protocol?: 'udp' | 'tcp' | 'uds';
      udsGracefulErrorHandling?: boolean;
      udsGracefulRestart?: boolean;
      bufferFlushInterval?: number;
      maxBufferSize?: number;
    }
  
    interface IncrementOptions {
      tags?: string[];
    }
  
    interface TimingOptions {
      tags?: string[];
    }
  
    interface GaugeOptions {
      tags?: string[];
    }
  
    class StatsD {
      constructor(options?: StatsDConfig);
  
      timing(stat: string | string[], time: number, options?: TimingOptions): void;
      increment(stat: string | string[], options?: IncrementOptions): void;
      increment(stat: string | string[], value: number, options?: IncrementOptions): void;
      decrement(stat: string | string[], options?: IncrementOptions): void;
      decrement(stat: string | string[], value: number, options?: IncrementOptions): void;
      histogram(stat: string | string[], time: number, options?: TimingOptions): void;
      gauge(stat: string | string[], value: number, options?: GaugeOptions): void;
      set(stat: string | string[], value: number, options?: GaugeOptions): void;
      unique(stat: string | string[], value: number, options?: GaugeOptions): void;
      close(): void;
    }
  
    export = StatsD;
  }
  