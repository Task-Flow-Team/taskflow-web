export interface Alert {
  severity: 'success' | 'info' | 'warn' | 'error';
  summary?: string;
  detail: string;
  life?: number;
  sticky?: boolean;
  closable?: boolean;
  data?: any;
  id?: string;
  key?: string;
  icon?: string;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}
