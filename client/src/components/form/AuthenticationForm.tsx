import { Field, Form } from "react-final-form";
import type { FormValues } from "../../pages/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface AuthenticationFormProps {
    onSubmit: (values: FormValues) => void;
}

const required = (value: any) => (value ? undefined : "This field is required");

const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? undefined : "Invalid email address";
};

const AuthenticationForm = ({ onSubmit }: AuthenticationFormProps) => {
    return (
        <>
            <Form
                onSubmit={onSubmit}
                initialValues={{ email: "", password: "" }}
                render={({ handleSubmit, form, submitting, pristine }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                        <Field
                            name="email"
                            validate={(value) => required(value) || validateEmail(value)}
                            render={({ input, meta }) => (
                                <>
                                    <Label>Email</Label>
                                    <Input
                                        {...input}
                                        type="email"
                                        placeholder="Enter your Email"
                                    />
                                    {meta.error && meta.touched && (
                                        <span className="text-red-500">{meta.error}</span>
                                    )}
                                </>
                            )}
                        />
                        </div>
                        <div>
                        <Field
                            name="password"
                            validate={required}
                            render={({ input, meta }) => (
                                <>
                                    <Label>Password</Label>
                                    <Input
                                        {...input}
                                        type="password"
                                        placeholder="Enter your Password"
                                    />
                                    {meta.error && meta.touched && (
                                        <span className="text-red-500">{meta.error}</span>
                                    )}
                                </>
                            )}
                        />
                        </div>
                        <div className="flex justify-center mt-4">
                            <Button
                                type="submit"
                                className="login-field"
                                disabled={submitting}
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                )}
            />
        </>
    );
};

export default AuthenticationForm;
