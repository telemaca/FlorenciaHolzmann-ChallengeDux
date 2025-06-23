import User from "./User";

type ValidationResult = {
  isValid: boolean;
  errors: {
    [key in keyof User]?: string;
  };
};

export default ValidationResult;
