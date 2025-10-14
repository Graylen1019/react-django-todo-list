import { Form } from "../components/form";

export const Register = () => {
  return <Form route={"/api/user/register/"} method="register" />;
};
