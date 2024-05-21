import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import ButtonAuth from "../../components/auth/ButtonAuth";
import ContainerAuth from "../../components/auth/ContainerAuth";
import GenderCheckbox from "../../components/auth/GenderCheckbox";
import InputGroup from "../../components/auth/InputGroup";
import Link from "../../components/auth/Link";
import { signupProperties } from "../../lib/authProperties";
import { useAuth, useDataUser, useSignup } from "../../zustand/authStore";
import { AuthResponse } from "../../types/authResponse";

export default function Signup() {
  const { formDataSignup, setFormDataSignup } = useSignup();
  const { setErrorMsg } = useAuth();
  const { setData } = useDataUser();
  const [loading, setLoading] = useState<boolean>(false);
  const baseUrl = import.meta.env.VITE_BE_URL;

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const properties = Object.keys(formDataSignup);
      const isFills = properties.filter(
        (e) => formDataSignup[e as keyof typeof formDataSignup] === ""
      );

      if (isFills.length > 0) {
        setErrorMsg("Please fill all the fields");
        return;
      }

      if (formDataSignup.password !== formDataSignup.confirmPassword) {
        setErrorMsg("Password does not match");
        return;
      }

      if (formDataSignup.password.length < 6) {
        setErrorMsg("Password must be at least 6 characters long");
        return;
      }

      properties.forEach((key) => {
        formDataSignup[key as keyof typeof formDataSignup].trim();
      });
      const response = await fetch(baseUrl + "/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataSignup),
      });

      const data: AuthResponse = await response.json();
      if (data.status === "failed") {
        setErrorMsg(data.message);
        return;
      }

      setData(data.token!);
    } catch (error) {
      setErrorMsg("Internal server error!");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setErrorMsg("");
      }, 1500);
    }
  };

  return (
    <ContainerAuth title="Signup" handleSubmit={handleSignup}>
      {signupProperties.map((e, i) => (
        <InputGroup
          formData={formDataSignup}
          setFormData={setFormDataSignup}
          key={e.label}
          label={e.label}
          name={e.name}
          placeHolder={e.placeHolder}
          type={e.type}
          className={i > 0 ? "mt-2" : ""}
        />
      ))}

      <GenderCheckbox />

      <Link href="/login">Have an a account?</Link>

      <ButtonAuth disabled={loading}>
        {loading ? <ImSpinner2 className="animate-spin" /> : "Signup"}
      </ButtonAuth>
    </ContainerAuth>
  );
}
