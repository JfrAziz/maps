import { useContext } from 'react';
import { useModals } from '@mantine/modals';
import { Button, Text } from '@mantine/core';
import { GeoJSONFileImport } from '@components/Import/GeoJSONFileImport';
import { GeoJSONContext } from '@context/GeoJSONContext';
import { ModalsContextProps } from '@mantine/modals/lib/context';


const ImportModalBody: React.FC<{ modals : ModalsContextProps }> = ({ modals }) => <GeoJSONFileImport callback={() => modals.closeAll()} />

export function ImportGeoJSONBtn() {
  const modals = useModals();
  const { mapKey } = useContext(GeoJSONContext)

  const openContextModal = () => {
    const openImportGeoJSONModal = () => modals.openModal({
      title: 'Subscribe to newsletter',
      size: 'xl',
      centered: true,
      onClose: () => modals.closeAll(),
      children: <ImportModalBody modals={modals} />,
    });

    if (!mapKey) return openImportGeoJSONModal()

    return modals.openConfirmModal({
      title: 'Import a new GeoJSON Collection',
      closeOnConfirm: false,
      closeOnCancel: true,
      centered: true,
      labels: { confirm: 'Continue', cancel: 'Cancel' },
      children: <Text size="sm">This will reset current GeoJSON data</Text>,
      onConfirm: openImportGeoJSONModal,
    });
  }

  return <Button onClick={openContextModal}>Import Data</Button>;
}