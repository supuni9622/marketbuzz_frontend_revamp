import { useState, useCallback } from "react";

const useToggle = (props: any) => {
  const [state, setState] = useState(props);

  return [
    state,
    useCallback(() => {
      setState((state:any) => !state);
    }, [])
  ];
};

export default useToggle;
