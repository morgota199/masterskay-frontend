export declare namespace IFormCheckbox {
  export type Type =
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'basic';
  export type Class = [
    Type,
    {
      disabled: boolean;
      checked: boolean;
    },
  ];
}
