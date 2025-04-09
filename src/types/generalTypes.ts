import { ReactNode } from "react";
import { UserRole } from "./enums/generalEnums";

export interface DashboardItem_interface {
  name: string;
  href: string;
  accessibility: UserRole[]; 
  icon: ReactNode;
  children: DashboardItem_interface[]; 
}