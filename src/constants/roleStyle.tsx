import { UserRole } from "@/types/enums/generalEnums";

 export const roleStyles: Record<UserRole, { labelClass: string }> = {
    [UserRole.ADMIN]: {
      labelClass: 'bg-Success-100 text-Success-300',
    },
    [UserRole.AGENTADMIN]: {
      labelClass: 'bg-Success-100 text-Success-300',
    },
    [UserRole.OWNER]: {
      labelClass: 'bg-Sky-50 text-Sky-200',
    },
    [UserRole.AGENTOWNER]: {
      labelClass: 'bg-Sky-50 text-Sky-200',
    },
    [UserRole.AGENT]: {
      labelClass: 'bg-Warning-50 text-Warning-200',
    },
    [UserRole.CLIENT]: {
        labelClass: 'hidden', 
      },
      [UserRole.ALL]: {
        labelClass: 'hidden',
      },
  };