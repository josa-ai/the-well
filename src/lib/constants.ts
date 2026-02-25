export const SITE_NAME = "The Well" as const;
export const SITE_TAGLINE = "Your Business & Culture Connection" as const;
export const SITE_DESCRIPTION =
  "The Well is a coworking community space and event venue in Lakeland, FL. Premium workspace, meeting rooms, and event hosting for professionals and creatives." as const;
export const SITE_URL = "https://thewell-lakeland.com" as const;

export const BUSINESS = {
  name: "The Well",
  tagline: "Your Business & Culture Connection",
  address: {
    street: "114 E. Parker St.",
    city: "Lakeland",
    state: "FL",
    zip: "33801",
    full: "114 E. Parker St., Lakeland, FL 33801",
  },
  phone: {
    primary: "(863) 668-1541",
    secondary: "(863) 513-0416",
    primaryHref: "tel:+18636681541",
    secondaryHref: "tel:+18635130416",
  },
  email: "thewell.lakeland@gmail.com",
  emailHref: "mailto:thewell.lakeland@gmail.com",
  hours: {
    weekdays: "Mon-Fri: 9:00 AM - 6:00 PM",
    weekends: "Sat & Sun: Available Upon Appointment",
  },
  social: {
    facebook: "https://www.facebook.com/thewell.lakeland",
    instagram: "https://www.instagram.com/thewell.lakeland/",
  },
  googleMaps: "https://maps.app.goo.gl/x91ydex5iquogYNX8",
  eventRequestForm:
    "https://docs.google.com/forms/d/e/1FAIpQLSe8t-mnZMqvqOj5Sj1ggCIs7Vyeaf-WcFQil0XTjunW4ZBAUQ/viewform",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Spaces", href: "/spaces" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
] as const;

export const EXTERNAL_LINKS = {
  eventRequest: {
    label: "Event Request Form",
    href: BUSINESS.eventRequestForm,
  },
} as const;
