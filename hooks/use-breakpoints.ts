import { useMounted } from "./use-mounted";

export const useBreakpoints = () => {
  const { isMounted } = useMounted();

  /** WORKAROUND: make this hook responsible to get custom breakpoints */
  return { isMobile: isMounted && window.screen.width < 1024 };
};
