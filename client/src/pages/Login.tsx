import { Box, Typography } from "@mui/material";
import { FormValues } from "./types";
import AuthenticationForm from "../components/form/AuthenticationForm";
import { Link, useNavigate } from "react-router-dom";
import client from "../libs/client";

const Login = () => {
    const navigate = useNavigate();

    const onSubmit = (values: FormValues) => {
        client.loginUser.mutation({ body: { ...values } }).then(() => {
            navigate("/");
        });
    };
    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="90vh"
            >
                <Box
                    width="300px"
                    p={4}
                    boxShadow={3}
                    borderRadius={2}
                >
                    <Typography variant="h5" align="center" gutterBottom>
                        Login
                    </Typography>
                    <AuthenticationForm onSubmit={onSubmit} />
                    <Typography variant="subtitle2" align="center" gutterBottom>
                        Don't have an account? <Link to={"/signup"}>Sign Up</Link>
                    </Typography>
                </Box>
            </Box>


        </>
    )
}

export default Login;