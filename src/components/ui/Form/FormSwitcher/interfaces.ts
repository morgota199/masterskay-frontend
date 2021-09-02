export declare namespace FormSwitcherInterface {
  export namespace Props {
    export type Type =
      | 'primary'
      | 'success'
      | 'warning'
      | 'danger'
      | 'info'
      | '';

    export type Size = 'small' | 'medium' | 'big';
  }
  export type Class = [
    Props.Size,
    Props.Type,
    {
      disabled: boolean;
      active: boolean;
    },
  ];
}
