export interface IValidationRules {
  required?: string;
  [key: string]: any;
}

export interface IFormField {
  id: string;
  name: string;
  label: string;
  type: string;
  placeholder: string;
  isRequired: boolean;
  validationRules: IValidationRules;
  options: any[] | null;
  rowNumber: number;
  order: number;
  formId: string;
  sectionId: string;
}

export interface IFormSection {
  id: string;
  title: string;
  description: string;
  order: number;
  formId: string;
  fields: IFormField[];
}

export interface IForm {
  id: string;
  name: string;
  description: string;
  categoryId: string | null;
  sections: IFormSection[];
}
