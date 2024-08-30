import React from "react";
import { Field, Form } from "react-final-form";
import RangeSlider from "./inputFields/Range";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectAdapter from "./inputFields/SelectBox";

interface AccountFilterProps {
    onSubmit: (values: { [key: string]: unknown }) => void;
}

const AccountFilter = ({ onSubmit }: AccountFilterProps) => {
    const genderOptions = [
        { value: 'M', label: 'Male' },
        { value: 'F', label: 'Female' },
    ];

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
                <Form
                    onSubmit={(values) => {
                        console.log(values); // Check form values on submit
                        onSubmit(values);
                    }}
                    render={({ handleSubmit, form, submitting, pristine }) => (
                        <form name="account-filter" onSubmit={handleSubmit} className="row">
                            <div className="row">
                                <Field
                                    name="name"
                                    type="text"
                                    placeholder="Enter name"
                                    className="form-control"
                                    render={({ input }) => (
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="name">Name</Label>
                                            <Input {...input} id="name" placeholder="Name of your project" />
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="row">
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="Enter email"
                                    className="form-control"
                                    render={({ input }) => (
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="email">Email</Label>
                                            <Input {...input} id="email" placeholder="Email of the user" />
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="row">
                                <Field
                                    name="account_number"
                                    type="text"
                                    placeholder="Enter account number"
                                    className="form-control"
                                    render={({ input }) => (
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="ac-no">A/C No</Label>
                                            <Input {...input} id="ac-no" placeholder="Account Number" />
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="row">
                                <Field
                                    name="gender"
                                    label="Gender"
                                    isMulti={true}
                                    component={SelectAdapter}
                                    options={genderOptions}
                                />
                            </div>
                            <div className="row">
                                <Label>Balance</Label>
                                <Field
                                    name="balance"
                                    component={RangeSlider}
                                    minDistance={1000}
                                    MAX={1000000}
                                    placeholder="Enter balance"
                                    className="form-control"
                                />
                            </div>
                            <div className="row">
                                <Label>Age</Label>
                                <Field
                                    name="age"
                                    component={RangeSlider}
                                    minDistance={1}
                                    MAX={100}
                                    MIN={18}
                                    placeholder="Enter age"
                                    className="form-control"
                                />
                            </div>
                            <CardFooter className="flex justify-between">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => form.reset()}
                                    disabled={submitting || pristine}
                                >
                                    Reset
                                </Button>
                                <Button type="submit" disabled={submitting || pristine} className="btn btn-primary me-2">
                                    Apply Filters
                                </Button>
                            </CardFooter>
                        </form>
                    )}
                />
            </CardContent>
        </Card>
    );
};

export default AccountFilter;
