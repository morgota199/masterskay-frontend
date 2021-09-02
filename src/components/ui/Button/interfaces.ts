export namespace ButtonInterface {
  export namespace Props {
    export type Size = 'big' | 'medium' | 'small';
    export type Type =
      | 'primary'
      | 'success'
      | 'warning'
      | 'danger'
      | 'info'
      | 'basic'
      | 'white'
      | 'transparent';
  }

  export type Class = [
    Props.Size,
    Props.Type,
    {
      'is-icon': boolean;
      'no-border': boolean;
      rounded: boolean;
      fluid: boolean;
    },
  ];

  export interface Style {
    minHeight?: string;
    maxWidth?: string;
  }
}
