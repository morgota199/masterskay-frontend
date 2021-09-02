export declare namespace FormInputInterface {
  export namespace Class {
    export interface Layout {
      fluid: boolean;
      'has-icon-left': string;
      'has-icon-right': boolean;
      'has-append': boolean;
    }

    export type Input = [
      string,
      {
        valid: boolean;
        invalid: boolean;
      },
    ];
    export type LeftIcon = [
      {
        clickable: boolean;
      },
    ];
  }

  export namespace Style {
    export interface Layout {
      'max-width': string;
    }
  }
}
