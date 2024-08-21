import { Box, Typography } from "@mui/material";
import { FormValues } from "./types";
import AuthenticationForm from "../components/form/AuthenticationForm";
import { Link, useNavigate } from "react-router-dom";
import client from "../libs/client";

const Registration = () => {
    const navigate = useNavigate();

    const onSubmit = (values: FormValues) => {
        client.signUpUser.mutation({ body: values }).then(() => {
            navigate("/login")
        })
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
                    <Typography variant="h5" align="center">
                        Sign Up
                    </Typography>
                    <AuthenticationForm onSubmit={onSubmit} />
                    <Typography variant="subtitle2" align="center" >
                        Already have an account? <Link to={"/login"}>login</Link>
                    </Typography>
                </Box>
            </Box>


        </>
    )
}

export default Registration;