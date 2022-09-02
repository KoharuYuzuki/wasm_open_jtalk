'use strict';

const fs = require('fs');

const inputPath  = './js/open_jtalk.js';
const outputPath = './js/open_jtalk_modified.js';

const replace = [
  ['process[\'argv\']', 'argv'],
  ['require(\'fs\')', 'fileSystem'],
  ['process[\'on\']', '(() => {})'],
  ['throw toThrow;', '/* throw toThrow; */'],
  ['process[\'exit\'](status);', '/* process[\'exit\'](status); */\n    if (!called) _fs.rmSync(inputPath);\n    if (!called) _fs.rmSync(outputPath);\n    if (!called) callback(toThrow, null);\n    called = true;']
];

let script = fs.readFileSync(inputPath, {encoding: 'utf-8'});

replace.forEach((x) => {
  const src = x[0];
  const dest = x[1];
  script = script.replaceAll(src, dest);
});

script =
`
'use strict';

const _fs = require('fs');
const _path = require('path');
const _crypto = require('crypto');

const romaji2kana = [
  ['pau', '、'],

  ['kya', 'キャ'],
  ['kyu', 'キュ'],
  ['kye', 'キェ'],
  ['kyo', 'キョ'],

  ['gya', 'ギャ'],
  ['gyu', 'ギュ'],
  ['gye', 'ギェ'],
  ['gyo', 'ギョ'],

  ['kwa', 'クヮ'],

  ['gwa', 'グヮ'],

  ['sha', 'シャ'],
  ['shi', 'シ'],
  ['shu', 'シュ'],
  ['she', 'シェ'],
  ['sho', 'ショ'],

  ['cha', 'チャ'],
  ['chi', 'チ'],
  ['chu', 'チュ'],
  ['che', 'チェ'],
  ['cho', 'チョ'],

  ['tsa', 'ツァ'],
  ['tsi', 'ツィ'],
  ['tsu', 'ツ'],
  ['tse', 'ツェ'],
  ['tso', 'ツォ'],

  ['tya', 'テャ'],
  ['tyu', 'テュ'],
  ['tyo', 'テョ'],

  ['dya', 'デャ'],
  ['dyu', 'デュ'],
  ['dyo', 'デョ'],

  ['nya', 'ニャ'],
  ['nyu', 'ニュ'],
  ['nye', 'ニェ'],
  ['nyo', 'ニョ'],

  ['hya', 'ヒャ'],
  ['hyu', 'ヒュ'],
  ['hye', 'ヒェ'],
  ['hyo', 'ヒョ'],

  ['bya', 'ビャ'],
  ['byu', 'ビュ'],
  ['bye', 'ビェ'],
  ['byo', 'ビョ'],

  ['pya', 'ピャ'],
  ['pyu', 'ピュ'],
  ['pye', 'ピェ'],
  ['pyo', 'ピョ'],

  ['mya', 'ミャ'],
  ['myu', 'ミュ'],
  ['mye', 'ミェ'],
  ['myo', 'ミョ'],

  ['rya', 'リャ'],
  ['ryu', 'リュ'],
  ['rye', 'リェ'],
  ['ryo', 'リョ'],

  ['cl', 'ッ'],

  ['ye', 'イェ'],

  ['ka', 'カ'],
  ['ki', 'キ'],
  ['ku', 'ク'],
  ['ke', 'ケ'],
  ['ko', 'コ'],

  ['sa', 'サ'],
  ['si', 'スィ'],
  ['su', 'ス'],
  ['se', 'セ'],
  ['so', 'ソ'],

  ['ta', 'タ'],
  ['ti', 'ティ'],
  ['tu', 'トゥ'],
  ['te', 'テ'],
  ['to', 'ト'],

  ['na', 'ナ'],
  ['ni', 'ニ'],
  ['nu', 'ヌ'],
  ['ne', 'ネ'],
  ['no', 'ノ'],

  ['ha', 'ハ'],
  ['hi', 'ヒ'],
  ['he', 'ヘ'],
  ['ho', 'ホ'],

  ['ma', 'マ'],
  ['mi', 'ミ'],
  ['mu', 'ム'],
  ['me', 'メ'],
  ['mo', 'モ'],

  ['ya', 'ヤ'],
  ['yu', 'ユ'],
  ['yo', 'ヨ'],

  ['ra', 'ラ'],
  ['ri', 'リ'],
  ['ru', 'ル'],
  ['re', 'レ'],
  ['ro', 'ロ'],

  ['wa', 'ワ'],
  ['wi', 'ウィ'],
  ['we', 'ウェ'],
  ['wo', 'ウォ'],

  ['fa', 'ファ'],
  ['fi', 'フィ'],
  ['fu', 'フ'],
  ['fe', 'フェ'],
  ['fo', 'フォ'],

  ['va', 'ヴァ'],
  ['vi', 'ヴィ'],
  ['vu', 'ヴ'],
  ['ve', 'ヴェ'],
  ['vo', 'ヴォ'],

  ['ga', 'ガ'],
  ['gi', 'ギ'],
  ['gu', 'グ'],
  ['ge', 'ゲ'],
  ['go', 'ゴ'],

  ['za', 'ザ'],
  ['zi', 'ズィ'],
  ['zu', 'ズ'],
  ['ze', 'ゼ'],
  ['zo', 'ゾ'],

  ['ja', 'ジャ'],
  ['ji', 'ジ'],
  ['ju', 'ジュ'],
  ['je', 'ジェ'],
  ['jo', 'ジョ'],

  ['da', 'ダ'],
  ['di', 'ディ'],
  ['du', 'ドゥ'],
  ['de', 'デ'],
  ['do', 'ド'],

  ['ba', 'バ'],
  ['bi', 'ビ'],
  ['bu', 'ブ'],
  ['be', 'ベ'],
  ['bo', 'ボ'],

  ['pa', 'パ'],
  ['pi', 'ピ'],
  ['pu', 'プ'],
  ['pe', 'ペ'],
  ['po', 'ポ'],

  ['a', 'ア'],
  ['i', 'イ'],
  ['u', 'ウ'],
  ['e', 'エ'],
  ['o', 'オ'],

  ['N', 'ン']
].map((x) => [new RegExp(x[0], 'ig'), x[1]]);

const outputLabelRegexp = new RegExp('^([0-9]+) ([0-9]+) [a-z]+\\\\^[a-z]+-([a-z]+)\\\\+[a-z]+\\\\=[a-z]+\\\\/A:(-*[0-9|a-z]+)', 'gmi');

function label2token (log) {
  const result = [...log.matchAll(outputLabelRegexp)].slice(1, -1);
  const labels = [];

  for (let i = 0, prev1 = 1, prev2 = 1; i < result.length; i++) {
    const match   = result[i];
    const start   = Number(match[1]);
    const end     = Number(match[2]);
    const phoneme = match[3];
    const accent  = (match[4] === 'xx') ? null : Number(match[4]);
    const length  = Math.round((end - start) / 10000);

    const isNull       = (accent === null);
    const isSmaller    = ((accent <= 0) && (prev1 >= 0) && (accent < prev1));
    const isContinuous = ((accent === prev1) && (accent === prev2));
    const isSokuon     = (phoneme === 'cl');

    const split = (isNull || isSmaller || isContinuous);

    if (split) {
      labels.unshift([]);
    }

    labels[0].push({phoneme, length, accent});

    [prev2, prev1] = (isNull) ? [1, 1] : (isContinuous) ? [1, accent] : (isSokuon) ? [2, 1] : [prev1, accent];
  }

  const tokens = labels.reverse().map((group) => {
    for (let i = 0, prevPhoneme = null; i < group.length; i++) {
      const label = group[i];

      if (label.phoneme === prevPhoneme) {
        label.phoneme = 'ー';
      } else {
        prevPhoneme = label.phoneme;
      }
    }

    const accents = [...new Set(group.map((label) => label.accent))];
    group = accents.map((accent, i) => {
      const filtered = group.filter((label) => label.accent === accent);
      const romaji = filtered.reduce((str, label) => str + label.phoneme, '');
      const length = filtered.reduce((num, label) => num + label.length, 0);
      const abs = i - accent;

      const kana = romaji2kana.reduce((kana, x) => {
        const src = x[0];
        const dest = x[1];
        return kana.replace(src, dest);
      }, romaji);

      return {
        reading: kana,
        length: length,
        accent: (accent === null) ? -1 : (i > abs) ? 0 : (i !== 0) ? 1 : (abs === 0) ? 1 : 0
      };
    });

    return group;
  });

  return tokens;
}

const runOpenJTalk = (options, callback) => {
let called = false;

const tmpDir = ('tmp' in options) ? options.tmp : '.';
const inputName = 'openjtalk_input_' + _crypto.randomUUID();
const outputName = 'openjtalk_output_' + _crypto.randomUUID();
const inputPath = _path.join(tmpDir, inputName);
const outputPath = _path.join(tmpDir, outputName);

const outputType = (('type' in options) && (options.type === 'token')) ? 'token' : 'wav';
const argv = [
  '',
  '',
  '-x', ('dict' in options) ? options.dict : '',
  '-m', ('voice' in options) ? options.voice : '',
  '-r', ('speed' in options) ? String(options.speed) : '1.0',
  '-s', ('rate' in options) ? String(options.rate) : '48000',
  (outputType === 'token') ? '-ot' : '-ow', outputPath,
  inputPath
];

const fileDescriptors = {};
const fileSystem = Object.fromEntries(
  Object.keys(_fs).map((key) => {
    let value = null;

    if (key === 'openSync') {
      value = (...args) => {
        const fd = _fs.openSync(...args);
        const path = args[0];
        fileDescriptors[fd] = path;
        return fd;
      }
    } else if (key === 'closeSync') {
      value = (...args) => {
        _fs.closeSync(...args);
        const fd = args[0];
        const path = fileDescriptors[fd];
        delete fileDescriptors[fd];

        const basename = _path.basename(path);
        if (basename !== outputName) return;

        const data = _fs.readFileSync(path, {
          encoding: (outputType === 'token') ? 'utf8' : null
        });

        _fs.rmSync(inputPath);
        _fs.rmSync(outputPath);

        if (outputType === 'token') {
          const tokens = label2token(data);
          if (!called) callback(null, tokens);
        } else {
          if (!called) callback(null, data);
        }

        called = true;
      }
    } else {
      value = _fs[key];
    }

    return [key, value];
  })
);

const module = {};

const text = ('text' in options) ? options.text : '';
_fs.writeFileSync(inputPath, text, {encoding: 'utf8'});

${script}
}

module.exports.run = runOpenJTalk;
`;

fs.writeFileSync(outputPath, script, {encoding: 'utf-8'});
