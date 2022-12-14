import { useEffect, useState } from 'react';
import Switch from 'react-switch';
import useActiveSidebarItem from '../../hooks/useActiveSidebarItem';
import useSetGlobalHeader from '../../hooks/useSetGlobalHeader';
import useTimeout from '../../hooks/useTimeout';
import { ActiveSidebarItem, Config } from '../../types';
import Button from '../../elements/button';
import LoadingSpinner from '../../elements/loadingSpinner';
import scssObj from './_Settings.scss';

interface Props {
  config: Config;
  handleSettingsChange: (newConfig: Config) => void;
}

const Settings = ({ config, handleSettingsChange }: Props) => {
  const [loading, setLoading] = useState(true);

  useTimeout(() => setLoading(false), 1800);

  useActiveSidebarItem(ActiveSidebarItem.Settings);
  useSetGlobalHeader('Settings');

  const updateConfig = (newConfig: Config) => {
    handleSettingsChange(newConfig);
  };

  const applyConfig = () => {
    localStorage.setItem('config', JSON.stringify(config));
    window.location.reload();
  };

  const downloadFile = () => {
    // create file in browser
    const fileName = 'config';
    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);

    // create "a" HTLM element with href to file
    const link = document.createElement('a');
    link.href = href;
    link.download = `${fileName}.json`;
    document.body.appendChild(link);
    // link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  return (
    <div className={`${scssObj.baseClass}`}>
      <div className={`${scssObj.baseClass}__container`}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className={`${scssObj.baseClass}__glass`}>
            <div>12 Hour Format</div>
            <Switch
              height={16}
              width={30}
              checkedIcon={false}
              uncheckedIcon={false}
              onChange={() => {
                updateConfig({
                  ...config,
                  clock: { format12h: !config.clock.format12h },
                });
              }}
              checked={config.clock.format12h}
              onColor="#219de9"
              offColor="#bbbbbb"
            />
            <div />
            <Button buttonStyle="glossy" size="small" onClick={applyConfig} rounded>
              Apply
            </Button>
            <Button
              buttonStyle="glossy"
              size="small"
              icon="file_download"
              onClick={downloadFile}
              rounded
            >
              Download Json
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
