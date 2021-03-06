import { FormikHelpers, useFormik } from "formik";
import * as yup from "yup";
import { CSSObject } from "@emotion/react";
import { Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { UserClass, UsersAPI } from "../../repository/user-api";
import { useAppDispatch } from "../../store/hooks";
import { userActions } from "../../store/user.slice";
import { useState } from "react";

interface Props {}

interface FormikValues {
   username: string;
   password: string;
}

const inputStyles: CSSObject = {
   marginBottom: 2,
};

const initialValues: FormikValues = {
   username: "",
   password: "",
};

const validationSchema = yup.object({
   username: yup
      .string()
      .required("Username is required")
      .min(1, "Username must be at least 5 characters long"),
   password: yup
      .string()
      .required("Password is required")
      .min(1, "Password must be at least 5 characters long."),
});

const UserLoginForm = (props: Props) => {
   const [isLoading, setIsLoading] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");

   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const submitHandler = (
      values: FormikValues,
      actions: FormikHelpers<FormikValues>
   ) => {
      const currentUser: UserClass = {
         username: values.username,
         password: values.password,
      };
      setErrorMessage("");
      setIsLoading(true);
      // Login the user
      UsersAPI.login(currentUser)
         .then((data) => {
            // Update UI
            dispatch(userActions.login({ user: data.user, token: data.token }));
            // Redirect the user
            navigate("/account");
         })
         .catch((error) => {
            setErrorMessage(error);
         });
      setIsLoading(false);
   };

   const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: submitHandler,
   });

   return (
      <form onSubmit={formik.handleSubmit}>
         <TextField
            sx={inputStyles}
            label="Username"
            fullWidth
            size="small"
            id="username"
            name="username"
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
         />

         <TextField
            sx={inputStyles}
            label="Password"
            fullWidth
            size="small"
            id="password"
            name="password"
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
         />
         <Link to="/password-reset">
            <Typography variant="body1" color="info.main">
               Forgot Password
            </Typography>
         </Link>

         <Button type="submit" variant="contained" sx={{ my: 3 }}>
            {isLoading ? "Processing..." : "Submit"}
         </Button>
         {errorMessage && <p>{errorMessage}</p>}
      </form>
   );
};

export default UserLoginForm;
