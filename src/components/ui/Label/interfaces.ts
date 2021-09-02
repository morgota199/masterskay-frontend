export declare namespace LabelInterface {
  export type Type =
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'white';
  export type Size = 'big' | 'medium' | 'small';

  export type Class = [
    Type,
    Size,
    {
      fluid: boolean;
      rounded: boolean;
    },
  ];

  export interface Style {
    maxWidth: string;
  }
}
