import { Skeleton, Stack } from "@chakra-ui/react";
import Feature from "./Feature";

type Props = {};

function PrivateSkeleton({}: Props) {
  return (
    <div>
      <Feature title=" ">
        <Stack>
          <Skeleton height="50px" />
          <Skeleton height="50px" />
          <Skeleton height="50px" />
        </Stack>
      </Feature>
      <br />
      <Feature title=" ">
        <Stack>
          <Skeleton height="50px" />
          <Skeleton height="50px" />
          <Skeleton height="50px" />
        </Stack>
      </Feature>
      <br />
      <Feature title=" ">
        <Stack>
          <Skeleton height="50px" />
          <Skeleton height="50px" />
          <Skeleton height="50px" />
        </Stack>
      </Feature>
      <br />
    </div>
  );
}

export default PrivateSkeleton;
