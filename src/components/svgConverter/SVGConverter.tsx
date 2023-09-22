/* eslint-disable no-param-reassign */
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import DOMPurify from 'dompurify';
import classNames from 'classnames';
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

const SVGConverter = () => {
  useActiveSidebarItem(ActiveSidebarItem.SVGConverter);
  useSetGlobalHeader(Pages.SVG_CONVERTER);
  const [height, setHeight] = useState<number>();
  const [width, setWidth] = useState<number>();
  const [svg, setSvg] = useState<string>('');
  const [svgElement, setSVGElement] = useState<SVGSVGElement | null>(null);
  const [svgElementOg, setSVGElementOg] = useState<SVGSVGElement | null>(null);
  const svgRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState<string>();
  const { isProd } = useGetEnvironment();

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

  const onFileUpload = (file: File | undefined) => {
    if (file) getFileAsText(file).then((result) => setSvg(DOMPurify.sanitize(result as string)));
    else setSvg('');
  };

  return (
    <div className={`${scssObj.baseClass}`}>
      <Helmet>
        <title>SVG Converter</title>
        <meta name="title" content="SVG Converter | JYashu" />
        <meta name="description" content="A simple tool to convert SVG images to PNG format." />
      </Helmet>
      <div>
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
              acceptedTypes={['image/svg+xml']}
              onFileUpload={(file: File | undefined) => onFileUpload(file)}
              placeHolder="Choose a SVG file or Drop it here"
              errorMessage="Upload SVG file"
              restrictURL={isProd}
              charLength={30}
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
          <Button
            className={`${scssObj.baseClass}__load-svg`}
            buttonStyle="normal"
            onClick={getSVG}
          >
            Load SVG
          </Button>
          <Button
            className={`${scssObj.baseClass}__download-svg`}
            buttonStyle="normal"
            onClick={downloadSVG}
          >
            Download SVG
          </Button>
          <br />
          <br />
          {/* <div className={`${scssObj.baseClass}__row`}> */}
          <ColorField className={`${scssObj.baseClass}__color-input`} onChange={setColor} />
          {/* </div> */}
          {/* <div className={`${scssObj.baseClass}__row`}> */}
          <div ref={svgRef} className={`${scssObj.baseClass}__svg`} />
          {/* </div> */}
          <br />
          <Field
            className={`${scssObj.baseClass}__dimensions-width`}
            label="Width"
            placeholder="Width"
            name="width"
            id="w"
            type="number"
            max="9999"
            onChange={(e) => setWidth(parseNumber(e.target.value))}
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
            onChange={(e) => setHeight(parseNumber(e.target.value))}
            value={height}
          />
          <br />
          <Button
            className={`${scssObj.baseClass}__load-png`}
            buttonStyle="normal"
            onClick={getPNG}
          >
            Load PNG
          </Button>
          <Button
            className={`${scssObj.baseClass}__download-png`}
            buttonStyle="normal"
            onClick={downloadPNG}
          >
            Download PNG
          </Button>
          <br />
          <br />
          {/* <div className={`${scssObj.baseClass}__row`}> */}
          <canvas className={`${scssObj.baseClass}__canvas`} ref={canvasRef} />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default SVGConverter;
