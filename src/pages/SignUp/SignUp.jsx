import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "./schema";
import styles from "./SignUp.module.scss";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
    register,
    setError,
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  if (isSubmitSuccessful) {
    reset();
  }

  const onSubmit = async (data) => {
    try {
      const res = await fetch(
        "https://movie-reviewer-0rv9.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();
      if (result.success === false) {
        if (result.message === "The username has been taken") {
          setError("username", {
            type: "manual",
            message: result.message,
          });
          console.log(message);
          console.log(result);
        }
      }
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div className={styles.signUpPage}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <label htmlFor="usernameInput">Your username</label>
          <input
            id="usernameInput"
            type="text"
            {...register("username")}
            placeholder="Username"
          />
          <small className={styles.error_text}>
            {errors?.username?.message ?? "\u00A0"}
          </small>
        </div>

        <div className={styles.field}>
          <label htmlFor="emailInput">Your email</label>
          <input
            id="emailInput"
            type="email"
            {...register("email")}
            placeholder="name@company.com"
          />
          <small className={styles.error_text}>
            {errors?.email?.message ?? "\u00A0"}
          </small>
        </div>

        <div className={styles.field}>
          <label htmlFor="passwordInput">Your password</label>
          <input
            id="passwordInput"
            type="password"
            {...register("password")}
            placeholder="Password"
          />
          <small className={styles.error_text}>
            {errors?.password?.message ?? "\u00A0"}
          </small>
        </div>

        <div className={styles.field}>
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            id="passwordConfirm"
            type="password"
            {...register("passwordConfirm")}
            placeholder="Password"
          />
          <small className={styles.error_text}>
            {errors?.passwordConfirm?.message ?? "\u00A0"}
          </small>
        </div>
        <div className={styles.field}>
          <button type="submit">Sign Up</button>
        </div>
      </form>

      <div className={styles.signUpField}>
        <span>Have an account?</span>
        <Link to="/sign-in">Sign In</Link>
      </div>
    </div>
  );
};

export default SignUp;
