'use strict';

const openJTalk = require('./js/open_jtalk_modified.js');

openJTalk.run({
  text:  'こんにちは',
  dict:  'path/to/dict_dir',
  voice: 'path/to/htsvoice_file',
  speed: 1.0,
  rate:  48000,
  token: true,
  wav:   true,
  tmp:   'path/to/tmp_dir'
}, (err, tokens, wav) => {
  if (!err) {
    console.log(err);
  } else {
    console.log('tokens:', tokens);
    console.log('wav:',    wav);
  }
});
