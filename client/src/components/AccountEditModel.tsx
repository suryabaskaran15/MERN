import type React from 'react';
import { Form, Field } from 'react-final-form';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { AccountTableData } from './type';
import type { AccountModel } from '@/libs/apiClient';

interface AccountEditModelProps {
    isOpen: boolean;
    onClose: () => void;
    account: AccountTableData | null;
    onSave: (values: AccountModel) => void;
}

const AccountEditModel: React.FC<AccountEditModelProps> = ({ isOpen, onClose, account,onSave }) => {
    const handleSubmit = (values: AccountModel) => {
        console.log(values);
        onSave(values);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{account ? "Edit" : "Add"} Account</DialogTitle>
                    <DialogDescription>
                        Make changes to the account here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Form
                    onSubmit={handleSubmit}
                    initialValues={account ?? {}}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                            {account && <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="account_number" className="text-right">
                                    Account Number
                                </Label>
                                <Field
                                    name="account_number"
                                    component="input"
                                    className="col-span-3"
                                    disabled
                                    render={({ input }) => (
                                        <Input {...input} id="account_number" />
                                    )}
                                />
                            </div>}

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="firstname" className="text-right">
                                    First Name
                                </Label>
                                <Field
                                    name="firstname"
                                    component="input"
                                    className="col-span-3"
                                    render={({ input }) => (
                                        <Input {...input} id="firstname" />
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="lastname" className="text-right">
                                    Last Name
                                </Label>
                                <Field
                                    name="lastname"
                                    component="input"
                                    className="col-span-3"
                                    render={({ input }) => (
                                        <Input {...input} id="lastname" />
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="gender" className="text-right">
                                    Gender
                                </Label>
                                <Field
                                    name="gender"
                                    render={({ input }) => (
                                        <Select
                                            onValueChange={input.onChange}
                                            value={input.value}
                                        >
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select gender"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="M">Male</SelectItem>
                                                <SelectItem value="F">Female</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="age" className="text-right">
                                    Age
                                </Label>
                                <Field
                                    name="age"
                                    component="input"
                                    type='number'
                                    className="col-span-3"
                                    render={({ input }) => (
                                        <Input {...input} id="age" type="number" />
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    Email
                                </Label>
                                <Field
                                    name="email"
                                    component="input"
                                    className="col-span-3"
                                    render={({ input }) => (
                                        <Input {...input} id="email" type="email" />
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="balance" className="text-right">
                                    Balance
                                </Label>
                                <Field
                                    name="balance"
                                    component="input"
                                    type='number'
                                    className="col-span-3"
                                    render={({ input }) => (
                                        <Input {...input} id="balance" type="number" />
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="address" className="text-right">
                                    Address
                                </Label>
                                <Field
                                    name="address"
                                    component="input"
                                    type='text'
                                    className="col-span-3"
                                    render={({ input }) => (
                                        <Input {...input} id="balance" type="number" />
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="city" className="text-right">
                                    City
                                </Label>
                                <Field
                                    name="city"
                                    component="input"
                                    type='text'
                                    className="col-span-3"
                                    render={({ input }) => (
                                        <Input {...input} id="balance" type="number" />
                                    )}
                                />
                            </div><div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="state" className="text-right">
                                    State
                                </Label>
                                <Field
                                    name="state"
                                    component="input"
                                    type='text'
                                    className="col-span-3"
                                    render={({ input }) => (
                                        <Input {...input} id="balance" type="number" />
                                    )}
                                />
                            </div>

                            <DialogFooter>
                                <Button type="submit">{account ? "Save changes" : "Add"}</Button>
                            </DialogFooter>
                        </form>
                    )}
                />
            </DialogContent>
        </Dialog>
    );
};

export default AccountEditModel;