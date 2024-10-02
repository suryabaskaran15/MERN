import { Link } from "react-router-dom";
import { Field, Form } from "react-final-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { ModeToggle } from "@/components/theme/ThemeToggler";


const Login = () => {

    return (
        <div className="relative flex">
            <div className="absolute top-4 right-4">
                <ModeToggle />
            </div>
                <div className="left-container hidden lg:block lg:w-1/2">
                <img src="../../public/pixlr-image-generator-035992d1-c4f4-466f-b436-ac8046e8fca4.png"/>
                </div>
                <div className="right-container w-full lg:w-1/2 flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold mb-4">
                        Welcome Back
                        </h1>
                        <span className="block whitespace-nowrap mb-6">
                        Please log in to your account
                        </span>
                        <Form
                            onSubmit={() => { }}
                            initialValues={{ email: "", password: "" }}
                            render={({ handleSubmit, form, submitting, }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <Field
                                            name="email"
                                            render={({ input, meta }) => (
                                                <>
                                                    <Input
                                                        {...input}
                                                        type="email"
                                                        placeholder="name@example.com"
                                                    />
                                                    {meta.error && meta.touched && (
                                                        <span className="text-red-500">{meta.error}</span>
                                                    )}
                                                </>
                                            )}
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <Field
                                            name="password"
                                            render={({ input, meta }) => (
                                                <>
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
                                            LogIn with Email
                                        </Button>
                                    </div>
                                </form>
                            )}
                        />
                        <div className="flex items-center my-6">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-4 text-gray-500">Or continue with</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>
                        <div className="flex justify-center mt-4">
                            <FcGoogle size={20}/>
                        </div>
                        <p className="text-center mt-4 text-sm">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-500">
                            Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
    );
}

export default Login;
