import { LogsActions } from "@/types/enums/generalEnums";

export const LogsActionFilters = [
  {
    name: "All",
    value: "all",
    filter: {}, 
  },
  {
    name: "new user registered",
    value: "register",
    filter: { action: { $in: [LogsActions.NEW_REGISTER, LogsActions.NEW_REGISTER_GOOGLE] } },
  },
  {
    name: "new user registered / Credentials",
    value: "credentials",
    filter: { action: LogsActions.NEW_REGISTER },
  },
  {
    name: "new user registered / Google",
    value: "google",
    filter: { action: LogsActions.NEW_REGISTER_GOOGLE },
  },
];