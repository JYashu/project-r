import { useState } from 'react';
import Switch from 'react-switch';
import useActiveSidebarItem from '../../hooks/useActiveSidebarItem';
import useSetGlobalHeader from '../../hooks/useSetGlobalHeader';
import useTimeout from '../../hooks/useTimeout';
import { ActiveSidebarItem, Config } from '../../types';
import Button from '../../elements/button';
import LoadingSpinner from '../../elements/loadingSpinner';
import scssObj from './_Settings.scss';
import Field from '../../elements/field';
import { ACCESS_CODE, ACCESS_FIELD_TOKEN, ACCESS_TOKEN } from '../../utils/consts';
import { encryptString, decryptString } from '../../utils/encrypt';

interface Props {
  config: Config;
  handleSettingsChange: (newConfig: Config) => void;
  handleAccessCode: (access: { devAccess?: boolean; apiAccess?: boolean }) => void;
}

const Settings = ({ config, handleSettingsChange, handleAccessCode }: Props) => {
  const [loading, setLoading] = useState(true);
  const [accessCode, setAccessCode] = useState('');
  const [apiAccessCode, setApiAccessCode] = useState('');
  const [accessFieldsCode, setAccessFieldsCode] = useState('');
  const [showAccessFields, setShowAccessFields] = useState(false);

  useTimeout(() => setLoading(false), 1800);

  useActiveSidebarItem(ActiveSidebarItem.Settings);
  useSetGlobalHeader('Settings');

  const updateConfig = (newConfig: Config) => {
    handleSettingsChange(newConfig);
  };

  const handleSetAccessFieldsCode = () => {
    try {
      decryptString(accessFieldsCode, ACCESS_FIELD_TOKEN).then((response) => {
        if (response === ACCESS_CODE) {
          setShowAccessFields(true);
        } else setShowAccessFields(false);
      });
    } catch (e) {
      setShowAccessFields(false);
    }
  };

  const handleSetAccessCode = () => {
    try {
      decryptString(accessCode, ACCESS_TOKEN).then((response) => {
        if (response === ACCESS_CODE) {
          handleAccessCode({ devAccess: true });
        } else handleAccessCode({ devAccess: false });
      });
    } catch (e) {
      handleAccessCode({ devAccess: false });
    }
  };

  const handleSetApiAccessCode = () => {
    if (apiAccessCode === ACCESS_CODE) {
      localStorage.setItem('apiAccess', ACCESS_CODE);
      handleAccessCode({ apiAccess: true });
    } else if (apiAccessCode) {
      localStorage.removeItem('apiAccess');
      handleAccessCode({ apiAccess: false });
    }
  };

  const applyConfig = () => {
    handleSetAccessCode();
    handleSetApiAccessCode();
    localStorage.setItem(
      'config',
      JSON.stringify({
        ...config,
      }),
    );
    // window.location.reload();
  };

  const downloadFile = () => {
    // create file in browser
    const fileName = 'config';
    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);

    // create "a" HTML element with href to file
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
            <div className={`${scssObj.baseClass}__field-group`}>
              <div className={`${scssObj.baseClass}__label`}>12 Hour Format</div>
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
            </div>
            <Field
              className={`${scssObj.baseClass}__field`}
              name="access-field-code"
              onChange={(e) => setAccessFieldsCode(e.target.value)}
              onBlur={handleSetAccessFieldsCode}
              value={accessFieldsCode}
              label="Access Field Code"
              placeholder="Access Field Code"
              type="password"
            />
            {showAccessFields && (
              <div className={`${scssObj.baseClass}__field-group`}>
                <Field
                  className={`${scssObj.baseClass}__field`}
                  name="access-code"
                  onChange={(e) => setAccessCode(e.target.value)}
                  onBlur={handleSetAccessCode}
                  value={accessCode}
                  label="Access Code"
                  placeholder="Access Code"
                  type="password"
                />
                <Field
                  className={`${scssObj.baseClass}__field`}
                  name="api-access-code"
                  onChange={(e) => setApiAccessCode(e.target.value)}
                  value={apiAccessCode}
                  label="Api Access Code"
                  placeholder="Api Access Code"
                  type="password"
                />
              </div>
            )}
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
