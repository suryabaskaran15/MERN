import type { FormValues } from "./types";
import AuthenticationForm from "../components/form/AuthenticationForm";
import { Link, useNavigate } from "react-router-dom";
import client from "../libs/client";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    const onSubmit = (values: FormValues) => {
        client.loginUser.mutation({ body: { ...values } }).then((res) => {
            localStorage.setItem("token", res.data.token);
            navigate("/");
        }).catch((res) => {
            toast({
                variant: "destructive",
                description: `${res?.response.data.message}`,
            })
        });
    };
    return (
        <Layout>
            <Card className="flex items-center justify-center min-h-screen">
                <div className="w-72 p-6 shadow-md rounded-md">
                    <h1 className="text-2xl text-center font-semibold mb-4">
                        Login
                    </h1>
                    <AuthenticationForm onSubmit={onSubmit} />
                    <p className="text-center mt-4 text-sm">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-500">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </Card>
        </Layout>
    )
}

export default Login;