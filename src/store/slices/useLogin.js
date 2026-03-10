import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../store/slices/authSlice";

// ── Mock user ──
const MOCK_USER = {
  id: 1,
  name: "Riya Ahmed",
  email: "riya@example.com",
  phone: "01712345678",
};

const useLogin = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();

  const [form,      setForm]      = useState({ email: "", password: "" });
  const [errors,    setErrors]    = useState({});
  const [showPw,    setShowPw]    = useState(false);
  const [apiErr,    setApiErr]    = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    // try {
    //   const result = await login({ email: form.email, password: form.password }).unwrap();
    //   dispatch(setCredentials({ user: result.user, token: result.token }));
    //   navigate("/");
    // } catch (err) {
    //   setApiErr(err?.data?.message || "Invalid email or password");
    // }

    // ── Mock login──
    await new Promise(r => setTimeout(r, 900)); // fake loading
    dispatch(setCredentials({
      user:  { ...MOCK_USER, email: form.email },
      token: "mock-token-123",
    }));
    setIsLoading(false);
    navigate("/");
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