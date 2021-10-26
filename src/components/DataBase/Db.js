import elasticsearch from 'elasticsearch'
var Db = new elasticsearch.Client({
    host: 'http://localhost:9200/',
    requestTimeout: Infinity, // Tested
    keepAlive: true // Tested
    
});
export default Db;
 
      
    
  