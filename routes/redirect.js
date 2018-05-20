import dbHandler from '../database/databaseHandler.js';
import { CHAR_MAP, BASE } from '../constants/urlConstants.js';


const redirectToLongURL = (req, res) => {
  let url = req.url.substr(1);
  let urlId = decode(url);

  dbHandler.query('SELECT long_url FROM tb_url_mappings WHERE id = ?', [urlId], function(err, result) {
    if(err) {
      res.status(500);
      return res.send('Internal Server Error');
    } else {
      if(!result.length) {
        res.status(404);
        return res.send('404 Not Found.');
      } else {
        //update numHits
        let originalURL = result[0].long_url;
        dbHandler.query('UPDATE tb_url_mappings SET num_hits = num_hits + 1 WHERE id = ?', [urlId], function(err, result) {
          res.redirect(originalURL);
        });
      }
    }
  });
}



function decode(string) {
  let num = 0;
  for(let i = 0; i < string.length; i++) {
    num = num*BASE + CHAR_MAP.indexOf(string[i]);
  }
  return num;
}

export default redirectToLongURL;
