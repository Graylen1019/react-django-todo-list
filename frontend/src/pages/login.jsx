import { Form } from "../components/form";

export const Login = () => {
  return <Form route={"/api/token/"} method="login" />;
};
