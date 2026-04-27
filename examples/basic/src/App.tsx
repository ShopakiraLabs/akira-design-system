import {
  Home,
  BarChart3,
  Users,
  Truck,
  Package,
  Bell,
  Plug,
  KeyRound,
  Sliders,
  User,
  HelpCircle,
  LogOut,
  Star,
  Cog,
} from "lucide-react";
import {
  AppShell,
  LeftRail,
  RailLink,
  RailSectionTitle,
  TopBar,
  SearchBar,
  Toolbelt,
  Tile,
  PinStrip,
  PinChip,
  SectionHeader,
} from "@akira/design-system";

export function App() {
  return (
    <AppShell
      rail={
        <LeftRail appName="AKIRA OS" subtitle="Internal Apps">
          <RailSectionTitle>Workspace</RailSectionTitle>
          <RailLink label="Home" icon={<Home size={16} />} active count={5} />
          <RailLink label="Reports" icon={<BarChart3 size={16} />} count={4} />
          <RailLink label="Catalog" icon={<Package size={16} />} count={2} />
          <RailSectionTitle>Operations</RailSectionTitle>
          <RailLink label="Wire schedule" icon={<Truck size={16} />} count={3} />
          <RailLink label="Employee directory" icon={<Users size={16} />} count={1} />
        </LeftRail>
      }
      topBar={
        <TopBar
          center={<SearchBar placeholder="Search apps, people, docs…" />}
          end={
            <Toolbelt
              settings={[
                {
                  title: "Workspace",
                  items: [
                    { label: "General", icon: <Cog size={14} /> },
                    { label: "Notifications", icon: <Bell size={14} /> },
                    { label: "Integrations", icon: <Plug size={14} /> },
                  ],
                },
                {
                  title: "Admin",
                  items: [
                    { label: "Keyboard shortcuts", icon: <KeyRound size={14} /> },
                  ],
                },
              ]}
              profile={{
                name: "Rick Walter",
                email: "rwalter@shopakira.com",
                items: [
                  { label: "Your profile", icon: <User size={14} /> },
                  { label: "Preferences", icon: <Sliders size={14} /> },
                  { label: "Help", icon: <HelpCircle size={14} /> },
                  { label: "Sign out", icon: <LogOut size={14} />, divider: true },
                ],
              }}
            />
          }
        />
      }
    >
      <SectionHeader title="Pinned" subtitle="What you've starred" />
      <PinStrip>
        <PinChip label="Q4 Planning" icon={<Star size={12} />} />
        <PinChip label="Wire schedule" icon={<Truck size={12} />} />
        <PinChip label="Employee Directory" icon={<Users size={12} />} />
      </PinStrip>

      <SectionHeader title="Apps" subtitle="All AKIRA tools" />
      <div className="akira-tile-grid">
        <Tile
          kicker="HOME OFFICE"
          kickerIcon={<Users size={14} />}
          title="Employee Directory"
          description="Find anyone at AKIRA."
        />
        <Tile
          kicker="WAREHOUSE"
          kickerIcon={<Truck size={14} />}
          title="Wire Schedule"
          description="Today's wires & ETAs."
        />
        <Tile
          kicker="REPORTING"
          kickerIcon={<BarChart3 size={14} />}
          title="Sales by Channel"
          description="Last 30 days, all channels."
        />
        <Tile
          kicker="CATALOG"
          kickerIcon={<Package size={14} />}
          title="SKU Catalog"
          description="Master product list."
        />
      </div>
    </AppShell>
  );
}
