import React from "react";
import { Field, Form } from "react-final-form";
import RangeSlider from "./inputFields/Range";

interface AccountFilterProps {
    onSubmit: (values: {[key: string] : string}) => void;
}
const AccountFilter = ({ onSubmit }: AccountFilterProps) => {

    return (
        <div className="col-3">
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine }) => (
                    <form onSubmit={handleSubmit} className="row">
                        <div className="row">
                            <label htmlFor="name" className="form-label">Name</label>
                            <Field
                                name="name"
                                component="input"
                                type="text"
                                placeholder="Enter name"
                                className="form-control"
                            />
                        </div>
                        <div className="row">
                            <label htmlFor="email" className="form-label">Email</label>
                            <Field
                                name="email"
                                component="input"
                                type="email"
                                placeholder="Enter email"
                                className="form-control"
                            />
                        </div>
                        <div className="row">
                            <label htmlFor="account_number" className="form-label">A/C No</label>
                            <Field
                                name="account_number"
                                component="input"
                                type="text"
                                placeholder="Enter account number"
                                className="form-control"
                            />
                        </div>
                        <div className="row">
                            <label htmlFor="balance" className="form-label">Balance</label>
                            <Field
                                name="balance"
                                component={RangeSlider}
                                minDistance= {1000}
                                MAX = {1000000}
                                placeholder="Enter balance"
                                className="form-control"
                            />
                        </div>
                        <div className="row">
                            <label htmlFor="age" className="form-label">Age</label>
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
                        <div className="col-12">
                            <button type="submit" disabled={submitting || pristine} className="btn btn-primary me-2">
                                Apply Filters
                            </button>
                            <button
                                type="button"
                                onClick={()=>form.reset()}
                                disabled={submitting || pristine}
                                className="btn btn-secondary"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                )}
            />
        </div>
    );
};

export default AccountFilter;
