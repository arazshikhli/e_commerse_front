import {Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import {FC, ChangeEvent, useEffect} from "react";

interface IFormProps {
    selectedCategories: string[] | null; // Исправление: тип может быть 'string' или 'null'
    handleCategoryChange: (event: ChangeEvent<HTMLInputElement>) => void; // Исправление: конкретизация типа события
}

export const FormComponent:FC<IFormProps>=({selectedCategories,handleCategoryChange})=>{

    return  <FormGroup>
        <FormControlLabel
            control={
                <Checkbox
                    checked={ selectedCategories?.includes("TV")}
                    onChange={handleCategoryChange}
                    name="TV"
                />
            }
            label="TV"
        />
        <FormControlLabel
            control={
                <Checkbox
                    checked={selectedCategories?.includes("Mobile")}
                    onChange={handleCategoryChange}
                    name="Mobile"
                />
            }
            label="Mobile"
        />
        <FormControlLabel
            control={
                <Checkbox
                    checked={selectedCategories?.includes("Laptop")}
                    onChange={handleCategoryChange}
                    name="Laptop"
                />
            }
            label="Laptop"
        />
    </FormGroup>

}
