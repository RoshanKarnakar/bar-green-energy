import {
  ArrowLeft,
  ArrowRight,
  BatteryCharging,
  Bike,
  CalendarDays,
  CircleAlert,
  CircleCheck,
  Clock3,
  ExternalLink,
  Eye,
  EyeOff,
  Gauge,
  Inbox,
  LayoutDashboard,
  Leaf,
  ListFilter,
  Mail,
  MailOpen,
  Menu,
  Package,
  Phone,
  PlugZap,
  Plus,
  Settings,
  Shield,
  ShieldCheck,
  Smartphone,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const symbols = {
  menu: Menu,
  arrow_forward: ArrowRight,
  arrow_back: ArrowLeft,
  battery_charging_full: BatteryCharging,
  battery_full: BatteryCharging,
  build_circle: Wrench,
  verified_user: ShieldCheck,
  eco: Leaf,
  check_circle: CircleCheck,
  error: CircleAlert,
  call: Phone,
  mail: Mail,
  schedule: Clock3,
  filter_alt_off: ListFilter,
  electric_scooter: Bike,
  dashboard: LayoutDashboard,
  inbox: Inbox,
  event: CalendarDays,
  settings: Settings,
  open_in_new: ExternalLink,
  add: Plus,
  two_wheeler: Bike,
  mark_email_unread: MailOpen,
  inventory_2: Package,
  speed: Gauge,
  ev_station: PlugZap,
  shield: Shield,
  smartphone: Smartphone,
  visibility_off: EyeOff,
  visibility: Eye,
} satisfies Record<string, LucideIcon>;

export type SymbolName = keyof typeof symbols;

export function SymbolIcon({
  name,
  className,
}: {
  name: SymbolName;
  className?: string;
}) {
  const Icon = symbols[name];
  const requestedSize = className?.match(/text-\[(\d+)px\]/)?.[1];
  const size = requestedSize ? Number(requestedSize) : 24;

  return <Icon aria-hidden="true" className={className} size={size} strokeWidth={2} />;
}
