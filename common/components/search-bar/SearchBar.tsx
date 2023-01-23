import { Search } from "@mui/icons-material";
import { debounce, InputAdornment, TextField } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { Control, useController } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  type: string;
  control: Control<any> | undefined;
};

const SearchBar = ({ name, control, label, type }: Props) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  });
  const [inputValue, setInputValue] = useState<string>(value);
  const isInputValueEmit = useRef(false);

  useEffect(() => {
    if (isInputValueEmit.current) {
      emitValue(inputValue);
    } else {
      isInputValueEmit.current = true;
    }
  }, [inputValue]);

  const emitValue = useMemo(() => debounce(value => onChange(value), 500), []);

  return (
    <TextField
      type={type}
      onChange={event => {
        setInputValue(event.target.value);
      }}
      value={inputValue}
      name={name}
      label={label}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
