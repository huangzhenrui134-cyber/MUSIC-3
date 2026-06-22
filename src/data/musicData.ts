// @ts-nocheck
import bcnrCover from '../assets/bcnr-afut.jpg';
import type { Question, Album } from '../types';
export const questions: Question[] = [
  {
    id: 1,
    text: '你现在的房间灯光是什么颜色？',
    category: 'emotion',
    weight: 1,
    options: [
      { id: '1a', text: '惨白荧光灯', tags: ['实验电子', '神经质'] },
      { id: '1b', text: '暗红微光', tags: ['暗黑', '抑郁'] },
      { id: '1c', text: '温暖黄光', tags: ['管弦后摇', '叙事'] },
      { id: '1d', text: '完全黑暗', tags: ['噪音乐墙', '暗黑'] },
    ],
  },
  {
    id: 2,
    text: '此刻你最想做的事是什么？',
    category: 'emotion',
    weight: 2,
    options: [
      { id: '2a', text: '独自坐在窗边发呆', tags: ['抑郁', '情绪流', '叙事'] },
      { id: '2b', text: '撕碎一些什么东西', tags: ['噪音乐墙', '神经质'] },
      { id: '2c', text: '给在意的人写一封信', tags: ['温暖', '叙事', '管弦后摇'] },
      { id: '2d', text: '躺在地板上盯着天花板', tags: ['实验电子', '暗黑'] },
    ],
  },
  {
    id: 3,
    text: '如果此刻是一首诗的开头，它会是什么？',
    category: 'emotion',
    weight: 1,
    options: [
      { id: '3a', text: '"雨落在无人的站台"', tags: ['抑郁', '叙事'] },
      { id: '3b', text: '"尖叫被吞进墙壁"', tags: ['噪音乐墙', '神经质'] },
      { id: '3c', text: '"阳光穿过窗帘的缝隙"', tags: ['温暖', '治愈'] },
      { id: '3d', text: '"霓虹灯闪烁在废弃的建筑"', tags: ['实验电子', '暗黑'] },
    ],
  },
  {
    id: 4,
    text: '如果可以选择，你想出现在哪个场景？',
    category: 'scene',
    weight: 1,
    options: [
      { id: '4a', text: '空无一人的废弃工厂', tags: ['工业', '噪音乐墙'] },
      { id: '4b', text: '深夜的便利店门口', tags: ['城市孤独', '抑郁'] },
      { id: '4c', text: '凌晨的火车站', tags: ['叙事', '流浪感'] },
      { id: '4d', text: '阳光下的公园长椅', tags: ['温暖', '治愈'] },
    ],
  },
  {
    id: 5,
    text: '你最喜欢的时间段是？',
    category: 'scene',
    weight: 1,
    options: [
      { id: '5a', text: '凌晨3点到5点', tags: ['暗黑', '抑郁'] },
      { id: '5b', text: '黄昏时刻', tags: ['叙事', '情绪流'] },
      { id: '5c', text: '正午阳光', tags: ['温暖', '活力'] },
      { id: '5d', text: '深夜', tags: ['实验电子', '神经质'] },
    ],
  },
  {
    id: 6,
    text: '窗外是什么天气？',
    category: 'weather',
    weight: 1,
    options: [
      { id: '6a', text: '暴雨倾盆', tags: ['剧烈', '噪音乐墙'] },
      { id: '6b', text: '阴天无风', tags: ['抑郁', '压抑'] },
      { id: '6c', text: '晴朗阳光', tags: ['温暖', '治愈'] },
      { id: '6d', text: '黄昏日落', tags: ['叙事', '情绪流'] },
    ],
  },
  {
    id: 7,
    text: '你觉得今天的空气是什么味道？',
    category: 'weather',
    weight: 1,
    options: [
      { id: '7a', text: '潮湿的泥土味', tags: ['抑郁', '自然'] },
      { id: '7b', text: '灰尘和旧书味', tags: ['叙事', '复古'] },
      { id: '7c', text: '清新的草木味', tags: ['治愈', '温暖'] },
      { id: '7d', text: '金属的冷味', tags: ['工业', '实验电子'] },
    ],
  },
  {
    id: 8,
    text: '过去一年，你失去的最重要的事是什么？',
    category: 'emotion',
    weight: 2,
    options: [
      { id: '8a', text: '一段关系', tags: ['叙事', '情绪流', '抑郁'] },
      { id: '8b', text: '某种信念', tags: ['暗黑', '神经质'] },
      { id: '8c', text: '时间', tags: ['虚无', '实验电子'] },
      { id: '8d', text: '说不清楚', tags: ['飘渺', '情绪流'] },
    ],
  },
  {
    id: 9,
    text: '你理想的演出场地是？',
    category: 'scene',
    weight: 1,
    options: [
      { id: '9a', text: '小型地下酒吧', tags: ['亲密', '暗黑'] },
      { id: '9b', text: '废弃仓库', tags: ['工业', '噪音乐墙'] },
      { id: '9c', text: '露天音乐节', tags: ['活力', '温暖'] },
      { id: '9d', text: '空旷的教堂', tags: ['管弦后摇', '神圣感'] },
    ],
  },
  {
    id: 10,
    text: '如果这张专辑能改变你一件事，你希望它改变什么？',
    category: 'emotion',
    weight: 3,
    options: [
      { id: '10a', text: '让我哭出来', tags: ['抑郁', '情绪流', '叙事'] },
      { id: '10b', text: '让我感觉被理解', tags: ['治愈', '温暖'] },
      { id: '10c', text: '让我释放愤怒', tags: ['噪音乐墙', '神经质'] },
      { id: '10d', text: '让我进入另一个世界', tags: ['实验电子', '飘渺'] },
    ],
  },
];

export const albums: Album[] = [
  {
    id: 1,
    title: 'Ants From Up There',
    artist: 'Black Country, New Road',
    coverUrl: bcnrCover,
    comment: '在崩塌前拥抱一切，在燃烧时高声歌唱。',
    tags: ['情绪流', '管弦后摇', '抑郁', '叙事', '释放', '遗憾', '悲伤', '史诗'],
  },
  {
    id: 2,
    title: 'Forget',
    artist: 'Xiu Xiu',
    coverUrl: 'https://images.pexels.com/photos/373557/pexels-photo-373557.jpeg?auto=compress&w=400',
    comment: '当痛苦被拆解成噪音，你会在里面找到温柔。',
    tags: ['实验电子', '暗黑', '噪音乐墙', '神经质', '剧烈', '压抑', '释放'],
  },
  {
    id: 3,
    title: 'Hospice',
    artist: 'The Antlers',
    coverUrl: 'https://images.pexels.com/photos/16446/pexels-photo-16446.jpg?auto=compress&w=400',
    comment: '关于死亡与爱，关于如何在告别中学会呼吸。',
    tags: ['抑郁', '叙事', '情绪流', '悲伤', '空旷', '释放', '告别'],
  },
  {
    id: 4,
    title: 'Funeral',
    artist: 'Arcade Fire',
    coverUrl: 'https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg?auto=compress&w=400',
    comment: '关于死亡和记忆，关于如何在葬礼上学会笑。',
    tags: ['叙事', '管弦后摇', '温暖', '治愈', '希望', '史诗'],
  },
  {
    id: 5,
    title: 'Loveless',
    artist: 'My Bloody Valentine',
    coverUrl: 'https://images.pexels.com/photos/373557/pexels-photo-373557.jpeg?auto=compress&w=400',
    comment: '在噪音中找到宁静，在失真中找到温柔。',
    tags: ['噪音乐墙', '情绪流', '治愈', '飘渺', '神秘', '梦境'],
  },
  {
    id: 6,
    title: 'OK Computer',
    artist: 'Radiohead',
    coverUrl: 'https://images.pexels.com/photos/176851/pexels-photo-176851.jpeg?auto=compress&w=400',
    comment: '当你觉得世界正在崩塌，而你是唯一记得它曾经美好过的人。',
    tags: ['实验电子', '抑郁', '城市孤独', '焦虑', '神经质', '工业'],
  },
  {
    id:7,
    title: 'In Rainbows',
    artist: 'Radiohead',
    coverUrl: 'https://images.pexels.com/photos/176851/pexels-photo-176851.jpeg?auto=compress&w=400',
    comment: '关于爱与失去，关于如何在雨中学会坚强。',
    tags: ['实验电子', '抑郁', '城市孤独', '焦虑', '神经质', '工业'],
  }
];
