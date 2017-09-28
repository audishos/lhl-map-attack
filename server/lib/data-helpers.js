module.exports = function makeDataHelpers(knex){
  return {
    getMaps: (callback)=>{
      knex('maps').select()
      .then((results) =>{
        callback(null, results);
      })
      .catch((e) => {
        callback(e, null);
      });
    },
    getPointsOnMap: (mapid, callback)=>{
      knex('points').where('map_id', '=', mapid).select()
      .then((results)=> {
        callback(null, results);
      })
      .catch((e) =>{
        callback(e, null);
      })
    },
    
    //Function to obtain a Map object
    getMapObject: (map_id) => {
      const promise = new Promise( (resolve, reject) => {
        knex('maps').select()
        .where('id', map_id)
        .then( (res) => {
          resolve(res);
        })
        .catch( (err) => {
          reject(err);
        })
      })
      return promise;
    }

  } //End of return
} //End of module.exports