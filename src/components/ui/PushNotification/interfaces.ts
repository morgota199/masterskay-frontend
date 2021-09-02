export namespace IPushNotification {
  export type Type = 'primary' | 'success' | 'warning' | 'danger';

  export type Icon = 'info' | 'warning';
  export interface Icons {
    [key: string]: Icon;
  }

  export interface Model {
    text: string;
    type: Type | '';
  }
}
