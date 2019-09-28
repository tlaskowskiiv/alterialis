module.exports.run = run;

const fs = require('fs');

function run() {
    const s = fs.readFileSync('main.js').toString();
    
    let cmds = [];
    let reName = /(?<=\/\/)(\S+)(?= )/g;
    let reDesc = /(?<=- )(.+)(?=\/\/)/g;
    var name = reName.exec(s);
    var desc = reDesc.exec(s);
    
    while (desc){
        cmds.push([name[0],desc[0]]);
        
        name = reName.exec(s);
        desc = reDesc.exec(s);
    }
    
    return cmds;
}