/* eslint-disable no-param-reassign */
import QueryString from 'query-string';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import DOMPurify from 'dompurify';
import classNames from 'classnames';
import potrace from 'potrace';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Button from '../../elements/button';
import Field, { ColorField, FileField } from '../../elements/field';
import TextArea from '../../elements/textArea';
import useActiveSidebarItem from '../../hooks/useActiveSidebarItem';
import { downloadFile, getFileAsText, getUniqueId, parseNumber } from '../../utils/helpers';
import { ActiveSidebarItem } from '../../types';
import scssObj from './_SVGCreator.scss';
import useGetEnvironment from '../../hooks/useGetEnvironment';
import useSetGlobalHeader from '../../hooks/useSetGlobalHeader';
import { Pages } from '../../utils/consts';
import ToggleBar from '../../elements/toggleBar';
import { selectConverterState } from '../../redux/converter';
import { selectFileDataById } from '../../redux/fileReader';
import useReselect from '../../hooks/useReselect';
import { FileObj } from '../../elements/field/types';

const SVGCreator = () => {
  useActiveSidebarItem(ActiveSidebarItem.IMGConverter);
  useSetGlobalHeader(Pages.SVG_CREATOR);
  const [height, setHeight] = useState<number>();
  const [width, setWidth] = useState<number>();
  const [threshold, setThreshold] = useState<number>();
  const [steps, setSteps] = useState<number>();
  const [svg, setSvg] = useState<string>('');
  const [svgElement, setSVGElement] = useState<SVGSVGElement | null>(null);
  const [reset, setReset] = useState(true);
  const svgRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [color, setColor] = useState<string>();
  const [backgroundColor, setBackgroundColor] = useState<string>();
  const { isProd } = useGetEnvironment();
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [toggle, setToggle] = useState<'potrace' | 'posterized'>('potrace');
  const { fromField } = useSelector(selectConverterState);
  const history = useHistory();

  const { id } = QueryString.parse(history.location.search, {
    decode: false,
  });
  const file = useReselect(selectFileDataById, { id: id || '' });

  const onFileUpload = (fileObj: FileObj | undefined) => {
    if (fileObj) {
      const fileBlob = new Blob([fileObj.file], { type: fileObj.type });
      setImageBlob(fileBlob);
      setImageURL(URL.createObjectURL(fileBlob));
    }
  };

  useEffect(() => {
    if (id) {
      onFileUpload(file);
    }
  }, [file, id]);

  const traceImage = () => {
    if (!imageURL) return;
    if (toggle === 'potrace') {
      const tracer = new potrace.Potrace();
      setSteps(undefined);
      setThreshold(threshold || -1);
      tracer.setParameters({
        threshold: threshold || -1,
        color,
      });

      tracer.loadImage(imageURL, (err: any) => {
        if (err) throw err;
        setReset(true);
        setSvg(tracer.getSVG());
      });
    } else {
      // Posterization
      setSteps(steps || -1);
      setThreshold(threshold || 200);
      const posterizer = new potrace.Posterizer({
        color,
        background: backgroundColor,
        steps: steps || -1,
        threshold: threshold || 200,
        // fillStrategy: posterizer.FILL_MEAN,
      });

      posterizer.loadImage(imageURL, (err: any) => {
        if (err) throw err;

        setReset(true);
        setSvg(posterizer.getSVG());
      });
    }
  };

  const downloadSVG = () => {
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      downloadFile(
        url,
        `${
          svgElement.id ||
          svgElement.getAttribute('name') ||
          svgElement.getAttribute('aria-label') ||
          'untitled'
        }.svg`,
      );
    }
  };

  const getSVG = () => {
    const svgContainer = svgRef.current;
    if (svgContainer) {
      svgContainer.innerHTML = svg;
      const svgE = svgContainer.querySelector('svg');
      if (svgE) {
        const { offsetHeight, offsetWidth } = svgContainer;
        if (offsetWidth <= 0) {
          svgE.setAttribute('width', '120');
        }
        if (offsetHeight <= 0) {
          svgE.setAttribute('height', '120');
        }
        const svgContainerNew = svgRef.current;
        const { offsetHeight: updatedHeight, offsetWidth: updatedWidth } = svgContainerNew;
        if (reset) {
          setWidth(updatedWidth);
          setHeight(updatedHeight);
          setReset(false);
        }
        setSVGElement(svgE.cloneNode(true) as SVGSVGElement);
      }
    }
  };

  const updateSVG = (newWidth?: number, newHeight?: number) => {
    if (svgElement) {
      const svgE = svgElement.cloneNode(true) as SVGSVGElement;
      svgE.setAttribute('width', `${newWidth || width}`);
      svgE.setAttribute('height', `${newHeight || height}`);

      const svgData = new XMLSerializer().serializeToString(svgE);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });

      getFileAsText(svgBlob).then((result) => setSvg(DOMPurify.sanitize(result as string)));
      setSVGElement(svgE);
    }
  };

  const renderFocus = () => <div className={`${scssObj.baseClass}__focus`} />;

  useEffect(() => {
    if (svg) getSVG();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svg, height, width]);

  return (
    <div>
      <Helmet>
        <title>SVG Creator</title>
        <meta name="title" content="SVG Creator | JYashu" />
        <meta name="description" content="A simple tool to convert images to SVG format." />
      </Helmet>
      <div className={`${scssObj.baseClass}`}>
        <div className={`${scssObj.baseClass}__file-upload`}>
          <div
            className={classNames(
              `${scssObj.baseClass}__file-upload-title`,
              `${scssObj.baseClass}__file-input-title`,
            )}
          >
            Upload Image Here
          </div>
          <div
            className={classNames(
              `${scssObj.baseClass}__file-upload-item`,
              `${scssObj.baseClass}__file-input-field`,
            )}
          >
            <FileField
              className={`${scssObj.baseClass}__file-input`}
              acceptedTypes={fromField ? [fromField] : fromField}
              onFileUpload={(fileObj: FileObj | undefined) => onFileUpload(fileObj)}
              placeHolder="Choose an Image or Drop it here"
              errorMessage="Upload Image file"
              restrictURL={isProd}
              charLength={30}
              fieldId={id || undefined}
            />
          </div>
          <div className={`${scssObj.baseClass}__file-upload-divider`} />

          <div
            className={classNames(
              `${scssObj.baseClass}__file-upload-title`,
              `${scssObj.baseClass}__file-text-title`,
            )}
          >
            SVG Output
          </div>
          <div
            className={classNames(
              `${scssObj.baseClass}__file-upload-item`,
              `${scssObj.baseClass}__file-text-field`,
            )}
          >
            <TextArea
              id="t"
              onChange={(e) => setSvg(DOMPurify.sanitize(e.target.value))}
              placeholder="SVG text output"
              value={svg}
            />
          </div>
        </div>
        <div className={`${scssObj.baseClass}__sandbox`}>
          {imageURL && (
            <img
              className={`${scssObj.baseClass}__canvas`}
              ref={imageRef}
              alt="uploaded"
              src={imageURL}
              width="auto"
              height={300}
            />
          )}
          <br />
          <ToggleBar
            className={`${scssObj.baseClass}__toggle`}
            setFieldValue={(value: 'potrace' | 'posterized') => setToggle(value)}
            options={[
              { label: 'Potrace', value: 'potrace', id: getUniqueId() },
              { label: 'Posterized', value: 'posterized', id: getUniqueId() },
            ]}
            focusValues={[0, 100]}
            focusWidth="100px"
            focusHeight="45px"
            value={toggle}
            renderFocus={renderFocus}
          />
          <Button
            className={`${scssObj.baseClass}__load-svg`}
            buttonStyle="skew"
            onClick={traceImage}
          >
            Load SVG
          </Button>
          <Button
            className={`${scssObj.baseClass}__download-svg`}
            buttonStyle="skew"
            onClick={downloadSVG}
            title={!svgElement ? 'Load the SVG before downloading' : 'Download SVG'}
            disabled={!svgElement}
          >
            Download SVG
          </Button>
          <br />
          <br />
          <ColorField
            className={`${scssObj.baseClass}__color-input`}
            defaultColor="#9a4c4c"
            onChange={setColor}
          />
          <ColorField
            className={`${scssObj.baseClass}__color-input-bg`}
            defaultColor="#ffffff"
            onChange={setBackgroundColor}
            placeHolder="Enter Background Color"
            disabled={toggle === 'potrace'}
          />
          <Field
            className={`${scssObj.baseClass}__steps`}
            label="Steps"
            placeholder="Steps"
            name="steps"
            id="s"
            type="number"
            max="5"
            min="0"
            onChange={(e) =>
              setSteps(() => {
                if (parseNumber(e.target.value) === undefined) return -1;
                if ((parseNumber(e.target.value) || 0) < 0) return 0;
                if ((parseNumber(e.target.value) || 0) > 5) return 5;
                return parseNumber(e.target.value);
              })
            }
            value={steps === -1 ? '' : steps}
            disabled={toggle === 'potrace'}
            popover="Number of samples that needs to be taken (and number of layers in SVG). (default: -1, which most likely will result in 3, sometimes 4)"
          />
          <Field
            className={`${scssObj.baseClass}__threshold`}
            label="Threshold"
            placeholder="Threshold"
            name="threshold"
            id="th"
            type="number"
            max="255"
            min="0"
            onChange={(e) =>
              setThreshold(() => {
                if (parseNumber(e.target.value) === undefined) return -1;
                if ((parseNumber(e.target.value) || 0) < 0) return 0;
                if ((parseNumber(e.target.value) || 0) > 255) return 255;
                return parseNumber(e.target.value);
              })
            }
            value={threshold === -1 ? '' : threshold}
            popover="Threshold below which color is considered black (0..255, default -1)"
          />
          <Field
            className={`${scssObj.baseClass}__dimensions-width`}
            label="Width"
            placeholder="Width"
            name="width"
            id="w"
            type="number"
            max="9999"
            min="0"
            onChange={(e) => {
              setWidth(() => {
                if ((parseNumber(e.target.value) || 0) < 0) return 0;
                return parseNumber(e.target.value);
              });

              updateSVG(parseNumber(e.target.value), height);
            }}
            value={width}
          />
          <Field
            className={`${scssObj.baseClass}__dimensions-height`}
            label="Height"
            placeholder="Height"
            name="height"
            id="h"
            type="number"
            max="9999"
            min="0"
            onChange={(e) => {
              setHeight(() => {
                if ((parseNumber(e.target.value) || 0) < 0) return 0;
                return parseNumber(e.target.value);
              });

              updateSVG(width, parseNumber(e.target.value));
            }}
            value={height}
          />
          <br />
          <div ref={svgRef} className={`${scssObj.baseClass}__svg`} />
        </div>
      </div>
    </div>
  );
};

export default SVGCreator;
