import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../store/slices/authSlice";
import { useRegisterMutation } from "../store/api/grocifyApi";

const useRegister = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const [form,   setForm]   = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [apiErr, setApiErr] = useState("");
  const [agreed, setAgreed] = useState(false);

  const setField = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const passwordStrength = () => {
    const pw = form.password;
    if (!pw) return { level: 0, label: "" };
    if (pw.length >= 10 && /[A-Z]/.test(pw) && /[0-9]/.test(pw))
      return { level: 4, label: "Strong" };
    if (pw.length >= 8)  return { level: 3, label: "Good" };
    if (pw.length >= 6)  return { level: 2, label: "Fair" };
    return { level: 1, label: "Weak" };
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.password || form.password.length < 6)
      e.password = "Min 6 characters";
    if (form.password !== form.confirm)
      e.confirm = "Passwords don't match";
    if (!agreed) e.agree = "Please accept terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setApiErr("");
    try {
      const result = await register({
        name:     form.name,
        email:    form.email,
        phone:    form.phone,
        password: form.password,
      }).unwrap();
      dispatch(setCredentials({ user: result.user, token: result.token }));
      navigate("/");
    } catch (err) {
      setApiErr(err?.data?.message || "Registration failed. Please try again.");
    }
  };

  return {
    form, setField,
    errors, apiErr,
    showPw, setShowPw,
    agreed, setAgreed,
    isLoading,
    passwordStrength,
    handleSubmit,
  };
};

export default useRegister;