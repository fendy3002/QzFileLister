import fs from 'fs';

var Service = (options) => {
    if(!options.out){
        return (result, callback) => { 
            if(options.pretty){
                console.log(JSON.stringify(result, null, 2));
            }
            else{
                console.log(JSON.stringify(result));
            }
        };
    }
    else{
        return (result, callback) => {
            if(options.pretty){
                fs.writeFile(options.out, JSON.stringify(result, null, 2), callback);
            }
            else{
                fs.writeFile(options.out, JSON.stringify(result), callback);
            }
        };
    }
};

export default Service;