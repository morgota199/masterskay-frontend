import { VueConstructor } from 'vue/';

export declare namespace TabsInterface {
  export namespace Props {
    export interface Tab {
      title: string;
      icon: string;
      tooltipText?: string;
      component: VueConstructor;
    }
  }
}
