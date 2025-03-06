"use client";
import InputField from "../../../InputField/InputField";
import Button from "../../../Button/Button";
import styles from "./Login.module.scss";
import { useLoginForm } from "@/hooks/auth/useLoginForm";

export default function Login() {
  const { formData, isPending, handleChange, handleSubmit } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <InputField
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
      />
      <InputField
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <Button type="submit" isLoading={isPending}>
        Login
      </Button>
    </form>
  );
}
