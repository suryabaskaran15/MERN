import Select, { GroupProps, StylesConfig } from "react-select";
import { Label } from "../ui/label";


const customSelectStyles: StylesConfig<unknown, false> = {
    control: (provided) => ({
        ...provided,
        backgroundColor: 'hsl(var(--background))',
        color: 'hsl(var(--foreground))',
        borderColor: 'hsl(var(--border))',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: 'hsl(var(--card))',
        color: 'hsl(var(--foreground))',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'hsl(var(--foreground))',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'hsl(var(--muted))' : 'hsl(var(--card))',
        color: state.isSelected ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'hsl(var(--muted-foreground))',
    }),
};

const SelectAdapter = ({ input, ...rest }: { [x: string]: any; input: any }) => {
    const CustomGroupLabel = (props: GroupProps) => {
        return <div>{props.children}</div>;
    };
    const customComponents = {
        GroupHeading: CustomGroupLabel,
    };
    return (
        <>
            <Label>{rest.label}</Label>
            <Select {...input} {...rest} styles={customSelectStyles} className="react-select" classNamePrefix="react-select" components={customComponents} />
        </>
    );
};

export default SelectAdapter;