import fs from 'fs';

var Service = (options) => {
    if(!options.out){
        return (result, callback) => { console.log(result); };
    }
    else{
        return (result, callback) => {
            fs.writeFile(options.out, JSON.stringify(result, null, 2), callback);
        };
    }
};

export default Service;