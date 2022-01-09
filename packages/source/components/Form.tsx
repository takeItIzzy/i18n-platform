import * as React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

const FormContext = React.createContext<{
  register: UseFormReturn['register'];
  errors: UseFormReturn['formState']['errors'];
  watch: UseFormReturn['watch'];
}>(null);

const useFormContext = () => React.useContext(FormContext);

interface IFormProps {
  children: React.ReactNode;
  onSubmit: (data: any) => void;
}

const Form = (props: IFormProps) => {
  const { onSubmit, children } = props;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <FormContext.Provider
      value={{
        register,
        errors,
        watch,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {children}
        <div className="flex justify-end">
          <input
            className="rounded-[6px] bg-red-300 text-white button-padding cursor-pointer"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </FormContext.Provider>
  );
};

interface IInputProps {
  name: string;
  type?: string;
  className?: string;
  label?: boolean;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
}

const Input: React.FC<IInputProps> = (props) => {
  const { name, label, className, placeholder, type = 'text', required = false, maxLength } = props;

  const { register } = useFormContext();

  // todo add view password
  return (
    <div className={className}>
      {!!label && <label>{name}</label>}:
      <input
        className="block border border-gray-500 w-[300px] rounded-[6px] button-padding"
        type={type}
        placeholder={placeholder}
        {...register(name, {
          required,
          ...(!!maxLength && { maxLength }),
        })}
      />
    </div>
  );
};
Form.Input = Input;

export default Form;
