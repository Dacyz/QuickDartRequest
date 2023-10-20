import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useDashboardContext } from "@/context/context";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
interface CategoryType {
  inputValue?: string;
  title: string;
  isSave?: boolean;
  timeStamp: number;
}
const filter = createFilterOptions<CategoryType>();

export default function FreeSoloCreateOption() {
  const [value, setValue] = React.useState<CategoryType | undefined>(undefined);
  const {
    categoriesData,
    updateCategoriesStorage,
    removeCategoriesStorage,
    setRequestCategory,
  } = useDashboardContext();

  return (
    <Autocomplete
      value={value}
      size="small"
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue({
            title: newValue,
            timeStamp: Date.now(),
          });
          setRequestCategory(newValue);
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue,
            timeStamp: newValue.timeStamp,
          });
          setRequestCategory(newValue.inputValue);
          if (newValue.isSave === false || newValue.isSave === undefined) {
            updateCategoriesStorage({
              title: newValue.inputValue,
              inputValue: newValue.inputValue,
              isSave: true,
              timeStamp: Date.now(),
            });
          }
        } else {
          setValue(undefined);
          setRequestCategory(undefined);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some(
          (option) => inputValue === option.title
        );
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add "${inputValue}"`,
            timeStamp: Date.now(),
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={categoriesData}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(props, option) => (
        <div className="flex justify-between">
          <li {...props}>{option.title}</li>
          <IconButton
            onClick={() => removeCategoriesStorage(option.timeStamp)}
            color="primary"
            size="large"
            aria-label="save"
          >
            {option.isSave !== undefined ? <Close /> : <></>}
          </IconButton>
        </div>
      )}
      sx={{
        width: 300,
        background: "#FFFFFF20",
        borderColor: "white",
        borderWidth: 0,
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
          borderWidth: 0,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
          borderWidth: 0,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
          borderWidth: 0,
        },
      }}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            sx: { color: "white", borderWidth: 0 },
            ...params.InputProps,
          }}
          size="small"
          variant="standard"
          InputLabelProps={{
            style: { color: "white" }, // Change 'red' to your desired label color
          }}
          label={"Categoría"}
          color="primary"
        />
      )}
    />
  );
}
