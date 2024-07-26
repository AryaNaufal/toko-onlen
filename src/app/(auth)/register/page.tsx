"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/src/components/Elements/Button";
import { Input } from "@/src/components/Elements/input";
import { BiUser, BiKey } from "react-icons/bi";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setIsSubmit(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setIsSubmit(false);
    if (!res.ok) {
      alert("Register failed");
    } else if (email == "" || password == "") {
      alert("Email dan Password does not empty");
    } else {
      alert("Register success");
      router.push("/login");
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="flex flex-col gap-4 items-center"
    >
      <Input
        logo={<BiUser />}
        placeholder={"Email"}
        type={"email"}
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
      />
      <Input
        logo={<BiKey />}
        placeholder={"Password"}
        type={"password"}
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
      />
      <strong className="text-xs text-red-600">
        *Do not use your real password
      </strong>
      <Button
        type={"submit"}
        disabled={isSubmit}
        variant="bg-blue-400"
        style={{ width: "100%", marginTop: "10px" }}
      >
        Register
      </Button>
    </form>
  );
}
