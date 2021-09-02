export declare namespace NavInterface {
  export interface Item {
    path: string;
    icon: string;
    text: string;
    coming?: boolean;
  }

  export namespace Mobile {
    export interface ItemClass {
      coming: boolean;
    }
  }
}
