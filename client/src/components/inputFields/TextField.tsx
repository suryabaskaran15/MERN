import { TextField as Text, TextFieldVariants } from "@mui/material"
import { FieldInputProps } from "react-final-form";

interface TextFieldProps {
    id?:string;
    variant?: TextFieldVariants;
    label?:string;
}
const TextField = (props : TextFieldProps | FieldInputProps<any, HTMLElement>)=>{
    return(
        <Text {...props} />
    )
}

export default TextField;