"use client";

import { Switch } from "@/components/ui/switch";
import { setLight, setDark } from "@/redux/feature/theme/themeSlice";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

export default function StateSwitch() {
  // NOTE - source: https://redux-toolkit.js.org/tutorials/typescript (see "Use Typed Hooks in Components" section)
  // The `state` arg is correctly typed as `RootState` already
  const theme = useAppSelector((state) => state.theme.value);
  const dispatch = useAppDispatch();

  const swap = (check: boolean) => {
    if (check) {
      dispatch(setDark());
    } else {
      dispatch(setLight());
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="flex items-center justify-center">
      <Switch onCheckedChange={swap} checked={theme === "dark"} />
    </div>
  );
}
