export declare namespace TooltipInterface {
  export namespace Props {
    export type textAlign = 'start' | 'center' | 'end' | 'justify';
    export type Position = 'top' | 'left' | 'right' | 'bottom';
    export type Justify = 'start' | 'center' | 'end';
  }

  export type Class = [
    Props.Position,
    Props.Justify,
    {
      dark: boolean;
    },
  ];
  export type Style = {
    maxWidth: string;
    minWidth: string;
  };
}
