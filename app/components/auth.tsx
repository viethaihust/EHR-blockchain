import { Button, Input } from "antd";
import React, { useState } from "react";
import { auth } from "@/firebase.config";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-52">
      <Input onChange={e => setEmail(e.target.value)} />
      <Input onChange={e => setPassword(e.target.value)} />
      <Button onClick={signIn}>Sign in</Button>
      <Button onClick={logOut}>Logout</Button>
    </div>
  );
};
