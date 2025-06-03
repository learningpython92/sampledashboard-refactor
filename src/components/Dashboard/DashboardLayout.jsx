import Card from "../ui/Card";
import Dropdown from "../ui/Dropdown";
import TabSwitcher from "../ui/TabSwitcher";

const DashboardLayout = ({
  children,
  buOptions,
  selectedBU,
  onBUChange,
  selectedTab,
  onTabChange,
}) => (
  <div className="max-w-5xl mx-auto p-6 space-y-4">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">HR AI Dashboard</h1>
      <Dropdown options={buOptions} selected={selectedBU} onChange={onBUChange} />
    </div>
    <TabSwitcher
      tabs={["KPIs", "Insights"]}
      selectedTab={selectedTab}
      onTabChange={onTabChange}
    />
    {children}
  </div>
);

export default DashboardLayout;
