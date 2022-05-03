interface MyPaswordProps {
  value: string;
  name: string;
  helperText: string;
  label: string;
  error: boolean;
  show: boolean;
  handleChange: (event: React.ChangeEvent<HTMLElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLElement>) => void;
  handleShow: (event: React.MouseEvent<HTMLElement>) => void;
}

export default MyPaswordProps;
