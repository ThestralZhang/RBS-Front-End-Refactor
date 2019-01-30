window.User = function (id, name, avatar){
   this.id = id;
   this.name = name;
   this.avatar = avatar;
};

window.Picture = function(id, path, description, tags, width, height, like_num, remark_num, down_num, by_id){
   this.id = id;
   this.path = path;
   this.description = description;
   this.tags = tags;
   this.width = width;
   this.height = height;
   this.like_num = like_num || 0;
   this.remark_num = remark_num || 0;
   this.down_num = down_num || 0;
   this.by_id = by_id;
};

window.Like = function(id, by_id, pic_id){
   this.id = id;
   this.by_id = by_id;
   this.pic_id = pic_id;
};

window.Remark = function(id, content, by_id, pic_id){
   this.id = id;
   this.content = content;
   this.by_id = by_id;
   this.pic_id = pic_id;
};

Math.randomBetween = function(a, b){
   return Math.ceil(Math.random()*(b-a+1) + a - 1);
};

Array.prototype.randomChoose = function(n){
   n = n || this.length;
   let result = [], copy = this.slice(), leftCount = this.length;
   for(let i = 0; i < n; i++){
      const index = Math.floor(Math.random() * leftCount) + i;
      result.push(copy[index]);
      copy[index] = copy[i];
      leftCount --;
   }
   return result;
};

function PictureInfo(description, tags, width, height) {
   this.description = description;
   this.tags = tags;
   this.width = width;
   this.height = height;
}
   
const picInfo = [
   new PictureInfo('My brain has too many tabs open.', ['黑板', 'slogan'], 564, 851),
   new PictureInfo('牛油果沙拉，欢迎品尝～～～', ['沙拉', '牛油果', '美食'], 564, 845),
   new PictureInfo('很有意思的招贴画', ['柠檬', '招贴画', '复古'], 1303, 2048),
   new PictureInfo('好想有个新家！！', ['飘窗', '室内设计'], 564, 856),
   new PictureInfo('', ['月亮'], 500, 750),
   new PictureInfo('超级月亮', ['月亮'], 541, 800),
   new PictureInfo('苍凉的大漠，巍峨的剪影', ['沙漠', '金字塔'], 320, 480),
   new PictureInfo('神秘感十足的埃及之夜', ['金字塔', '夜景'], 506, 750),
   new PictureInfo('万！道！金！光！', ['金字塔', '狮身人面像', '阳光', '丁达尔效应'], 500, 625),
   new PictureInfo('天生有枚金戒指', ['太阳', '日食'], 500, 750),
   
   new PictureInfo('黑天血月', ['月亮'], 500, 651),
   new PictureInfo('用彩铅画了一天的插图，好累', ['太阳', '手绘', '卡通', '插画'], 564, 797),
   new PictureInfo('墨色氤氲，充满古典情趣', ['花瓶'], 564, 846),
   new PictureInfo('', ['花瓶'], 300, 600),
   new PictureInfo('最爱路边不知名的小花，也能开的轰轰烈烈', ['花'], 564, 848),
   new PictureInfo('清新淡雅的雏菊', ['花', '雏菊'], 564, 911),
   new PictureInfo('', ['自行车'], 500, 499),
   new PictureInfo('很简约的项链', ['项链', '首饰'], 400, 600),
   new PictureInfo('', ['篮球'], 564, 845),
   new PictureInfo('打开大概就是童话世界了', [], 564, 855),
   
   new PictureInfo('', ['帽子', '软毡帽'], 564, 689),
   new PictureInfo('另一个角度看塔桥', ['伦敦塔桥', '英国'], 564, 701),
   new PictureInfo('', ['自拍', '人像'], 564, 569),
   new PictureInfo('', ['自拍', '人像'], 564, 564),
   new PictureInfo('丹丹龙', ['人像', 'Dan Stevens'], 564, 569),
   new PictureInfo('静物一拍', ['伞'], 484, 1000),
   new PictureInfo('素雅的纸伞', ['伞'], 480, 640),
   new PictureInfo('海边拾贝', ['海螺'], 426, 640),
   new PictureInfo('妩媚的眼', ['眼睛'], 564, 564),
   new PictureInfo('静物一拍', ['扫帚'], 236, 295),
   
   new PictureInfo('家里新装修的试衣间，很完美', ['室内设计', '柜子'], 480, 640),
   new PictureInfo('整面墙的落地玻璃门', [], 564, 917),
   new PictureInfo('', ['鸟'], 564, 846),
   new PictureInfo('', ['鸟'], 412, 595),
   new PictureInfo('老北京布鞋', ['鞋'], 480, 318),
   new PictureInfo('很有味道的手表', ['手表'], 391, 612),
   new PictureInfo('可以装酷', ['墨镜', '眼镜'], 564, 564),
   new PictureInfo('看，飞机！', ['飞机'], 400, 248),
   new PictureInfo('廊桥是如何连接飞机的，俯瞰图', ['飞机'], 400, 599),
   new PictureInfo('', ['飞机'], 400, 600),
   
   new PictureInfo('你以为是块木头，其实是闹钟', ['闹钟'], 236, 236),
   new PictureInfo('', ['闹钟'], 236 ,354),
   new PictureInfo('机械式闹钟', ['闹钟', '复古'], 410, 615),
   new PictureInfo('仿佛在呼吸清晨的空气', ['蚂蚁'], 564, 846),
   new PictureInfo('蚂蚁喝水，你们见过么', ['蚂蚁'], 564, 502),
   new PictureInfo('', ['蚂蚁', '夕阳'], 550, 550),
   new PictureInfo('宫廷风软椅', ['椅子', '靠背椅', '软椅', '家具'], 500, 750),
   new PictureInfo('', ['苹果'], 564, 750),
   new PictureInfo('色泽鲜艳诱惑', ['苹果'], 427, 640),
   new PictureInfo('', ['椅子', '靠背椅', '软椅', '家具'], 424, 452),
   
   new PictureInfo('', ['椅子', '靠背椅', '软椅', '家具'], 1280, 1433),
   new PictureInfo('这蓝色很是典雅', ['椅子', '靠背椅', '软椅', '家具'], 600, 757),
   new PictureInfo('puff puff pass', ['烟灰缸'], 570, 570),
   new PictureInfo('', ['烟灰缸'], 564, 376),
   new PictureInfo('电塔供电给灯泡，有创意', ['灯', '家具'], 236, 356),
   new PictureInfo('月亮形烟灰缸', ['烟灰缸'], 247, 400),
   new PictureInfo('', ['南瓜', '卡通', '插画'], 564, 564),
   new PictureInfo('', ['斧子'], 601, 599),
   new PictureInfo('', ['蛇'], 1280, 719),
   new PictureInfo('美国农场常见的谷仓', ['谷仓', '木屋'], 550, 413),
   
   new PictureInfo('住在这样的阁楼，也很美好啊', ['阁楼', '室内设计'], 564, 669),
   new PictureInfo('', ['木屋'], 564, 846),
   new PictureInfo('', ['香蕉'], 480, 720),
   new PictureInfo('可爱有趣的ps', ['香蕉', '海豚'], 564, 528),
   new PictureInfo('', ['女孩', '卡通'], 500, 682),
   new PictureInfo('', ['棒球'], 467, 700),
   new PictureInfo('藤编的花盆是不是更有自然的感觉', ['室内设计', '花盆', '家具'], 564, 846),
   new PictureInfo('家中一隅', ['室内设计', '花盆', '家具', '植物'], 564, 564),
   new PictureInfo('形状各异的墙面装饰', ['室内设计'], 564, 979),
   new PictureInfo('', ['棒球'], 564, 614),
   
   new PictureInfo('胖达君～～', ['熊猫'], 500, 352),
   new PictureInfo('', ['熊'], 500, 750),
   new PictureInfo('哈哈哈，惊讶脸', ['熊猫'], 500, 333),
   new PictureInfo('一脸呆滞', ['熊'], 500, 592),
   new PictureInfo('花开的很是强迫症福利', ['花'], 500, 666),
   new PictureInfo('工业简约风', ['床', '卧室', '室内设计'], 564, 564),
   new PictureInfo('I\'m drinking coffee, because it\'s too early for beer. LOL', ['杯子'], 564, 700),
   new PictureInfo('', ['沙发', '家具'], 658, 658),
   new PictureInfo('', ['卡通', '插画'], 500, 500),
   new PictureInfo('早起逛公园', [], 560, 478),
   
   new PictureInfo('蝶飞飞', ['蝴蝶'], 500, 434),
   new PictureInfo('', ['蝴蝶'], 500, 491),
   new PictureInfo('', [], 564, 849),
   new PictureInfo('蝶恋花', ['蝴蝶', '花'], 236, 355),
   new PictureInfo('', ['蝴蝶'], 350, 643),
   new PictureInfo('真有这样鲜艳的蝴蝶吗', ['蝴蝶'], 236, 354),
   new PictureInfo('书籍如同食物，知识给我力量', ['书'], 564, 358),
   new PictureInfo('简约不失功能性的书架', ['书架', '室内设计'], 380, 532),
   new PictureInfo('', ['椅子', '靠背椅', '软椅', '家具'], 400, 400),
   new PictureInfo('温馨的小搁架', ['家具', '室内设计'], 236, 532),
   
   new PictureInfo('我也想要能放很多东西的书架', ['书架'], 564, 846),
   new PictureInfo('想念阳澄湖的大闸蟹', ['螃蟹'], 338, 264),
   new PictureInfo('哈哈，螃蟹方了', ['螃蟹'], 520, 504),
   new PictureInfo('好鲜艳的螃蟹，会有毒吗', ['螃蟹'], 500, 375),
   new PictureInfo('', ['灯泡', '卡通', '插画'], 564, 776),
   new PictureInfo('', ['灯泡'], 564, 769),
   new PictureInfo('', ['手'], 500, 635),
   new PictureInfo('触摸阳光', ['手'], 465, 700),
   new PictureInfo('', ['沙漏'], 564, 752),
   new PictureInfo('赛车手', [], 500, 587),
   
   new PictureInfo('女孩', ['人像', '自拍', '女孩'], 236, 353),
   new PictureInfo('欧美男', ['男生', '人像'], 564, 846),
   new PictureInfo('秋日装扮', ['女孩'], 564, 827),
   new PictureInfo('隔水笑抛一支莲', ['荷花', '花'], 427, 640),
   new PictureInfo('', ['月季', '花'], 564, 1001),
   new PictureInfo('', ['月季', '花'], 564, 564),
   new PictureInfo('', ['月季', '花'], 334, 500),
   new PictureInfo('优雅的火烈鸟', ['火烈鸟'], 500, 750),
   new PictureInfo('金蓝相间大自然的调色盘', ['阳光', '海'], 658, 999),
   new PictureInfo('萧索的海', ['海', '浪花'], 540, 810),
   
   new PictureInfo('纯色墙面，很适合拍照', [], 658, 439),
   new PictureInfo('画的好逼真啊，蠢蠢欲动', ['手绘', '美食'], 500, 375),
   new PictureInfo('即使是画，也看饿了', ['手绘', '美食'], 658, 517),
   new PictureInfo('', ['茶'], 333, 500),
   new PictureInfo('', ['人像', '车'], 658, 439),
   new PictureInfo('急驰', [], 658, 823),
   new PictureInfo('心都化了', ['兔子'], 500, 722),
   new PictureInfo('', ['灯', '家具'], 588, 1049),
   new PictureInfo('穿行在林间小路上', ['车'], 638, 1136),
   new PictureInfo('流光溢彩，城市之夜', ['城市', '夜景'], 658, 987),
   
   new PictureInfo('绿色原野，柔顺的像布', ['原野'], 600, 900),
   new PictureInfo('夜晚，寂寞的灯', ['路灯', '夜'], 690, 460),
   new PictureInfo('不规则的建筑，独特的美感', ['建筑'], 690, 862),
   new PictureInfo('薄云轻拢下的张家界，据说是阿凡达灵感来源之一', ['张家界', '山'], 690, 862),
   new PictureInfo('水彩浸润的画布，犹如仙境', [], 690, 460),
   new PictureInfo('', ['云', '山'], 690, 460),
   new PictureInfo('又是中秋，远方是回家的路', ['路灯', '夜'], 690, 851),
   new PictureInfo('装置艺术', [], 690, 460),
   new PictureInfo('街头的装置艺术', [], 690, 460),
   new PictureInfo('大自然的蓝色之心，沁人心脾的美', [], 690, 848),
   
   new PictureInfo('海边的泳池', ['海', '泳池'], 690, 516),
   new PictureInfo('可以看到冰山的房间，奇异的景观', [], 690, 435),
   new PictureInfo('一所小教堂', ['教堂', '建筑'], 690, 388),
   new PictureInfo('秋天，日本的一个公园，红色如梦', [], 690, 862),
   new PictureInfo('', ['植物'], 378, 567),
   new PictureInfo('月色如晕，银杏树叶的剪影很有一番国画的味道', ['夜', '月亮'], 632, 632),
   new PictureInfo('绿色山野', ['风景', '山'], 658, 1170),
   new PictureInfo('', ['插画', '花'], 575, 910),
   new PictureInfo('日本小街里的一只三花猫', ['街景', '猫'], 500, 668),
   new PictureInfo('小清新～～～', ['柠檬'], 658, 1170),
   
   new PictureInfo('五色咖啡杯', ['咖啡', '杯子'], 658, 946),
   new PictureInfo('灿如夏花，轰轰烈烈的红', ['花'], 534, 800),
   new PictureInfo('温馨的阁楼卧室', ['阁楼', '室内设计', '卧室'], 500, 749),
   new PictureInfo('盛世美颜！布偶猫 眼睛里藏了片蓝色的湖', ['猫', '布偶猫'], 658, 1170),
   new PictureInfo('自己烤的面包做早餐，拍照也很美', ['面包', '美食', '早餐'], 500, 750),
   new PictureInfo('山中小屋', [], 424, 640),
   new PictureInfo('阳光倾泻，金色的草原', ['阳光', '草原', '风景'], 2560, 1920),
   new PictureInfo('小小的银杏', ['植物', '银杏'], 567, 378),
   new PictureInfo('烘焙小能手，肉桂面包', ['面包', '美食'], 658, 987),
   new PictureInfo('橘猫的小jio', ['猫', '插画', '手绘'], 658, 832),
   
   new PictureInfo('记忆中的老屋', [], 500, 750),
   new PictureInfo('幻想自己是个小人，在荷叶上戏水观鱼', ['插画', '手绘'], 658, 1101),
   new PictureInfo('一棵开花的树', ['花', '人像'], 658, 986),
   new PictureInfo('', ['插画', '手绘'], 600, 800),
   new PictureInfo('荒漠上迎接日出', ['日出', '火人节'], 1024, 768),
   new PictureInfo('火人节', ['火人节'], 1024, 605),
   new PictureInfo('心有朝阳', ['火人节'], 1024, 683),
   new PictureInfo('火人节上出现了威武的中国古代士兵', ['火人节'], 1024, 683),
   new PictureInfo('入夜了', ['火人节'], 1024, 682),
   new PictureInfo('夕阳下 渔舟清荡', ['夕阳', '渔舟'], 551, 800),
   
   new PictureInfo('料很足的面包', ['面包', '美食'], 502, 750),
   new PictureInfo('樱花盛开的时候，到处都是水彩晕染般的风景', ['花', '风景'], 540, 671),
   new PictureInfo('林间小径，很是幽深', ['森林', '小路', '风景'], 2560, 1920),
   new PictureInfo('各种烘焙啊！', ['面包', '美食'], 658, 987),
   new PictureInfo('雾色绘就一副水墨画', [], 658, 433),
   new PictureInfo('柠檬冰棒，应该很酸吧', ['柠檬', '冰棒'], 500, 750),
   new PictureInfo('绿意盎然的小窗', ['窗户'], 427, 640),
   new PictureInfo('又一条林间小径，洒满秋天的阳光', ['森林', '小路'], 658, 986),
   new PictureInfo('', ['盆栽', '植物'], 600, 400),
   new PictureInfo('可爱的小动物，在张望什么？', ['动物'], 658, 823),
   
   new PictureInfo('傻乎乎的童年', ['人像'], 600, 401),
   new PictureInfo('山谷间的田园 很是静谧', ['山', '风景'], 658, 1170),
   new PictureInfo('海上生明月，天涯共此时', ['月亮', '海', '风景', '夜'], 658, 987),
   new PictureInfo('迈向大海', ['海'], 690, 459),
   new PictureInfo('每天回家就这样欢快地奔来', ['狗', '动物'], 658, 987),
   new PictureInfo('下午茶点，咖啡味的！', ['甜点', '美食'], 658, 989),
   new PictureInfo('林海雪原公路', ['森林', '路', '风景'], 658, 823),
   new PictureInfo('心动了吗？', ['猫', '插画', '手绘'], 580, 735),
   new PictureInfo('哇，眼睛藏大海系列！', ['猫'], 543, 800),
   new PictureInfo('', ['小溪', '山', '风景'], 2560, 1920),
   
   new PictureInfo('萌一脸的小狐狸', ['狐狸', '动物'], 650, 373),
   new PictureInfo('', ['人像'], 658, 427),
   new PictureInfo('抱一起好欢乐呀', ['动物'], 580, 782),
   new PictureInfo('灯笼？伞？', ['伞'], 619, 933),
   new PictureInfo('', ['灯笼'], 510, 764),
   new PictureInfo('很有水墨画的韵味', ['渔舟'], 658, 421),
   new PictureInfo('如果有个院子，也想装一个吊椅', ['吊椅'], 428, 640),
   new PictureInfo('', ['插画', '手绘'], 658, 877),
   new PictureInfo('咖啡拉花练手', ['咖啡'], 500, 750),
   new PictureInfo('夏日少年', ['插画', '手绘'], 630, 765),
   
   new PictureInfo('林间溪涧', ['森林', '小溪', '风景'], 658, 822),
   new PictureInfo('海边的小城，美极了', ['海'], 1440, 961),
   new PictureInfo('这个品牌的咖啡豆怎么样', [], 614, 768),
   new PictureInfo('', ['柠檬'], 500, 750),
   new PictureInfo('逆光下的玫瑰', ['花'], 658, 990),
   new PictureInfo('', ['楼梯'], 564, 846),
   new PictureInfo('小水獭', ['动物'], 580, 872),
   new PictureInfo('', ['人像'], 500, 750),
   new PictureInfo('这居然是画出来的', ['海', '浪花', '画'], 786, 546),
   new PictureInfo('', [], 500, 750),
   
   new PictureInfo('星际穿越中惊艳一幕，据说这个黑洞形状还是有考究的', ['星际穿越', '黑洞', '电影'], 1280, 720),
   new PictureInfo('La La Land后劲十足，石头姐真的美', ['La La Land', '电影'], 1280, 501),
   new PictureInfo('', ['餐厅', '室内设计'], 540, 670),
   new PictureInfo('绚烂的花市', ['花'], 540, 720),
   new PictureInfo('星海浩瀚', ['星空'], 1920, 1200),
   new PictureInfo('苍茫广阔', ['风景'], 2560, 1920),
   new PictureInfo('山谷间的星空', ['山', '夜', '风景', '星空'], 1200, 801),
   new PictureInfo('大自然的配色可真美', ['风景'], 1200, 801),
   new PictureInfo('不可言喻之美', ['山', '夜', '风景', '星空', '河流'], 2048, 1407),
   new PictureInfo('高楼林立', ['城市'], 2048, 1365),
];

const commonRemarks = [
   '太好看了吧！',
   '啦啦啦',
   '哈哈，正是我想找的',
   '我喜欢',
   '很有意思哦',
   '好有趣啊',
   '感谢，收藏了！',
   '找了好久的素材',
   '谢谢po主',
   '挺好看的',

   '秋寒深深，染季节的眉梢。一抹嫣红藏了一份秋的清宁，一片红叶暖了一岁的红烛。秋的浪漫中酿造了一潭老陈，等着年轮封口。',
   '罅隙的时光，晕染的星辰 。寻找前世的情人，芬芳中绿草如茵，温柔添情。落叶匆匆里，躲过了风雨的孤冷，飘走了浮华的夜梦。',
   '繁华盛开，秋红朵朵。一湖清晖的银波，在秋月的溪声中，绽放惬意的笑颜。在定格诱人的芳香里，沿指尖滑落了红叶的温暖。',
   '一阙的相思中，写满了红叶。盘旋的清愁莹落了断断续续的泪花。秋寒的诗句，把远方的泪水化作了天涯的韵律，海角的节拍。',
   '心魂作一首秋诗，字里幽愁，行间苍凉。把更叠的岁月染成一峦金黄。再用秋的激情渲染一幅图，一半画春，一半绘冬。',
   '萧瑟空灵，青灯古佛，禅意岁月的善良，把人间大爱播种四月天。在神奇的菩提树上开满美好的云彩，芳香在眼前，在心间。',
   '用一枚渺小的念想，种在秋色里。随春绿、赶夏朗、追秋艳、伴冬雪长大，开花。牵手你我，砚池秋墨，执笔红叶，祭一壶夕阳，西染枫叶红。',
   '青花霓裳，羽衣红襟。摘一瓣桃红，闻香。肩一蓝黄菊，赏花。几时明月滑落山脚，拉开了一山的天幕，缀满星辰，染黑穹顶。',
   '昨日成了故事，翻卷了边角，撕碎了笔划。一道难愈的情伤，沉默心底，卷缩在阴暗的角落，擦着泪痕，数落时光。',
   '时间是不会停止的，它不曾为谁停留。一路匆匆，不管眼前掠过的是碧海云山，是残檐破瓦，都成为岁月的浮云',

   '超好看',
   '很有feel啊',
   '滴，打卡！',
   '哈哈哈哈抱走了',
   '喜欢，点赞了',
   '我是沙发吗？？？',
   '朕已阅',
   '记录一下',
   '马住，nice',
   '还有类似的素材吗？',

   '真愿回到那片山背后的红尘，移栽风吹雨打的芭蕉树的绿叶，待花梨清润，等杏果落黄。',
   '岁月是安然的，人生是悸动的。每一处的安宁都是喧嚣后的沉寂，从古自今，所有的繁华都无法长久，所有的名利也无法永远依持。',
   '就还行吧',
   '是我喜欢的风格',
   '请发更多！',
   '感觉缺点什么',
   '不错不错',
   '拿去当壁纸了～',
   '好酷啊哈哈哈哈哈哈存了！',
   '快互相点赞啊！',
   
   '轻启轩窗，春燕盘旋，杨柳依依，芳草青青，花影斑驳，桃李芳菲尽，夏花次第开。五月的风儿，轻轻的柔柔的暖暖的亲吻过脸颊，鼻间新绿的清香泉水般“汩汩”的流淌。走过春天，躲过流年，站在五月的时空隧道中，时光竟然还是这般的如此匆匆。',
   '行走在铺满阳光的小径，轻嗅风中花香的美好，心思是否会如露珠般晶莹剔透呢？最好的时光，应开出最好的花吧。',
   '轻触时光，一些念，若雨，滴落心间；一些梦，若云，时隐时现。时光，是指尖的流沙，握不住的水色年华。来不及凝眸，所有的浮华，都成了不堪剪的烟花。时间煮雨，流年清浅，清颜亦已凝霜，这风蚀的岁月，会终究沉淀心事婉约成旧日的时光吗？',
   '五月旖旎的风儿轻描淡写着云影，溢满的花瓣小心呵护着晶莹的露珠，那这一场又一场梨花带雨的心事又是在向谁轻轻的诉说？那这风干的记忆，又会在谁的经年梦幻中，如此这般的散了，淡了，远了呢？',
   '曾说的莫失莫忘，已在光阴的扉页上泛黄。从别以后，心一直如莲绽放，这杯茶我独自品尝。将一生的柔情，凝聚成一朵花的姿态。把阑珊的心事，缠绵的过往，凝固于心，尘封收藏，淡然相看，不诉离殇。！',
   '经历过繁华似锦，贪恋过红尘烟火，方知人生一世，浮华若梦。许多的相遇被辜负后才明白，有些人只能缅怀，有些事只能成故事。我们都曾为那些割舍不掉的情感，深深哭泣过，再到后来只是云淡风轻地想起。',
   '每一场花事，都是一次蜕变，枯萎或者重生。虽然，往事落满了尘埃，却依旧还是梦里情怀。怀一颗云水禅心，简静度日，随缘聚散，轮回也成了美丽。无论，故事写下怎样的结局，请善待时光与岁月，给曾经一个微笑吧。',
   '紫陌红尘，终究是一场繁华落寞。霜染风华，我依然坚守一方蒹葭。有些情，不需要四目对望，也能成就一场惊鸿。那是我一个人的风景，细水长流；一个人的流年，姹紫嫣红；一个人的爱情，天下无双。',
   '时光的深处，红尘的渡口。我依然伫立静水一方，以字暖情，惬意平生。不叹息！流年将故事写成落花的结局；不幽怨，时光又将彼此站成两端的风景。走过蒹葭苍苍，这一场念念不忘，渐渐地从岁月指缝间悄悄溜走，转角处，你喝的茶已凉。',
   '一个低头，烟雨楼台外，咫尺成天涯；一曲相思，从落笔钟情已写到往事曾经。只要曾经拥有，无需刻意挽留；只要心存感激，无惧烟雨薄凉。随缘而安，也是一种清修，最起码不会被春花秋月所伤。',
];

const usualRemarkId = [
   [1, 17, 23],
   [22, 25, 26],
   [7, 16, 32],
   [14, 27, 31],
   [2, 19, 35],
   [0, 21, 34],

   [3, 6, 24],
   [9, 13, 30],
   [5,29, 33],
   [4, 15, 20],
   [10, 11, 12],
   [8, 18, 28],
   
   [36, 42, 48],
   [41, 43, 49],
   [38,46, 0],
   [37, 45, 12],
   [40, 44, 6],
   [39, 47, 8],
];

let users = [], pictures = [], likes = [], remarks = [];

function mockData(){
   const picCount = picInfo.length;
   const numArr = Array.from(new Array(picCount), (item, index) => index);
   const postIds = numArr.randomChoose();
   
   // user data
   users = [
      new User(0, '七厘米蔚蓝', '七厘米蔚蓝.jpg'),
      new User(1, '中二魔', '中二魔.jpg'),
      new User(2, '中毒勿解 =', '中毒勿解 =.jpg'),
      new User(3, '光一样', '光一样.jpg'),
      new User(4, '半自由Free', '半自由Free.jpeg'),
      new User(5, '叽哩咕噜', '叽哩咕噜.jpeg'),
      new User(6, '少年当自强', '少年当自强.jpeg'),
      new User(7, '手心里的海', '手心里的海.jpg'),
      new User(8, '滚筒洗衣机', '滚筒洗衣机.jpg'),
      new User(9, '薔薇花開', '薔薇花開.jpeg'),
      new User(10, '诠离″', '诠离″.jpg'),
      new User(11, '造梦怪咖丶', '造梦怪咖丶.jpg'),
      new User(12, 'Hagu白', 'Hagu白.jpeg'),
      new User(13, 'Visen`韦森', 'Visen`韦森.jpg'),
      new User(14, '不羁的风', '不羁的风.jpeg'),
      new User(15, '南北两知', '南北两知.jpg'),
      new User(16, '热心网友橘奶奶', '热心网友橘奶奶.jpeg'),
      new User(17, '辞欢', '辞欢.jpeg'),

   ];
   User.nextId = users.length;
   const userCount = users.length;

   // picture data
   for(let i = 0; i < picCount; i++){
      const pic = new Picture(
         i,
         i+1+'.jpg',
         picInfo[i].description,
         picInfo[i].tags,
         picInfo[i].width,
         picInfo[i].height,
         0,
         0,
         Math.randomBetween(0, 300),
         0
      );
      pictures.push(pic);
   }
   Picture.nextId = picCount;
   postIds.forEach((imgId, index) => {
      pictures[imgId].by_id = index%userCount;
   });

   // like data
   Like.nextId = 0;
   users.forEach((user) => {
      const picNum = Math.randomBetween(50, 110);
      const randomPicIds = numArr.randomChoose(picNum);
      randomPicIds.forEach((picId) => {
         likes.push(new Like(Like.nextId++, user.id, picId));
         pictures[picId].like_num ++;
      });
   });

   // remark data 0 9, 10 19, 20 29, 30 39
   Remark.nextId = 0;
   users.forEach((user) => {
      const usualRmkNum = usualRemarkId[0].length;
      const picNum = Math.randomBetween(50, 90);
      // const remarkNum1 = Math.randomBetween(1, Math.floor(picNum/usualRmkNum));
      // const remarkNum2 = Math.randomBetween(1, Math.floor(picNum/usualRmkNum));
      const randomPicIds = numArr.randomChoose(picNum);
      
      let remarkNum = [], leftNum = picNum;
      for(let i = 0; i < usualRmkNum-1; i++){
         const thisNum = Math.randomBetween(1, Math.floor(picNum/usualRmkNum));
         remarkNum[i] = thisNum;
         leftNum -= thisNum;
      }
      remarkNum.push(leftNum);
      
      // 0 [0]
      // [0] [0]+[1]
      // [0]+[1] [0]+[1]+[2]
      // [0]+[1]+[2] [0]+[1]+[2]+[3]
      
      let from = 0, to = 0;
      for(let i = 0; i < usualRmkNum; i++){
         to += remarkNum[i];
         for(let j = from; j < to; j++){
            remarks.push(new Remark(
               Remark.nextId++,
               commonRemarks[usualRemarkId[user.id][i]],
               user.id,
               randomPicIds[j]
            ));
            pictures[randomPicIds[j]].remark_num ++;
         }
         from += remarkNum[i];
      }
      //
      // for(let i = 0; i < remarkNum1; i++) {
      //    remarks.push(new Remark(
      //       Remark.nextId++,
      //       commonRemarks[usualRemarkId[user.id][0]],
      //       user.id,
      //       randomPicIds[i]
      //    ));
      //    pictures[randomPicIds[i]].remark_num ++;
      // }
      // for(let i = remarkNum1; i < remarkNum1 + remarkNum2; i++) {
      //    remarks.push(new Remark(
      //       Remark.nextId++,
      //       commonRemarks[usualRemarkId[user.id][1]],
      //       user.id,
      //       randomPicIds[i]
      //    ));
      //    pictures[randomPicIds[i]].remark_num ++;
      // }
      // for(let i = remarkNum1 + remarkNum2; i < picNum; i++) {
      //    remarks.push(new Remark(
      //       Remark.nextId++,
      //       commonRemarks[usualRemarkId[user.id][2]],
      //       user.id,
      //       randomPicIds[i]
      //    ));
      //    pictures[randomPicIds[i]].remark_num ++;
      // }
   });

   localStorage.users = JSON.stringify(users);
   localStorage.pictures = JSON.stringify(pictures);
   localStorage.likes = JSON.stringify(likes);
   localStorage.remarks = JSON.stringify(remarks);
}

(function(){
   if(!localStorage.users)
      mockData();
   window.model = {
      users: JSON.parse(localStorage.users),
      pictures: JSON.parse(localStorage.pictures),
      likes: JSON.parse(localStorage.likes),
      remarks: JSON.parse(localStorage.remarks),
      flush: function (itemName) {
         localStorage[itemName] = JSON.stringify(this[itemName]);
      }
   };
   // console.log("start");
})();
