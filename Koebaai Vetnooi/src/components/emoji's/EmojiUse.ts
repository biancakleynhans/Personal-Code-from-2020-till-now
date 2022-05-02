/** @format */

import { convertObjectToArray } from '../../services/ownServices/ConverterFuncs';
import Angel from './smileys/smiley_angel.png';
import Angry from './smileys/smiley_angry.png';
import Blush from './smileys/smiley_blush.png';
import Clown from './smileys/smiley_clown.png';
import Cry from './smileys/smiley_crying.png';
import Dead from './smileys/smiley_dead.png';
import Devil from './smileys/smiley_devil.png';
import Embarassed from './smileys/smiley_embarassed.png';
import Glasses from './smileys/smiley_glasses.png';
import Gota from './smileys/smiley_gota.png';
import Grin from './smileys/smiley_grin.png';
import Happy from './smileys/smiley_happy.png';
import InLove from './smileys/smiley_in_love.png';
import Kiss from './smileys/smiley_kiss.png';
import Nerd from './smileys/smiley_nerd.png';
import Neutral from './smileys/smiley_neutral_face.png';
import NoWords from './smileys/smiley_no_words.png';
import Tonugue from './smileys/smiley_out_tongue.png';
import Rainbow from './smileys/smiley_rainbow.png';
import Sad from './smileys/smiley_sad.png';
import Sick from './smileys/smiley_sick.png';
import Skull from './smileys/smiley_skull.png';
import Sleep from './smileys/smiley_sleep.png';
import Smile from './smileys/smiley_smile.png';
import Surprise from './smileys/smiley_surprise.png';
import TDFW from './smileys/smiley_TDFW.png';
import Teeth from './smileys/smiley_teeth.png';
import SideTongue from './smileys/smiley_tongue_side.png';
import Upset from './smileys/smiley_upset.png';
import Winking from './smileys/smiley_winking.png';

import FBLike from './ICON8/fb_Like.png';
import InLove2 from './ICON8/smilley_in_love2.png';

import HEART from './IOCON8 Animated/heart.gif';
import FB_LIKE from './IOCON8 Animated/fb_Like.gif';
import DISAPPOINTED from './IOCON8 Animated/disappointed.gif';
import LAUGHING from './IOCON8 Animated/laughing.gif';

import { GetAppSettings } from '../../services/ownServices/AppSettings';

export interface i_Emoji {
	name: string;
	internal: string;
	external: string;
}

export const EmojiConst = {
	Angel: {
		name: 'Angel',
		internal: Angel,
		external:
			GetAppSettings().other.appbaseUrl + '/Emoji%2F/smiley_angel.png?alt=media'
	} as i_Emoji,
	Angry: {
		name: 'Angry',
		internal: Angry,
		external:
			GetAppSettings().other.appbaseUrl + '/Emoji%2F/smiley_angry.png?alt=media'
	} as i_Emoji,
	Blush: {
		name: 'Blush',
		internal: Blush,
		external:
			GetAppSettings().other.appbaseUrl + '/Emoji%2F/smiley_blush.png?alt=media'
	} as i_Emoji,
	Clown: {
		name: 'Clown',
		internal: Clown,
		external:
			GetAppSettings().other.appbaseUrl + '/Emoji%2F/smiley_clown.png?alt=media'
	} as i_Emoji,
	Cry: {
		name: 'Cry, ',
		internal: Cry,
		external:
			GetAppSettings().other.appbaseUrl +
			'/Emoji%2F/smiley_crying.png?alt=media'
	} as i_Emoji,
	Dead: {
		name: 'Dead',
		internal: Dead,
		external:
			GetAppSettings().other.appbaseUrl + '/Emoji%2F/smiley_dead.png?alt=media'
	} as i_Emoji,
	Devil: {
		name: 'Devil',
		internal: Devil,
		external:
			GetAppSettings().other.appbaseUrl + '/Emoji%2F/smiley_devil.png?alt=media'
	} as i_Emoji,
	Embarassed: {
		name: 'Embarassed',
		internal: Embarassed,
		external:
			GetAppSettings().other.appbaseUrl +
			'/Emoji%2F/smiley_embarassed.png?alt=media'
	} as i_Emoji,
	Glasses: {
		name: 'Glasses',
		internal: Glasses,
		external:
			GetAppSettings().other.appbaseUrl +
			'/Emoji%2F/smiley_glasses.png?alt=media'
	} as i_Emoji,
	Gota: {
		name: 'Gota',
		internal: Gota,
		external:
			GetAppSettings().other.appbaseUrl + '/Emoji%2F/smiley_gota.png?alt=media'
	} as i_Emoji,
	Grin: {
		name: 'Grin',
		internal: Grin,
		external:
			GetAppSettings().other.appbaseUrl + '/Emoji%2F/smiley_grin.png?alt=media'
	} as i_Emoji,
	Happy: {
		name: 'Happy',
		internal: Happy,
		external:
			GetAppSettings().other.appbaseUrl + '/Emoji%2F/smiley_happy.png?alt=media'
	} as i_Emoji,
	InLove: {
		name: 'InLove',
		internal: InLove,
		external:
			GetAppSettings().other.appbaseUrl +
			'/Emoji%2F/smiley_in_love.png?alt=media'
	} as i_Emoji,
	Kiss: {
		name: 'Kiss',
		internal: Kiss,
		external:
			GetAppSettings().other.appbaseUrl + '/Emoji%2F/smiley_kiss.png?alt=media'
	} as i_Emoji,
	Nerd: {
		name: 'Nerd',
		internal: Nerd,
		external:
			GetAppSettings().other.appbaseUrl + '/Emoji%2F/smiley_nerd.png?alt=media'
	} as i_Emoji,
	Neutral: {
		name: 'Neutral',
		internal: Neutral,
		external:
			GetAppSettings().other.appbaseUrl +
			'/Emoji%2F/smiley_neutral_face.png?alt=media'
	} as i_Emoji,
	NoWords: {
		name: 'NoWords',
		internal: NoWords,
		external:
			GetAppSettings().other.appbaseUrl +
			'/Emoji%2F/smiley_no_words.png?alt=media'
	} as i_Emoji,
	Tonugue: {
		name: 'Tonugue',
		internal: Tonugue,
		external:
			GetAppSettings().other.appbaseUrl +
			'/Emoji%2F/smiley_out_tongue.png?alt=media'
	} as i_Emoji,
	Rainbow: {
		name: 'Rainbow',
		internal: Rainbow,
		external:
			GetAppSettings().other.appbaseUrl +
			'/Emoji%2F/smiley_rainbow.png?alt=media'
	} as i_Emoji,
	Sad: {
		name: 'Sad',
		internal: Sad,
		external:
			GetAppSettings().other.appbaseUrl + '/Emoji%2F/smiley_sad.png?alt=media'
	} as i_Emoji,
	Sick: {
		name: 'Sick',
		internal: Sick,
		external:
			GetAppSettings().other.appbaseUrl + '/Emoji%2F/smiley_sick.png?alt=media'
	} as i_Emoji,
	Skull: {
		name: 'Skull',
		internal: Skull,
		external:
			GetAppSettings().other.appbaseUrl + '/Emoji%2F/smiley_skull.png?alt=media'
	} as i_Emoji,
	Sleep: {
		name: 'Sleep',
		internal: Sleep,
		external:
			GetAppSettings().other.appbaseUrl + '/Emoji%2F/smiley_sleep.png?alt=media'
	} as i_Emoji,
	Smile: {
		name: 'Smile',
		internal: Smile,
		external:
			GetAppSettings().other.appbaseUrl + '/Emoji%2F/smiley_smile.png?alt=media'
	} as i_Emoji,
	Surprise: {
		name: 'Surprise',
		internal: Surprise,
		external:
			GetAppSettings().other.appbaseUrl +
			'/Emoji%2F/smiley_surprise.png?alt=media'
	} as i_Emoji,
	TDFW: {
		name: 'TDFW',
		internal: TDFW,
		external:
			GetAppSettings().other.appbaseUrl + '/Emoji%2F/smiley_TDFW.png?alt=media'
	} as i_Emoji,
	Teeth: {
		name: 'Teeth',
		internal: Teeth,
		external:
			GetAppSettings().other.appbaseUrl + '/Emoji%2F/smiley_teeth.png?alt=media'
	},
	SideTongue: {
		name: 'SideTongue',
		internal: SideTongue,
		external:
			GetAppSettings().other.appbaseUrl +
			'/Emoji%2F/smiley_tongue_side.png?alt=media'
	} as i_Emoji,
	Upset: {
		name: 'Upset',
		internal: Upset,
		external:
			GetAppSettings().other.appbaseUrl + '/Emoji%2F/smiley_upset.png?alt=media'
	} as i_Emoji,
	Winking: {
		name: 'Winking',
		internal: Winking,
		external:
			GetAppSettings().other.appbaseUrl +
			'/Emoji%2F/smiley_winking.png?alt=media'
	} as i_Emoji
};

export const OtherEmojiConst = {
	FBLike: {
		name: 'FBLike',
		internal: FBLike,
		external: ''
	} as i_Emoji,
	InLove2: {
		name: 'InLove2',
		internal: InLove2,
		external: ''
	} as i_Emoji
};

export const AnimatedEmojiConst = {
	FB_LIKE: {
		name: 'FB_LIKE',
		internal: FB_LIKE,
		external: ''
	} as i_Emoji,

	HEART: {
		name: 'HEART',
		internal: HEART,
		external: ''
	} as i_Emoji,

	DISAPPOINTED: {
		name: 'DISAPPOINTED',
		internal: DISAPPOINTED,
		external: ''
	} as i_Emoji,

	LAUGHING: {
		name: 'LAUGHING',
		internal: LAUGHING,
		external: ''
	} as i_Emoji
};

export const Emoji = convertObjectToArray(EmojiConst);
export const AnimatedEmoji = convertObjectToArray(AnimatedEmojiConst);
