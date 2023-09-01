import { useState } from "react";
import { Flex, Group, Select, Switch } from "@mantine/core";
import { ApiData } from "../services/ApiService";
import ActionCalc from "./ActionCalc";
import { ActionFunction } from "../models/Client";

interface Props {
  data: ApiData;
}

export default function Calculator({ data }: Props) {
  const [action, setAction] = useState<string | null>(null);
  const [fromRaw, setFromRaw] = useState(false);

  const actions = Object.values(data.actionDetails)
    .filter((x) => x.function === ActionFunction.Production)
    .map((x) => ({
      value: x.hrid,
      label: x.name,
    }));

  return (
    <Flex
      gap="sm"
      justify="flex-start"
      align="flex-start"
      direction="column"
      wrap="wrap"
    >
      <Group>
        <Select
          searchable
          size="lg"
          value={action}
          onChange={setAction}
          data={actions}
          label="Select an item"
          placeholder="Pick one"
        />
        <Switch
          onLabel="CRAFT"
          offLabel="BUY"
          label="Upgrade Items"
          size="xl"
          checked={fromRaw}
          onChange={(event) => setFromRaw(event.currentTarget.checked)}
        />
      </Group>
      {action && (
        <ActionCalc
          fromRaw={fromRaw}
          action={data.actionDetails[action]}
          data={data}
        />
      )}
    </Flex>
  );
}
