/* eslint-disable no-param-reassign */
import QueryString from 'query-string';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import DOMPurify from 'dompurify';
import classNames from 'classnames';
import { useHistory } from 'react-router';
import Button from '../../elements/button';
import Field, { ColorField, FileField } from '../../elements/field';
import TextArea from '../../elements/textArea';
import useActiveSidebarItem from '../../hooks/useActiveSidebarItem';
import { downloadFile, getFileAsText, parseNumber } from '../../utils/helpers';
import { ActiveSidebarItem, StyledElement } from '../../types';
import scssObj from './_SVGConverter.scss';
import useGetEnvironment from '../../hooks/useGetEnvironment';
import useSetGlobalHeader from '../../hooks/useSetGlobalHeader';
import { Pages } from '../../utils/consts';
import { FileObj, FileType } from '../../elements/field/types';
import useReselect from '../../hooks/useReselect';
import { selectFileDataById } from '../../redux/fileReader';

const SVGConverter = () => {
  useActiveSidebarItem(ActiveSidebarItem.IMGConverter);
  useSetGlobalHeader(Pages.SVG_CONVERTER);
  const [height, setHeight] = useState<number>();
  const [width, setWidth] = useState<number>();
  const [svg, setSvg] = useState<string>('');
  const [svgElement, setSVGElement] = useState<SVGSVGElement | null>(null);
  const [svgElementOg, setSVGElementOg] = useState<SVGSVGElement | null>(null);
  const svgRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState<string>();
  const [isCanvasLoaded, setCanvasLoaded] = useState(false);
  const { isProd } = useGetEnvironment();
  const history = useHistory();

  const { id } = QueryString.parse(history.location.search, {
    decode: false,
  });
  const file = useReselect(selectFileDataById, { id: id || '' });

  const onFileUpload = (fileObj: FileObj | undefined) => {
    if (fileObj && fileObj.file)
      getFileAsText(fileObj.file).then((result) => setSvg(DOMPurify.sanitize(result as string)));
    else setSvg('');
  };

  useEffect(() => {
    if (id) {
      onFileUpload(file);
    }
  }, [file, id]);

  useEffect(() => {
    if (svgElement && svgElementOg && color) {
      svgElementOg.style.fill = color;
      svgElement.style.fill = color;
      const elementsOg = svgElementOg.querySelectorAll('*');
      const elements = svgElement.querySelectorAll('*');
      if (elements && elementsOg) {
        elementsOg.forEach((element: Element) => {
          (element as StyledElement).style.fill = color;
        });
        elements.forEach((element: Element) => {
          (element as StyledElement).style.fill = color;
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

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
        setWidth(updatedWidth);
        setHeight(updatedHeight);
        setSVGElementOg(svgE);
        setSVGElement(svgE.cloneNode(true) as SVGSVGElement);
      }
    }
  };

  const getPNG = () => {
    const canvas = canvasRef.current;
    if (canvas && svgElement) {
      canvas.width = width || 0;
      canvas.height = height || 0;
      svgElement.setAttribute('width', `${width}`);
      svgElement.setAttribute('height', `${height}`);
      const data = new XMLSerializer().serializeToString(svgElement);
      const win = window.URL || window.webkitURL || window;
      const img = new Image();
      const blob = new Blob([data], { type: 'image/svg+xml' });
      const url = win.createObjectURL(blob);
      if (canvas) {
        img.onload = () => {
          canvas.getContext('2d')?.drawImage(img, 0, 0);
          win.revokeObjectURL(url);
        };
      }
      img.src = url;
      setCanvasLoaded(true);
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

  const downloadPNG = () => {
    const canvas = canvasRef.current;
    if (canvas && svgElement) {
      const uri = canvas.toDataURL('image/png').replace('image/png', 'octet/stream');
      downloadFile(
        uri,
        `${
          svgElement.id ||
          svgElement.getAttribute('name') ||
          svgElement.getAttribute('aria-label') ||
          'untitled'
        }.png`,
      );
    }
  };

  return (
    <div>
      <Helmet>
        <title>SVG Converter</title>
        <meta name="title" content="SVG Converter | JYashu" />
        <meta name="description" content="A simple tool to convert SVG images to PNG format." />
      </Helmet>
      <div className={`${scssObj.baseClass}`}>
        <div className={`${scssObj.baseClass}__file-upload`}>
          <div
            className={classNames(
              `${scssObj.baseClass}__file-upload-title`,
              `${scssObj.baseClass}__file-input-title`,
            )}
          >
            Upload SVG Here
          </div>
          <div
            className={classNames(
              `${scssObj.baseClass}__file-upload-title`,
              `${scssObj.baseClass}__file-separator-title`,
            )}
          >
            OR
          </div>
          <div
            className={classNames(
              `${scssObj.baseClass}__file-upload-title`,
              `${scssObj.baseClass}__file-text-title`,
            )}
          >
            Paste SVG Here
          </div>
          <div
            className={classNames(
              `${scssObj.baseClass}__file-upload-item`,
              `${scssObj.baseClass}__file-input-field`,
            )}
          >
            <FileField
              className={`${scssObj.baseClass}__file-input`}
              acceptedTypes={[FileType.SVG]}
              onFileUpload={(fileObj: FileObj | undefined) => onFileUpload(fileObj)}
              placeHolder="Choose a SVG file or Drop it here"
              errorMessage="Upload SVG file"
              restrictURL={isProd}
              charLength={30}
              fieldId={id || undefined}
            />
          </div>
          <div className={`${scssObj.baseClass}__file-upload-divider`} />
          <div
            className={classNames(
              `${scssObj.baseClass}__file-upload-item`,
              `${scssObj.baseClass}__file-text-field`,
            )}
          >
            <TextArea
              id="t"
              onChange={(e) => setSvg(DOMPurify.sanitize(e.target.value))}
              placeholder="Enter SVG text here"
              value={svg}
            />
          </div>
        </div>
        <div className={`${scssObj.baseClass}__sandbox`}>
          <br />
          <Button className={`${scssObj.baseClass}__load-svg`} buttonStyle="skew" onClick={getSVG}>
            Load SVG
          </Button>
          <Button
            className={`${scssObj.baseClass}__download-svg`}
            buttonStyle="skew"
            onClick={downloadSVG}
          >
            Download SVG
          </Button>
          <br />
          <br />
          <ColorField className={`${scssObj.baseClass}__color-input`} onChange={setColor} />
          <div ref={svgRef} className={`${scssObj.baseClass}__svg`} />
          <br />
          <Field
            className={`${scssObj.baseClass}__dimensions-width`}
            label="Width"
            placeholder="Width"
            name="width"
            id="w"
            type="number"
            max="9999"
            min="0"
            onChange={(e) =>
              setWidth(() => {
                if ((parseNumber(e.target.value) || 0) < 0) return 0;
                return parseNumber(e.target.value);
              })
            }
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
            onChange={(e) =>
              setHeight(() => {
                if ((parseNumber(e.target.value) || 0) < 0) return 0;
                return parseNumber(e.target.value);
              })
            }
            value={height}
          />
          <br />
          <Button className={`${scssObj.baseClass}__load-png`} buttonStyle="skew" onClick={getPNG}>
            Load PNG
          </Button>
          <Button
            className={`${scssObj.baseClass}__download-png`}
            buttonStyle="skew"
            onClick={downloadPNG}
            disabled={!isCanvasLoaded}
            title={!isCanvasLoaded ? 'Load the PNG before downloading' : 'Download PNG'}
          >
            Download PNG
          </Button>
          <br />
          <br />
          <canvas className={`${scssObj.baseClass}__canvas`} ref={canvasRef} />
        </div>
      </div>
    </div>
  );
};

export default SVGConverter;
