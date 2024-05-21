import { useState } from "react";
import ButtonAuth from "../../components/auth/ButtonAuth";
import ContainerAuth from "../../components/auth/ContainerAuth";
import InputGroup from "../../components/auth/InputGroup";
import Link from "../../components/auth/Link";
import { loginProperties } from "../../lib/authProperties";
import { useAuth, useDataUser, useLogin } from "../../zustand/authStore";
import { ImSpinner2 } from "react-icons/im";
import { AuthResponse } from "../../types/authResponse";

export default function Login() {
  const { setErrorMsg } = useAuth();
  const { formDataLogin, setFormDataLogin } = useLogin();
  const { setData } = useDataUser();
  const [loading, setLoading] = useState<boolean>(false);
  const baseUrl = import.meta.env.VITE_BE_URL;

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const properties = Object.keys(formDataLogin);

      const isFills = properties.filter(
        (e) => formDataLogin[e as keyof typeof formDataLogin] === ""
      );

      if (isFills.length > 0) {
        setErrorMsg("Please fill all the fields");
        return;
      }

      if (formDataLogin.username.length < 5) {
        setErrorMsg("Username must be at least 5 characters long");
        return;
      }

      if (formDataLogin.password.length < 6) {
        setErrorMsg("Password must be at least 6 characters long");
        return;
      }

      properties.forEach((key) => {
        formDataLogin[key as keyof typeof formDataLogin].trim();
      });

      const response = await fetch(baseUrl + "/api/auth/login", {
        method: "POST",
        body: JSON.stringify(formDataLogin),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: AuthResponse = await response.json();

      if (data.status === "failed") {
        setErrorMsg(data.message);
        return;
      }

      setData(data.token!);
    } catch (error) {
      setErrorMsg("Internal Server Error!");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setErrorMsg("");
      }, 1500);
    }
  }

  return (
    <ContainerAuth title="Login" handleSubmit={handleLogin}>
      {loginProperties.map((e, i) => (
        <InputGroup
          formData={formDataLogin}
          setFormData={setFormDataLogin}
          label={e.label}
          name={e.name}
          placeHolder={e.placeHolder}
          type={e.type}
          key={e.label}
          className={i > 0 ? "mt-2" : ""}
        />
      ))}

      <Link href="/signup">Don't have an account?</Link>

      <ButtonAuth disabled={loading}>
        {loading ? <ImSpinner2 className="animate-spin" /> : "Login"}
      </ButtonAuth>
    </ContainerAuth>
  );
}
