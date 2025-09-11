import { Skeleton, Stack } from "@chakra-ui/react";

type Props = {};

function TableSkeletone({}: Props) {
  return (
    <div>
      <Stack>
        <Skeleton height="50px" />
        <Skeleton height="50px" />
        <Skeleton height="50px" />
      </Stack>
    </div>
  );
}

export default TableSkeletone;
