import { FC, SyntheticEvent, useState } from "react";
import CardWithHeading from "../../../common/sections/CardWithHeading";
import { Box, Tab, Tabs } from "@mui/material";
import { ChartFail, ChartSuccess } from "iconsax-react";
import EnhancedTable from "../../../common/table/EnhancedTable";

const ongoingPlansColumns = [
  {
    id: "action",
    label: "عملیات",
    numeric: false,
  },
  { id: "plan-type", label: "نوع طرح", numeric: false },
  { id: "start-date", label: "تاریخ شروع", numeric: false },
  { id: "end-date", label: "تاریخ پایان", numeric: false },
  { id: "investment-value", label: "مبلغ سرمایه", numeric: true },
  { id: "initial-profit-rate", label: "نرخ سود اولیه", numeric: true },
  { id: "management-contract-percentage", label: "درصد پیمان مدیریت", numeric: true },
  { id: "receive-profit-date", label: "تاریخ دریافت سود", numeric: false },
  { id: "received-profit", label: "سود دریافتی", numeric: true },
  { id: "received-profit-total", label: "مجموع سود دریافتی", numeric: true },
];

const ongoingPlansRows = [
  {
    id: 0,
    "plan-type": "سرمایه گذاری عادی",
    "start-date": "۱۴۰۱-۰۱-۰۱",
    "end-date": "۱۴۰۱-۰۱-۰۱",
    "investment-value": "۲۵۰۰۰۰",
    "initial-profit-rate": "۳٪",
    "management-contract-percentage": "۱۰٪",
    "receive-profit-date": "۱۴۰۱-۰۱-۰۱",
    "received-profit": "۲۵۰۰۰",
    "received-profit-total": "۳۲۰۰۰",
  },
  {
    id: 1,
    "plan-type": "سرمایه گذاری عادی",
    "start-date": "۱۴۰۱-۰۱-۰۱",
    "end-date": "۱۴۰۱-۰۱-۰۱",
    "investment-value": "۲۵۰۰۰۰",
    "initial-profit-rate": "۳٪",
    "management-contract-percentage": "۱۰٪",
    "receive-profit-date": "۱۴۰۱-۰۱-۰۱",
    "received-profit": "۲۵۰۰۰",
    "received-profit-total": "۳۲۰۰۰",
  },
  {
    id: 2,
    "plan-type": "سرمایه گذاری عادی",
    "start-date": "۱۴۰۱-۰۱-۰۱",
    "end-date": "۱۴۰۱-۰۱-۰۱",
    "investment-value": "۲۵۰۰۰۰",
    "initial-profit-rate": "۳٪",
    "management-contract-percentage": "۱۰٪",
    "receive-profit-date": "۱۴۰۱-۰۱-۰۱",
    "received-profit": "۲۵۰۰۰",
    "received-profit-total": "۳۲۰۰۰",
  },
];

type TabNameT = "ongoing-plans" | "ended-plans";

const InvestmentInformationSection: FC = () => {
  const [activeTab, setActiveTab] = useState<TabNameT>("ongoing-plans");

  const handleTabChange = (event: SyntheticEvent, newValue: TabNameT) => {
    setActiveTab(newValue);
  };

  return (
    <CardWithHeading title="اطلاعات سرمایه گذاری">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="جدول طرح‌های سرمایه گذاری"
          variant="fullWidth"
        >
          <Tab
            icon={
              activeTab === "ongoing-plans" ? (
                <ChartSuccess size={23} variant="Bold" />
              ) : (
                <ChartSuccess size={23} color="gray" variant="Linear" />
              )
            }
            iconPosition="start"
            label="سرمایه گذاری فعال"
            value="ongoing-plans"
            id="tab__ongoing-plans"
            aria-controls="tabpanel__ongoing-plans"
          />
          <Tab
            icon={
              activeTab === "ended-plans" ? (
                <ChartFail size={23} variant="Bold" />
              ) : (
                <ChartFail size={23} color="gray" variant="Linear" />
              )
            }
            iconPosition="start"
            label="سرمایه گذاری خاتمه یافته"
            value="ended-plans"
            id="tab__ended-plans"
            aria-controls="tabpanel__ended-plans"
          />
        </Tabs>

        <EnhancedTable columns={ongoingPlansColumns} rows={ongoingPlansRows} showCheckbox={false} />
      </Box>
    </CardWithHeading>
  );
};

export default InvestmentInformationSection;
