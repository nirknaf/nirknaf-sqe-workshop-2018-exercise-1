import * as esprima from 'esprima';

function line_in_table(line, type, name, cond, value){
    this.Line = line;
    this.Type = type;
    this.Name = name;
    this.Condition = cond;
    this.Value = value;
}

let table = [];
const parseCode = (codeToParse) => {
    let parsedProg = JSON.parse(JSON.stringify(esprima.parseScript(codeToParse , {loc: true})));
    table =[];
    if(parsedProg.body[0] == null) {
        return table;
    }
    pasre_by_type[(parsedProg.body[0].type)](parsedProg.body[0]);
    // return esprima.parseScript(codeToParse ,{loc: true});
    return table;
};
function parseFunc(obj) {
    table.push( new line_in_table(obj.loc.start.line, obj.type, obj.id.name, '', ''));
    for(var i=0;i<obj.params.length;i++){
        table.push(new line_in_table(obj.loc.start.line, 'FunctionDeclaration', obj.params[i].name, null, null ));
    }
    pasre_by_type[obj.body.type](obj.body);
}
function parseVarDec(obj) {
    let i;
    let init='';
    for(i=0; i<obj.declarations.length;i++ ){
        if(obj.declarations[i].init!=null){
            init =parse_rightHS[obj.declarations[i].init.type](obj.declarations[i].init);
        }
        table.push( new line_in_table( obj.declarations[i].loc.start.line, obj.type, obj.declarations[i].id.name,'',init));
    }
}
function parseExperStatement(obj) {
    // if(obj.expression.type === 'AssignmentExpression'){
    parseAssignExper(obj.expression);
    // }
}
function parseAssignExper(obj) {
    table.push( new line_in_table( obj.loc.start.line, obj.type, obj.left.name, '', parse_rightHS[obj.right.type](obj.right) ));
}
function praseWhileStatement(obj) {
    table.push( new line_in_table(obj.loc.start.line, obj.type,'', parse_rightHS[obj.test.type](obj.test), ''));
    pasre_by_type[obj.body.type](obj.body);
}
function parseReturnStatement(obj){
    table.push(new line_in_table(obj.loc.start.line, obj.type, '', '', parse_rightHS[obj.argument.type](obj.argument)));
}
function parseIfStatement(obj) {
    table.push( new line_in_table(obj.loc.start.line, obj.type, '', parse_rightHS[obj.test.type](obj.test),''));
    pasre_by_type[obj.consequent.type](obj.consequent);
    if(obj.alternate != null){
        pasre_by_type[obj.alternate.type](obj.alternate);
    }
}
function parseBlockStatement(obj) {
    let i;
    for(i=0;i<obj.body.length;i++){
        pasre_by_type[obj.body[i].type](obj.body[i]);
    }
}
function parseForStatement(obj) {
    table.push(new line_in_table(obj.loc.start.line, obj.type, '', parse_rightHS[obj.test.type](obj.test),parse_rightHS[obj.update.type](obj.update)));
    if(obj.init != null) {
        pasre_by_type[obj.init.type](obj.init);
    }
    pasre_by_type[obj.body.type](obj.body);
}
function parseLiteral(obj) {
    return obj.raw;
}
function parseId(obj) {
    return obj.name;
}
function parseBinaryExper(obj) {
    return parse_rightHS[obj.left.type](obj.left) + obj.operator + parse_rightHS[obj.right.type](obj.right);
}
function parseUnaryExper(obj){
    return obj.operator + parse_rightHS[obj.argument.type](obj.argument);
}
function parseMemberExper(obj) {
    return parse_rightHS[obj.object.type](obj.object)+'['+parse_rightHS[obj.property.type](obj.property)+']';
}
function parseUpdate(obj) {
    let op = obj.operator;
    let arg = parse_rightHS[obj.argument.type](obj.argument);
    if(obj.prefix){
        return op + arg;
    }
    return arg + op;
}
const pasre_by_type = {
    'FunctionDeclaration' : parseFunc,
    'VariableDeclaration' : parseVarDec,
    'ExpressionStatement' : parseExperStatement,
    'WhileStatement' : praseWhileStatement,
    'ReturnStatement' : parseReturnStatement,
    'IfStatement' : parseIfStatement,
    'BlockStatement' : parseBlockStatement,
    'ForStatement' : parseForStatement,
    'AssignmentExpression' : parseAssignExper
};
const parse_rightHS = {
    'Literal' : parseLiteral,
    'Identifier' : parseId,
    'BinaryExpression' : parseBinaryExper,
    'UnaryExpression' : parseUnaryExper,
    'MemberExpression' : parseMemberExper,
    'UpdateExpression' : parseUpdate
};

export {parseCode};
