import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../store/slices/authSlice";
import { useLoginMutation } from "../store/api/grocifyApi";

const useLogin = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const [form,   setForm]   = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [apiErr, setApiErr] = useState("");

  const setField = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const validate = () => {
    const e = {};
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    if (!form.password || form.password.length < 6)
      e.password = "Min 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setApiErr("");
    try {
      const result = await login({ email: form.email, password: form.password }).unwrap();
      dispatch(setCredentials({ user: result.user, token: result.token }));
      navigate("/");
    } catch (err) {
      setApiErr(err?.data?.message || "Invalid email or password");
    }
  };

  return {
    form, setField,
    errors, apiErr,
    showPw, setShowPw,
    isLoading,
    handleSubmit,
  };
};

export default useLogin;