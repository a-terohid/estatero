export enum UserRole {
    CLIENT = "Client",
    AGENT = "Agent",
    ADMIN = "Admin",
    OWNER = "Owner",
    AGENTADMIN = "Agent/Admin",
    AGENTOWNER = "Agent/Owner",
    ALL = "all"
}


export enum LogsActions  {
    NEW_REGISTER = 'new user registered',
    NEW_REGISTER_GOOGLE = 'new google user registered',
    NEW_ADMIN = 'new Admin Promoted',
    NEW_AGENT = 'new Admin Promoted',
}