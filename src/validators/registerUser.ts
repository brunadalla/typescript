import * as yup from 'yup';

export const schema = yup.object({
  email: yup
    .string()
    .email('Email é obrigatório')
    .required('Email é obrigatório'),
  password: yup.string().required('Email é obrigatório'),
});
