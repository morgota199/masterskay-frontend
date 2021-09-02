export declare namespace IFormCheckboxSelect {
  export interface Class {
    disabled: boolean;
  }

  export interface Item {
    _id: string;
    name: string;
    checked: boolean;
  }

  export interface Props {
    icon: string;
    items: string[];
    placeholder: string;
    disabled: boolean;
  }
}
