import { convertObjectToArray } from '../../services/ownServices/ConverterFuncs';
import { GetAppSettings } from '../../services/ownServices/AppSettings';

import Happy from './smileys/smiley_happy.png';
import InLove from './smileys/smiley_in_love.png';
import Sad from './smileys/smiley_sad.png';
import FBLike from './smileys/fb_Like.png';
import HEART from './smileys/heart.gif';
import FB_LIKE from './smileys/fb_Like.gif';
import DISAPPOINTED from './smileys/disappointed.gif';
import LAUGHING from './smileys/laughing.gif';

export interface i_Emoji {
	name: string;
	internal: string;
	external: string;
}

export const EmojiConst = {
	Happy: {
		name: 'Happy',
		internal: Happy,
		external: GetAppSettings().other.appbaseUrl + '/Emoji%2F/smiley_happy.png?alt=media'
	} as i_Emoji,
	InLove: {
		name: 'InLove',
		internal: InLove,
		external: GetAppSettings().other.appbaseUrl + '/Emoji%2F/smiley_in_love.png?alt=media'
	} as i_Emoji,
	Sad: {
		name: 'Sad',
		internal: Sad,
		external: GetAppSettings().other.appbaseUrl + '/Emoji%2F/smiley_sad.png?alt=media'
	} as i_Emoji
};

export const OtherEmojiConst = {
	FBLike: {
		name: 'FBLike',
		internal: FBLike,
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
