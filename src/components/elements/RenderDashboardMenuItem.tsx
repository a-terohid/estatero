"use client" 

import { DashboardItem_interface } from "@/types/generalTypes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdArrowDropDown } from "react-icons/md";

const RenderDashboardMenuItem = ({item} : {item: DashboardItem_interface}) => {

    const pathname = usePathname(); // Get the current route path

    return (
        <div className=''>
           {
            item?.children.length  ?  <div>
                    {/* Details tag used for collapsible menu */}
                    <details className="group">
                        {/* Summary section, clickable to toggle the dropdown */}
                        <summary className={`flex items-center justify-between cursor-pointer ${pathname === item.href ? "bg-Greyscale-100  text-Greyscale-600 rounded-md px-2 my-1" : ""} `}>
                            {/* Link to the main menu item */}
                            <Link className={`p-1 flex items-center gap-x-1  `} href={item.href}>{item.name}</Link>
                            {/* Dropdown icon that rotates when the menu is open */}
                            <span className="text-2xl lg:text-3xl ml-3 transition-transform duration-500 group-open:rotate-45">
                                <MdArrowDropDown />
                            </span>
                        </summary>
                        {/* Submenu items, rendered if there are any children */}
                        <div className='ml-8 my-3'>
                            <ul className='flex flex-col gap-y-3 list-disc text-Body-RL-Small scale-up-ver-top'>
                                {/* Loop through each child item and render a list item with a link */}
                                {
                                    item?.children.map(ch => 
                                        <li className={`hover:cursor-pointer ${pathname === ch.href ? "bg-Greyscale-100  text-Greyscale-600 rounded-md px-2 py-1 my-1" : ""}`} key={ch.href}>
                                            <Link href={ch.href}>{ch.name}</Link>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </details>
            </div> : <Link className={`p-1 flex items-center gap-x-1  ${pathname === item.href ? "bg-Greyscale-100  text-Greyscale-600 rounded-md px-2 my-1" : ""} `} href={item.href}>{item.name}</Link>  /* Simple link for items without children */
           }
        </div>
    );
};

export default RenderDashboardMenuItem;