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
    NEW_AGENT = 'new Agent Promoted',
    NEW_MESSAGE = 'new Message Sended',
    NEW_FORM = 'new Form Message Sended',
    NEW_FAQ = 'new FAQ added',
    EDIT_FAQ = 'a FAQ edited',
    DELETE_FAQ = 'a FAQ deleted',
}