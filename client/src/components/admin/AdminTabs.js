import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import AdminTableTab from './AdminTableTab';
import AdminMenuTab from './AdminMenuTab';

export default function AdminTabs() {
  return (
    <Tabs
      aria-label='Vertical tabs'
      orientation='vertical'
      sx={{ minWidth: 300, height: 826 }}
    >
      <TabList>
        <Tab>Table</Tab>
        <Tab>Menu</Tab>
      </TabList>
      <TabPanel value={0}>
        <AdminTableTab />
      </TabPanel>
      <TabPanel value={1}>
        <AdminMenuTab />
      </TabPanel>
    </Tabs>
  );
}
