import { useMemo, useState } from "react";
import { Select } from "@mantine/core";
import {ApiData} from "../services/ApiService.ts";

interface Props {
  data: ApiData;
  onChange?: Function | null;
}

export default function ItemDropdown({data, onChange = null}: Props) {
  const items = useMemo(() => Object.values(data.itemDetails).map((x) => ({value: x.name, label: x.name})), [data.itemDetails]);
  const [item, setItem] = useState<string | null>(null);

  // Internal func that proxies the state change AND calls the `onChange` function that was passed in
  const internalChange = (value: string | null) => {
    setItem(value);
    if (onChange) onChange(value);
  }

  return (
    <Select
      clearable
      searchable
      size="lg"
      value={item}
      onChange={internalChange}
      data={items}
      label="Select an item"
    />
  );
}
