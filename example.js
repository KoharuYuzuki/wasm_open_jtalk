'use strict';

const openJTalk = require('./js/open_jtalk_modified.js');

openJTalk.run({
  text:  'こんにちは',
  dict:  'path/to/dict_dir',
  voice: 'path/to/htsvoice_file',
  speed: 1.0,
  rate:  48000,
  type:  'token', // token or wav
  tmp:   'path/to/tmp_dir'
}, (err, result) => {
  if (!err) {
    console.log(err);
  } else {
    console.log(result);
  }
});
