import { Field, Form } from "react-final-form";
import TextField from "../inputFields/TextField";
import { Box, Button } from "@mui/material";
import { FormValues } from "../../pages/types";

interface AuthenticationFormProps {
    onSubmit:(values:FormValues)=>void
}

const AuthenticationForm = ({onSubmit}:AuthenticationFormProps) => {
    return (<>
        <Form
            onSubmit={onSubmit}
            initialValues={{ email: '', password: '' }}
            render={({ handleSubmit, form, submitting, pristine }) => (
                <form onSubmit={handleSubmit}>
                    <Field
                        name="email"
                        render={({ input, meta }) => (
                            <TextField
                                {...input}
                                label="Email"
                                type="email"
                                fullWidth
                                margin="normal"
                                error={meta.touched && meta.error}
                                helperText={meta.touched && meta.error}
                            />
                        )}
                    />
                    <Field
                        name="password"
                        render={({ input, meta }) => (
                            <TextField
                                {...input}
                                label="Password"
                                type="password"
                                fullWidth
                                margin="normal"
                                error={meta.touched && meta.error}
                                helperText={meta.touched && meta.error}
                            />
                        )}
                    />
                    <Box mt={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className="login-field"
                            disabled={submitting || pristine}
                        >
                            Submit
                        </Button>
                    </Box>
                </form>
            )}
        />
    </>)
}
export default AuthenticationForm;