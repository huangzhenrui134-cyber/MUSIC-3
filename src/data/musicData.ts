// @ts-nocheck

export type DimensionTag = 'E' | 'I' | 'T' | 'F' | 'J' | 'P' | '节奏性' | '实验性' | '旋律性';

export interface Question {
  id: number;
  text: string;
  dimension: 'EI' | 'TF' | 'JP' | '节奏性' | '实验性';
  yesTag: DimensionTag;
  noTag: DimensionTag;
}

export interface Album {
  id: number;
  title: string;
  artist: string;
  coverUrl: string;
  comment: string;
  tags: DimensionTag[];
}

// ==================== 问题库 ====================

const EI_questions: Question[] = [
  { id: 1,  text: '现在不想说话？',                         dimension: 'EI', yesTag: 'I', noTag: 'E' },
  { id: 2,  text: '今晚想出门吗？',                         dimension: 'EI', yesTag: 'E', noTag: 'I' },
  { id: 3,  text: '今天已经不想回消息了？',                 dimension: 'EI', yesTag: 'I', noTag: 'E' },
  { id: 4,  text: '现在很想找人说话？',                     dimension: 'EI', yesTag: 'E', noTag: 'I' },
  { id: 5,  text: '一个人待着比较舒服？',                   dimension: 'EI', yesTag: 'I', noTag: 'E' },
  { id: 6,  text: '有没有很想跟人分享但不知道发给谁？',     dimension: 'EI', yesTag: 'E', noTag: 'I' },
  { id: 7,  text: '现在脑子里在自说自话？',                 dimension: 'EI', yesTag: 'I', noTag: 'E' },
  { id: 8,  text: '今天有没有主动联系过别人？',             dimension: 'EI', yesTag: 'E', noTag: 'I' },
  { id: 9,  text: '有没有很想消失一下？',                   dimension: 'EI', yesTag: 'I', noTag: 'E' },
  { id: 10, text: '现在想被人注意到？',                     dimension: 'EI', yesTag: 'E', noTag: 'I' },
  { id: 11, text: '比起出门更想躺着？',                     dimension: 'EI', yesTag: 'I', noTag: 'E' },
  { id: 12, text: '想让今晚变得不一样？',                   dimension: 'EI', yesTag: 'E', noTag: 'I' },
  { id: 13, text: '今天已经够累了不想再社交？',             dimension: 'EI', yesTag: 'I', noTag: 'E' },
  { id: 14, text: '现在想有人陪？',                         dimension: 'EI', yesTag: 'E', noTag: 'I' },
  { id: 15, text: '今天手机静音了吗？',                     dimension: 'EI', yesTag: 'I', noTag: 'E' },
  { id: 16, text: '有没有很想说但憋着没说的话？',           dimension: 'EI', yesTag: 'E', noTag: 'I' },
  { id: 17, text: '正在做一件不想被打扰的事？',             dimension: 'EI', yesTag: 'I', noTag: 'E' },
  { id: 18, text: '今天有没有觉得自己很好看？',             dimension: 'EI', yesTag: 'E', noTag: 'I' },
  { id: 19, text: '今天已经不想解释任何事了？',             dimension: 'EI', yesTag: 'I', noTag: 'E' },
  { id: 20, text: '有没有很想跟人吵一架？',                 dimension: 'EI', yesTag: 'E', noTag: 'I' },
  { id: 21, text: '现在想发条朋友圈？',                     dimension: 'EI', yesTag: 'E', noTag: 'I' },
  { id: 22, text: '现在如果有人突然打电话你会接吗？',       dimension: 'EI', yesTag: 'E', noTag: 'I' },
  { id: 23, text: '比起见人更想刷手机？',                   dimension: 'EI', yesTag: 'I', noTag: 'E' },
  { id: 24, text: '现在想被夸？',                           dimension: 'EI', yesTag: 'E', noTag: 'I' },
  { id: 25, text: '今天有没有觉得一个人挺好的？',           dimension: 'EI', yesTag: 'I', noTag: 'E' },
];

const TF_questions: Question[] = [
  { id: 26, text: '最近在脑子里建了一个不存在的世界？',         dimension: 'TF', yesTag: 'T', noTag: 'F' },
  { id: 27, text: '最近有没有反复想起某个人说的某句话？',       dimension: 'TF', yesTag: 'F', noTag: 'T' },
  { id: 28, text: '你会因为一个设定漏洞睡不着？',               dimension: 'TF', yesTag: 'T', noTag: 'F' },
  { id: 29, text: '现在心里有点堵？',                           dimension: 'TF', yesTag: 'F', noTag: 'T' },
  { id: 30, text: '脑子里现在有个很荒谬的假设在转？',           dimension: 'TF', yesTag: 'T', noTag: 'F' },
  { id: 31, text: '有没有最近突然很想见的人？',                 dimension: 'TF', yesTag: 'F', noTag: 'T' },
  { id: 32, text: '你更容易爱上一个概念而不是一个人？',         dimension: 'TF', yesTag: 'T', noTag: 'F' },
  { id: 33, text: '今天有没有因为别人的事情心情变差？',         dimension: 'TF', yesTag: 'F', noTag: 'T' },
  { id: 34, text: '比起发生的事更在意为什么会发生？',           dimension: 'TF', yesTag: 'T', noTag: 'F' },
  { id: 35, text: '有没有很想说对不起但没说出口？',             dimension: 'TF', yesTag: 'F', noTag: 'T' },
  { id: 36, text: '你觉得现实比较无聊？',                       dimension: 'TF', yesTag: 'T', noTag: 'F' },
  { id: 37, text: '现在有点想哭但不知道为什么？',               dimension: 'TF', yesTag: 'F', noTag: 'T' },
  { id: 38, text: '你喜欢把事情想得很复杂？',                   dimension: 'TF', yesTag: 'T', noTag: 'F' },
  { id: 39, text: '有没有一首歌最近不敢听？',                   dimension: 'TF', yesTag: 'F', noTag: 'T' },
  { id: 40, text: '有没有在脑子里演过一场不存在的对话？',       dimension: 'TF', yesTag: 'T', noTag: 'F' },
  { id: 41, text: '今天有没有觉得被忽视了？',                   dimension: 'TF', yesTag: 'F', noTag: 'T' },
  { id: 42, text: '你觉得规则本身比规则的内容更有趣？',         dimension: 'TF', yesTag: 'T', noTag: 'F' },
  { id: 43, text: '有没有一件小事让你心情好了很久？',           dimension: 'TF', yesTag: 'F', noTag: 'T' },
  { id: 44, text: '有没有很喜欢但没人理解的冷知识？',           dimension: 'TF', yesTag: 'T', noTag: 'F' },
  { id: 45, text: '现在在想一个具体的人？',                     dimension: 'TF', yesTag: 'F', noTag: 'T' },
];

const JP_questions: Question[] = [
  { id: 46, text: '今天有没有列过清单？',                       dimension: 'JP', yesTag: 'J', noTag: 'P' },
  { id: 47, text: '现在在做计划以外的事？',                     dimension: 'JP', yesTag: 'P', noTag: 'J' },
  { id: 48, text: '有没有很烦某件事还没完成？',                 dimension: 'JP', yesTag: 'J', noTag: 'P' },
  { id: 49, text: '今天已经改变主意超过三次了？',               dimension: 'JP', yesTag: 'P', noTag: 'J' },
  { id: 50, text: '你会提前想好明天做什么？',                   dimension: 'JP', yesTag: 'J', noTag: 'P' },
  { id: 51, text: '你开始了很多但都没完成？',                   dimension: 'JP', yesTag: 'P', noTag: 'J' },
  { id: 52, text: '有没有因为计划被打乱而烦躁？',               dimension: 'JP', yesTag: 'J', noTag: 'P' },
  { id: 53, text: '现在有点不知道接下来干嘛？',                 dimension: 'JP', yesTag: 'P', noTag: 'J' },
  { id: 54, text: '比起随机更喜欢知道接下来发生什么？',         dimension: 'JP', yesTag: 'J', noTag: 'P' },
  { id: 55, text: '比起做计划更喜欢看心情？',                   dimension: 'JP', yesTag: 'P', noTag: 'J' },
];

const rhythm_questions: Question[] = [
  { id: 56, text: '现在腿在抖或者手在敲桌子？',                 dimension: '节奏性', yesTag: '节奏性', noTag: '旋律性' },
  { id: 57, text: '现在有点烦躁想发泄？',                       dimension: '节奏性', yesTag: '节奏性', noTag: '旋律性' },
  { id: 58, text: '走路的时候会跟着音乐踩节拍？',               dimension: '节奏性', yesTag: '节奏性', noTag: '旋律性' },
  { id: 59, text: '有没有最近很想大喊一声？',                   dimension: '节奏性', yesTag: '节奏性', noTag: '旋律性' },
  { id: 60, text: '打游戏会开很响的音乐？',                     dimension: '节奏性', yesTag: '节奏性', noTag: '旋律性' },
];

const experimental_questions: Question[] = [
  { id: 61, text: '你会听完一首很奇怪的歌只因为它奇怪？',       dimension: '实验性', yesTag: '实验性', noTag: '旋律性' },
  { id: 62, text: '有没有喜欢但说不出为什么好的东西？',         dimension: '实验性', yesTag: '实验性', noTag: '旋律性' },
  { id: 63, text: '你觉得好听不是音乐最重要的事？',             dimension: '实验性', yesTag: '实验性', noTag: '旋律性' },
  { id: 64, text: '最近有没有接触了让你世界观被打开的东西？',   dimension: '实验性', yesTag: '实验性', noTag: '旋律性' },
  { id: 65, text: '比起熟悉的更想试试没听过的？',               dimension: '实验性', yesTag: '实验性', noTag: '旋律性' },
];

// 分层随机抽样：EI×3 TF×3 JP×2 节奏性×1 实验性×1 = 10题
export function getRandomQuestions(): Question[] {
  const pick = (arr: Question[], n: number) =>
    [...arr].sort(() => Math.random() - 0.5).slice(0, n);

  const selected = [
    ...pick(EI_questions, 3),
    ...pick(TF_questions, 3),
    ...pick(JP_questions, 2),
    ...pick(rhythm_questions, 1),
    ...pick(experimental_questions, 1),
  ];

  return selected.sort(() => Math.random() - 0.5);
}

// ==================== 专辑库 ====================

// @ts-nocheck
// ... 保持前面的 DimensionTag, Question 接口以及问题库不变 ...

export const albums: Album[] = [
  {
    id: 1,
    title: 'Ants From Up There',
    artist: 'Black Country, New Road',
    coverUrl: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&w=400',
    comment: '在崩塌前拥抱一切，在燃烧时高声歌唱。',
    tags: ['I', 'F', 'J', '旋律性', '实验性'],
  },
  {
    id: 2,
    title: 'Hospice',
    artist: 'The Antlers',
    coverUrl: 'https://images.pexels.com/photos/16446/pexels-photo-16446.jpg?auto=compress&w=400',
    comment: '关于告别与呼吸，关于如何在死亡里找到爱。',
    tags: ['I', 'F', 'J', '旋律性'],
  },
  {
    id: 3,
    title: 'Funeral',
    artist: 'Arcade Fire',
    coverUrl: 'https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg?auto=compress&w=400',
    comment: '关于死亡和记忆，关于如何在葬礼上学会笑。',
    tags: ['E', 'F', 'J', '旋律性', '节奏性'],
  },
  {
    id: 4,
    title: 'OK Computer',
    artist: 'Radiohead',
    coverUrl: 'https://images.pexels.com/photos/176851/pexels-photo-176851.jpeg?auto=compress&w=400',
    comment: '当你觉得世界正在崩塌，而你是唯一记得它曾经美好过的人。',
    tags: ['E', 'T', 'J', '实验性', '节奏性'],
  },
  {
    id: 5,
    title: 'In Rainbows',
    artist: 'Radiohead',
    coverUrl: 'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&w=400',
    comment: '雨里有一种温柔，是OK Computer里没有的。',
    tags: ['I', 'F', 'P', '旋律性', '实验性'],
  },
  {
    id: 6,
    title: 'Lift Your Skinny Fists Like Antennas to Heaven',
    artist: 'Godspeed You! Black Emperor',
    coverUrl: 'https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg?auto=compress&w=400',
    comment: '没有歌词，但每一分钟都在说话。',
    tags: ['I', 'T', 'P', '实验性'],
  },
  {
    id: 7,
    title: 'Person Pitch',
    artist: 'Panda Bear',
    coverUrl: 'https://images.pexels.com/photos/373557/pexels-photo-373557.jpeg?auto=compress&w=400',
    comment: '像一场很长的白日梦，醒来还想继续睡。',
    tags: ['E', 'F', 'P', '实验性', '旋律性'],
  },
  {
    id: 8,
    title: 'Spiderland',
    artist: 'Slint',
    coverUrl: 'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&w=400',
    comment: '安静到让人不安，紧张到让人着迷。',
    tags: ['I', 'T', 'J', '实验性', '节奏性'],
  },
  {
    id: 9,
    title: 'The Glow Pt. 2',
    artist: 'The Microphones',
    coverUrl: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&w=400',
    comment: '粗糙的录音里藏着最真实的东西。',
    tags: ['I', 'F', 'P', '旋律性', '实验性'],
  },
  {
    id: 10,
    title: 'Laughing Stock',
    artist: 'Talk Talk',
    coverUrl: 'https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&w=400',
    comment: '用沉默说话，用留白构成音乐。',
    tags: ['I', 'T', 'P', '实验性', '旋律性'],
  },
  {
    id: 11,
    title: 'Yankee Hotel Foxtrot',
    artist: 'Wilco',
    coverUrl: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&w=400',
    comment: '在美国的废墟里找到一种奇怪的美。',
    tags: ['E', 'T', 'P', '实验性', '旋律性'],
  },
  {
    id: 12,
    title: 'The Queen Is Dead',
    artist: 'The Smiths',
    coverUrl: 'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&w=400',
    comment: '用幽默包裹悲伤，用旋律对抗世界。',
    tags: ['E', 'F', 'J', '旋律性', '节奏性'],
  },
  {
    id: 13,
    title: 'Rid of Me',
    artist: 'PJ Harvey',
    coverUrl: 'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&w=400',
    comment: '原始的、愤怒的、完全不想取悦任何人的。',
    tags: ['E', 'F', 'J', '节奏性'],
  }
];

// ... 保持最后的 getRecommendedAlbum 推荐算法不变 ...

// ==================== 推荐算法 ====================

export function getRecommendedAlbum(scores: Record<string, number>): Album {
  const getScore = (album: Album) => {
    return album.tags.reduce((total, tag) => total + (scores[tag] || 0), 0);
  };

  const maxScore = Math.max(...albums.map(getScore));
  const candidates = albums.filter(a => getScore(a) === maxScore);

  // 并列时随机推一张
  return candidates[Math.floor(Math.random() * candidates.length)];
}
