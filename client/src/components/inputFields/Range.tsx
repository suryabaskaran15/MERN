import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { FieldRenderProps } from 'react-final-form';

interface RangeSliderProps extends FieldRenderProps<number[]> {
    minDistance: number;
    MAX: number;
    MIN?: number;
}

export default function RangeSlider({input:{onChange} ,minDistance , MAX , MIN = 0}: RangeSliderProps) {
    const [value, setValue] = useState<number[]>([MIN ?? 0, MAX]);

    const handleChange = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
        }
    };



    useEffect(() => {
        const range = {
            gte: value[0] !== MIN ? value[0]: undefined,
            lte: value[1] !== MAX ? value[1] : undefined,
        }
        onChange({ ...range });
    }, [value])

    return (
        <Box>
            <span className='float-start'>{value[0]}</span>
            <span className='float-end'>{value[1] === MAX ? "max" : value[1]}</span>
            <Slider
                getAriaLabel={() => 'Minimum distance'}
                value={value}
                onChange={handleChange}
                max={MAX}
                min={MIN}
                step={minDistance}
                valueLabelDisplay="off"
                disableSwap
            />
        </Box>
    );
}
