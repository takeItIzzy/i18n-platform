import * as React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import EyeOpen from 'public/icons/eye-open.svg';
import EyeClose from 'public/icons/eye-close.svg';

const FormContext = React.createContext<{
  register: UseFormReturn['register'];
  errors: UseFormReturn['formState']['errors'];
  watch: UseFormReturn['watch'];
}>(null);

const useFormContext = () => React.useContext(FormContext);

interface IFormProps {
  children: React.ReactNode;
  onSubmit: (data: any) => void;
  loading: boolean;
}

const Form = (props: IFormProps) => {
  const { onSubmit, children, loading } = props;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submitDisabled = Object.keys(errors).length > 0 || loading;

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
            className={`rounded-[6px] text-white button-padding cursor-pointer${
              submitDisabled ? ' bg-red-300 cursor-not-allowed' : ' bg-red-500'
            }`}
            type="submit"
            value={loading ? 'Loading...' : 'Submit'}
            disabled={submitDisabled}
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

  const [viewPassword, setViewPassword] = React.useState(false);

  const { register, errors } = useFormContext();

  const Eye = viewPassword ? EyeClose : EyeOpen;

  return (
    <div className={`relative ${className ?? ''}`}>
      {!!label && <label>{name}: </label>}
      <div className="relative">
        <input
          className={`block border border-gray-500 w-[300px] rounded-[6px] button-padding${
            type === 'password' ? ' pr-[32px]' : ''
          }`}
          type={type === 'password' && viewPassword ? 'text' : type}
          placeholder={placeholder}
          {...register(name, {
            required: {
              value: required,
              message: 'This field is required.',
            },
            ...(!!maxLength && {
              maxLength: {
                value: maxLength,
                message: `Max length is ${maxLength}.`,
              },
            }),
          })}
        />
        {type === 'password' && (
          <Eye
            className="absolute top-[7px] right-[6px] cursor-pointer"
            onClick={() => setViewPassword((prev) => !prev)}
          />
        )}
      </div>
      {!!errors[name] && (
        <div className="text-red-500 text-xs absolute -bottom-[20px]">{errors[name].message}</div>
      )}
    </div>
  );
};
Form.Input = Input;

export default Form;
