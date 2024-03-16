import { Img } from '../types';
import { WAVING_HAND } from './assets';

const images = new Map();
images.set(Img.Wave, <img src={WAVING_HAND} alt="Waving Hand" width="25px" height="25px" />);
images.set(Img.WaveLarge, <img src={WAVING_HAND} alt="Waving Hand" width="40px" height="40px" />);

export default images;
