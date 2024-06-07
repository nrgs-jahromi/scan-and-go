type NavbarItem = {
  id: string;
  category_id: string;
  label: string;
  path: string;
};

type NavbarCategory = {
  id: string;
  label: string;
  path?: string;
  //   icon1: ReactNode;
  //   icon2: ReactNode;
  options?: NavbarItem[] | undefined;
};

type FormPart = {
  id: string;
  name: string;
  sections: number[];
};

type StepT = {
  name: string;
  icon: JSX.Element;
  form: JSX.Element;
};

type FormT = {
  name: string;
  db_id: string;
  multiPart: boolean;
  parts?: FormPart[];
  // sections:
};

// type FormLayoutT = {
//   max_width: number;
//   direction: string;
//   sections: {
//     name: string;
//     rows: {
//       fields: {
//         id: string;
//         styles?: StylesT;
//         css_id: string | null;
//         css_class_name: string | null;
//       }[];
//     }[];
//   }[];
// };
