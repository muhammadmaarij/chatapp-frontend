"use client";
import InputField from "../../../InputField/InputField";
import Button from "../../../Button/Button";
import styles from "./Signup.module.scss";
import { SignupProps } from "@/types/components/types";
import { useSignupForm } from "@/hooks/auth/useSignupForm";

export default function Signup({ onSignupComplete }: SignupProps) {
  const {
    formData,
    errors,
    passwordStrength,
    isPending,
    handleChange,
    handleSubmit,
  } = useSignupForm(onSignupComplete);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <InputField
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />
      <InputField
        type="text"
        name="display_name"
        placeholder="Display Name"
        value={formData.display_name}
        onChange={handleChange}
      />
      <InputField
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <InputField
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        showStrength
        passwordStrength={passwordStrength}
      />
      <Button type="submit" isLoading={isPending}>
        Signup
      </Button>
    </form>
  );
}
