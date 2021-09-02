export declare namespace FormRadioInterface {
  export namespace Class {
    export interface Layout {
      fluid: boolean;
    }

    export type Radio = [
      string,
      {
        valid: boolean;
        invalid: boolean;
      },
    ];
  }

  export namespace Style {
    export interface Layout {
      'max-width': string;
    }
  }
}
