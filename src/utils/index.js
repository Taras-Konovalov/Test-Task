import * as yup from "yup";

const phoneRegExp = /^[\+]{0,1}380([0-9]{9})$/;

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .required("This field is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("This field is required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("This field is required"),
});

export const API_URL = {
  POSITIONS: "https://frontend-test-assignment-api.abz.agency/api/v1/positions",
  TOKEN: "https://frontend-test-assignment-api.abz.agency/api/v1/token",
  USERS_POST: "https://frontend-test-assignment-api.abz.agency/api/v1/users",
  USERS_GET:
    "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6",
};
