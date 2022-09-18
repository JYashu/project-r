import classNames from 'classnames';
import useActiveSidebarItem from '../../hooks/useActiveSidebarItem';
import useSetGlobalHeader from '../../hooks/useSetGlobalHeader';
import { ActiveSidebarItem } from '../../types';
import { ErrorValues, TouchedValues } from '../../utils/typeHelpers';
import Button from '../Button';
import Field from '../Field';
import Link from '../Link';
import { Values } from './types';
import scssObj from './_GiphySearchEngine.scss';

interface Props {
  data: any;
  isLoading: boolean;
  error?: string | null;
  isSubmitting?: boolean;
  isValid: boolean;
  values: Values;
  errors: ErrorValues<Values>;
  touched: TouchedValues<Values>;
  handleBlur: (e: React.FocusEvent) => void;
  handleChange: (e: React.ChangeEvent) => void;
  handleSubmit: () => void;
}

const Cube = () => {
  return (
    <div className={`${scssObj.baseClass}__cube`}>
      <div className="cube">
        <div className="side back">
          <img
            src="https://media2.giphy.com/media/ICOgUNjpvO0PC/giphy.gif?cid=5b3312e6pppeu6yj10y5b9ihfwofc53ubj2atreb9w09g24p&rid=giphy.gif&ct=g"
            width="140px"
            height="140px"
            className="giphy-embed"
            alt="gif display"
          />
        </div>
        <div className="side left">
          <img
            src="https://media1.giphy.com/media/AUYhIMdGrg23e/giphy.gif?cid=5b3312e6d335b4sgwv1xdqmwu91ehiygmc4udczslsdtk2pf&rid=giphy.gif&ct=g"
            width="140px"
            height="140px"
            className="giphy-embed"
            alt="gif display"
          />
        </div>
        <div className="side top">
          <img
            src="https://media4.giphy.com/media/jOmQmJkjcvB3Bc8CRb/giphy.gif?cid=5b3312e6itmncuiaq32scm45s5iwzcxbjaodtuh1mcllmtbw&rid=giphy.gif&ct=g"
            width="140px"
            height="140px"
            className="giphy-embed"
            alt="gif display"
          />
        </div>
        <div className="side right">
          <img
            src="https://media2.giphy.com/media/xTiTnHvXHHxOTcdmxO/giphy.gif?cid=5b3312e6leocxbgyepk8lr9mc0cn1ty8n20przfwoif3rd6v&rid=giphy.gif&ct=g"
            width="140px"
            height="140px"
            className="giphy-embed"
            alt="gif display"
          />
        </div>
        <div className="side bottom">
          <img
            src="https://media1.giphy.com/media/w7CP59oLYw6PK/giphy.gif?cid=5b3312e69rh348bun9etiion46389utpwztt0tbnda3kx8f9&rid=giphy.gif&ct=g"
            width="140px"
            height="140px"
            className="giphy-embed"
            alt="gif display"
          />
        </div>
        <div className="side front">
          <img
            src="https://media0.giphy.com/media/oW4csEbiMzVjq/giphy.gif?cid=5b3312e6vmag22izjyy17vt348gs6r6rawwohg8ogihn99y6&rid=giphy.gif&ct=g"
            width="140px"
            height="140px"
            className="giphy-embed"
            alt="gif display"
          />
        </div>
      </div>
    </div>
  );
};

const GiphySearchEngine = ({
  data,
  isLoading,
  error,
  isSubmitting,
  isValid,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
}: Props) => {
  useActiveSidebarItem(ActiveSidebarItem.GiphyEngine);
  useSetGlobalHeader('Giphy Engine');

  return (
    <div className={`${scssObj.baseClass}`}>
      <div className={`${scssObj.baseClass}__main`}>
        <div className={`${scssObj.baseClass}__info`}>
          <div className={`${scssObj.baseClass}__head`}>Giphy Search</div>
          <Cube />
        </div>
        <form
          className={`${scssObj.baseClass}__form`}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Field
            name="query"
            placeholder="KeyWord"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.query}
            errorMessage={errors.query}
            touched={touched.query}
            isRound
            canSubmit
            // submitButton={() => <Button type="submit">Helo</Button>}
          />
          {/* <input
            type="submit"
            className={`${scssObj.baseClass}__search-button`}
            value="Go"
          /> */}
        </form>
      </div>
      <div className={`${scssObj.baseClass}__result`}>
        {data &&
          data.map((element: any) => {
            return (
              <div className={`${scssObj.baseClass}__gif`}>
                <div className={`${scssObj.baseClass}__gif-container`}>
                  <picture className={classNames(`${scssObj.baseClass}__content`, 'data')}>
                    <img
                      className={`${scssObj.baseClass}__image`}
                      src={element.images.fixed_height_downsampled.url}
                      height="200px"
                      width="200px"
                      alt="result gif"
                    />
                  </picture>
                  <div className="overlay" />
                  <div className="details">
                    <div className={`${scssObj.baseClass}__link-holder`}>
                      <Link isNative to={element.url} target="_blank">
                        <Button buttonStyle="abstract" isRound>
                          Giphy
                        </Button>
                      </Link>
                    </div>
                    <div className={`${scssObj.baseClass}__link-holder`}>
                      <Link isNative to={element.source_post_url} target="_blank">
                        <Button buttonStyle="abstract" isRound>
                          Original
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default GiphySearchEngine;
