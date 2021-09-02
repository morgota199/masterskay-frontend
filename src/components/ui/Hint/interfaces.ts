export declare namespace HintInterface {
  export namespace Props {
    export type Type = 'primary' | 'success' | 'warning' | 'danger' | 'info';
  }

  export type Icon = 'icon-i' | 'success-icon' | 'warning-icon' | 'danger-icon';

  export type Icons = {
    [key in Props.Type]: Icon;
  };
}
