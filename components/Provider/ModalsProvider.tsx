import { ModalsProvider as MantineModalsProvider } from '@mantine/modals';
import { ImportGeoJSONModal } from '../Modals/ImportGeoJSONModal';

export const ModalsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MantineModalsProvider modals={{ importGeoJSONModal: ImportGeoJSONModal }}>
    {children}
  </MantineModalsProvider>
)