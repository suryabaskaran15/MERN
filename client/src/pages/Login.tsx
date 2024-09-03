import type { FormValues } from "./types";
import AuthenticationForm from "../components/form/AuthenticationForm";
import { Link, useNavigate } from "react-router-dom";
import client from "../libs/client";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Registration = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    const onSubmit = (values: FormValues) => {
        client.signUpUser.mutation({ body: values }).then(() => {
            navigate("/login");
        }).catch((res) => {
            console.log(res?.response.data.message);  // Check error message in console
            toast({
                variant: "destructive",
                description: `${res?.response.data.message}`,
            });
        });
    };

    return (
        <Card className="flex items-center justify-center min-h-screen">
            <div className="w-72 p-6 shadow-md rounded-md">
                <h1 className="text-2xl text-center font-semibold mb-4">Sign Up</h1>
                <AuthenticationForm onSubmit={onSubmit} />
                <p className="text-center mt-4 text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500">
                        Login
                    </Link>
                </p>
            </div>
        </Card>
    );
}

export default Registration;
