import dynamic from 'next/dynamic';
import type { NextPage } from 'next'
import ThemeProvider from '../components/Provider/ThemeProvider';
import { createStyles, ScrollArea, Tabs } from '@mantine/core';
import { Settings as SettingsPage } from '../components/Settings';
import { Adjustments, Camera, Settings, Table } from 'tabler-icons-react';
import { Options } from '../components/Options';
import { MapsProvider } from '../components/Provider/MapsProvider';

const MapWithNoSSR = dynamic(() => import("../components/Maps/Map"), { ssr: false });

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.breakpoints.lg
  return {
    container: {
      [theme.fn.largerThan(BREAKPOINT)]: {
        display: 'flex',
        height: '100vh',
      },
    },
    map_container: {
      flex: 1,
      backgroundColor: 'white',

      [theme.fn.smallerThan(BREAKPOINT)]: {
        display: 'flex',
        height: '75vh',
      },
    },
    sidebar_container: {
      width: '100%',
      padding: theme.spacing.xs,

      [theme.fn.largerThan(BREAKPOINT)]: {
        maxWidth: theme.breakpoints.xs,
      },
    },
    tab_body: {
      padding: theme.spacing.md,
      height: `calc(100vh - ${40 + 2 * theme.spacing.xs}px)`,
      display: 'flex',
      flexDirection: 'column'
    }
  };
});

const Home: NextPage = () => {
  const { classes } = useStyles();

  return (
    <ThemeProvider>
      <MapsProvider>
        <div className={classes.container}>
          <div className={classes.map_container}>
            <MapWithNoSSR />
          </div>
          <div className={classes.sidebar_container}>
            <Tabs classNames={{ body: classes.tab_body }}>
              <Tabs.Tab label="Data" icon={<Table size={14} />}>
                <ScrollArea sx={{ flex: 1 }} type="scroll" scrollHideDelay={200} scrollbarSize={5} >
                  Data
                </ScrollArea>
              </Tabs.Tab>
              <Tabs.Tab label="Options" icon={<Adjustments size={14} />}>
                <ScrollArea sx={{ flex: 1 }} type="scroll" scrollHideDelay={200} scrollbarSize={5} >
                  <Options />
                </ScrollArea>
              </Tabs.Tab>
              <Tabs.Tab label="Screenshoot" icon={<Camera size={14} />}>
                <ScrollArea sx={{ flex: 1 }} type="scroll" scrollHideDelay={200} scrollbarSize={5} >
                  Screenshoot
                </ScrollArea>
              </Tabs.Tab>
              <Tabs.Tab label="Settings" icon={<Settings size={14} />}>
                <ScrollArea sx={{ flex: 1 }} type="scroll" scrollHideDelay={200} scrollbarSize={5} >
                  <SettingsPage />
                </ScrollArea>
              </Tabs.Tab>
            </Tabs>
          </div>
        </div>
      </MapsProvider>
    </ThemeProvider>
  )
}

export default Home
