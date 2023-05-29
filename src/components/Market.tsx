import { useQuery } from "@tanstack/react-query";
import { getMarketData } from "../services/ApiService";
import { Code, Flex, Loader, Space, Table, TextInput } from "@mantine/core";
import { useMemo, useState } from "react";

export default function Market() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["marketData"],
    queryFn: () => getMarketData(false),
    refetchInterval: 30 * 60 * 1000,
  });

  const items = useMemo(
    () =>
      data &&
      Object.entries(data.market)
        .filter(
          ([key]) => !search || key.toLowerCase().includes(search.toLowerCase())
        )
        .sort(([, a], [, b]) => {
          if (a.bid > b.bid) return -1;
          if (a.bid < b.bid) return 1;
          return 0;
        })
        .map(([key, val]) => {
          return (
            <tr key={key}>
              <td>{key}</td>
              <td>{val.ask}</td>
              <td>{val.bid}</td>
            </tr>
          );
        }),
    [data, search]
  );

  if (isLoading || !data) return <Loader />;

  return (
    <>
      <div>
        Market Date: <Code>{new Date(data.time * 1000).toLocaleString()}</Code>
      </div>
      <Flex>
        <TextInput
          placeholder="Holy Brush"
          label="Search"
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
        />
      </Flex>
      <Space h="md" />

      <Flex
        gap="sm"
        justify="flex-start"
        align="flex-start"
        wrap="wrap"
        direction="row"
      >
        <Flex direction="column">
          <Table striped highlightOnHover withBorder withColumnBorders>
            <thead>
              <tr>
                <th>Item</th>
                <th>Ask</th>
                <th>Bid</th>
              </tr>
            </thead>
            <tbody>{items}</tbody>
          </Table>
        </Flex>
      </Flex>
    </>
  );
}
