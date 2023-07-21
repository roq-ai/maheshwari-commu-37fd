import * as yup from 'yup';

export const identityCardValidationSchema = yup.object().shape({
  verified: yup.boolean(),
  user_id: yup.string().nullable(),
});
