import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

interface UseFormProps {
  action: ActionCreatorWithPayload<any>;
}

interface IsValidType {
  email: boolean;
  password: boolean;
  passwordCheck?: boolean;
}

export const useForm = (props: UseFormProps) => {
  const { action } = props;
  const dispatch = useDispatch();

  const [isValid, setIsValid] = useState<IsValidType>({
    email: true,
    password: true,
    passwordCheck: true,
  });

  const checkField = (name: keyof IsValidType, e: any) => {
    const emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    const pwRegex = new RegExp('(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,15}');

    if (name === 'email') {
      return emailRegex.test(e.target.value);
    } else if (name === 'password' || name === 'passwordCheck') {
      return pwRegex.test(e.target.value);
    }
  };

  const onChangeField = (name: keyof IsValidType, e: ChangeEvent<HTMLInputElement>) => {
    const isValid = checkField(name, e);

    setIsValid((prev) => ({
      ...prev,
      [name]: isValid,
    }));

    dispatch(action({ key: name, value: e.target.value }));
  };

  return {
    onChangeField,
    isValid,
  };
};
