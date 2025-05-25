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
  {
    name: "new user Promoted",
    value: "Promoted",
    filter: { action: { $in: [LogsActions.NEW_ADMIN, LogsActions.NEW_AGENT] } },
  },
  {
    name: "new user Promoted / Admin",
    value: "admin",
    filter: { action: LogsActions.NEW_ADMIN },
  },
  {
    name: "new user Promoted / Agent",
    value: "agent",
    filter: { action: LogsActions.NEW_AGENT },
  },
  {
    name: "new message",
    value: "new message",
    filter: { action: LogsActions.NEW_MESSAGE},
  },
  {
    name: "new from message",
    value: "new form message",
    filter: { action: LogsActions.NEW_FORM},
  },
  {
    name: "FAQ",
    value: "FAQ",
    filter: { action: { $in: [LogsActions.NEW_FAQ, LogsActions.EDIT_FAQ , LogsActions.DELETE_FAQ] } },
  },
  {
    name: "new FAQ",
    value: "new FAQ",
    filter: { action: LogsActions.NEW_FAQ},
  },
  {
    name: "edit FAQ",
    value: "edit FAQ",
    filter: { action: LogsActions.EDIT_FAQ},
  },
  {
    name: "delete FAQ",
    value: "delete FAQ",
    filter: { action: LogsActions.DELETE_FAQ},
  },

];