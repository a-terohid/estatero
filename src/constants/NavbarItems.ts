export const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/aboutUs" },
    { 
        name: "Property", 
        href: "/property",
        children: [
            { name: "Residential", href: "/property/residential" },
            { name: "Commercial", href: "/property/commercial" },
            { name: "Luxury", href: "/property/luxury" }
        ]
    },
    { name: "Agents", href: "/agents" },
    { name: "Blogs", href: "/blogs" },
    { name: "FAQ", href: "/FAQ" },
    { name: "Contact", href: "/contact" },
];
