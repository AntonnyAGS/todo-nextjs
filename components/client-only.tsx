import { useMounted } from "../hooks/use-mounted";

interface ClientOnlyProps {
  children: JSX.Element;
}

export const ClientOnly = ({ children }: ClientOnlyProps): JSX.Element => {
  const { isMounted } = useMounted();

  return isMounted ? children : <></>;
};
