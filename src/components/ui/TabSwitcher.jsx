const TabSwitcher = ({ tabs, selectedTab, onTabChange }) => (
    <div className="flex space-x-4 border-b">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`pb-2 ${
            selectedTab === tab
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
  
  export default TabSwitcher;
  