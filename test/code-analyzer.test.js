import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';

describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('')),
            '[]'
        );
    });
    it('is parsing a simple variable declaration correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('let a = 1;')),
            '[{"Line":1,"Type":"VariableDeclaration","Name":"a","Condition":"","Value":"1"}]'
        );
    });
    it('is parsing a function declaration with arguments correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('function binarySearch(X, V, n){\n' + '}')),
            '[{"Line":1,"Type":"FunctionDeclaration","Name":"binarySearch","Condition":"","Value":""},{"Line":1,"Type":"FunctionDeclaration","Name":"X","Condition":null,"Value":null},{"Line":1,"Type":"FunctionDeclaration","Name":"V","Condition":null,"Value":null},{"Line":1,"Type":"FunctionDeclaration","Name":"n","Condition":null,"Value":null}]'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing a multi variable declaration function correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('let low, high, mid;')),
            '[{"Line":1,"Type":"VariableDeclaration","Name":"low","Condition":"","Value":""},{"Line":1,"Type":"VariableDeclaration","Name":"high","Condition":"","Value":""},{"Line":1,"Type":"VariableDeclaration","Name":"mid","Condition":"","Value":""}]'
        );
    });
    it('is parsing an assignment expression with literal value correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('low = 0;')),
            '[{"Line":1,"Type":"AssignmentExpression","Name":"low","Condition":"","Value":"0"}]'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing an assignment expression with birany expression correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('high = n - 1;\n')),
            '[{"Line":1,"Type":"AssignmentExpression","Name":"high","Condition":"","Value":"n-1"}]'
        );
    });
    it('is parsing a while statement correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('while (low <= high) {\n' + '    }')),
            '[{"Line":1,"Type":"WhileStatement","Name":"","Condition":"low<=high","Value":""}]'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing an if statement without else correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('if (X < V[mid])\n' + 'high = mid - 1;')),
            '[{"Line":1,"Type":"IfStatement","Name":"","Condition":"X<V[mid]","Value":""},{"Line":2,"Type":"AssignmentExpression","Name":"high","Condition":"","Value":"mid-1"}]'
        );
    });
    it('is parsing a if statement with else if and else correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('if (X < V[mid])\n' +
                '            high = mid -1;\n' +
                '        else if (X > V[mid])\n' +
                '            low = mid + 1;\n' +
                '        else\n' +
                '            x=mid++;')),
            '[{"Line":1,"Type":"IfStatement","Name":"","Condition":"X<V[mid]","Value":""},{"Line":2,"Type":"AssignmentExpression","Name":"high","Condition":"","Value":"mid-1"},{"Line":3,"Type":"IfStatement","Name":"","Condition":"X>V[mid]","Value":""},{"Line":4,"Type":"AssignmentExpression","Name":"low","Condition":"","Value":"mid+1"},{"Line":6,"Type":"AssignmentExpression","Name":"x","Condition":"","Value":"mid++"}]'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing a return statement in function correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('function nir(x){\n' +
                'return x;\n' +
                '}')),
            '[{"Line":1,"Type":"FunctionDeclaration","Name":"nir","Condition":"","Value":""},{"Line":1,"Type":"FunctionDeclaration","Name":"x","Condition":null,"Value":null},{"Line":2,"Type":"ReturnStatement","Name":"","Condition":"","Value":"x"}]'
        );
    });
    it('is parsing a for statement correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('for(let i=0;i<9;++i){\n' +
                'x=x+1;\n' +
                '}')),
            '[{"Line":1,"Type":"ForStatement","Name":"","Condition":"i<9","Value":"++i"},{"Line":1,"Type":"VariableDeclaration","Name":"i","Condition":"","Value":"0"},{"Line":2,"Type":"AssignmentExpression","Name":"x","Condition":"","Value":"x+1"}]'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing a complex function correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('function binarySearch(X, V, n){\n' +
                '    let low, high, mid;\n' +
                '    low = 0;\n' +
                '    high = n - 1;\n' +
                '    while (low <= high) {\n' +
                '        mid = (low + high)/2;\n' +
                '        if (X < V[mid])\n' +
                '            high = mid - 1;\n' +
                '        else if (X > V[mid])\n' +
                '            low = mid + 1;\n' +
                '        else\n' +
                'for(;i<9;i++){\n' +
                'x=x+8;\n' + '}\n' + '            return mid;\n' + '    }\n' + '    return -1;\n' + '}')),
            '[{"Line":1,"Type":"FunctionDeclaration","Name":"binarySearch","Condition":"","Value":""},{"Line":1,"Type":"FunctionDeclaration","Name":"X","Condition":null,"Value":null},{"Line":1,"Type":"FunctionDeclaration","Name":"V","Condition":null,"Value":null},{"Line":1,"Type":"FunctionDeclaration","Name":"n","Condition":null,"Value":null},{"Line":2,"Type":"VariableDeclaration","Name":"low","Condition":"","Value":""},{"Line":2,"Type":"VariableDeclaration","Name":"high","Condition":"","Value":""},{"Line":2,"Type":"VariableDeclaration","Name":"mid","Condition":"","Value":""},{"Line":3,"Type":"AssignmentExpression","Name":"low","Condition":"","Value":"0"},{"Line":4,"Type":"AssignmentExpression","Name":"high","Condition":"","Value":"n-1"},{"Line":5,"Type":"WhileStatement","Name":"","Condition":"low<=high","Value":""},{"Line":6,"Type":"AssignmentExpression","Name":"mid","Condition":"","Value":"low+high/2"},{"Line":7,"Type":"IfStatement","Name":"","Condition":"X<V[mid]","Value":""},{"Line":8,"Type":"AssignmentExpression","Name":"high","Condition":"","Value":"mid-1"},{"Line":9,"Type":"IfStatement","Name":"","Condition":"X>V[mid]","Value":""},{"Line":10,"Type":"AssignmentExpression","Name":"low","Condition":"","Value":"mid+1"},{"Line":12,"Type":"ForStatement","Name":"","Condition":"i<9","Value":"i++"},{"Line":13,"Type":"AssignmentExpression","Name":"x","Condition":"","Value":"x+8"},{"Line":15,"Type":"ReturnStatement","Name":"","Condition":"","Value":"mid"},{"Line":17,"Type":"ReturnStatement","Name":"","Condition":"","Value":"-1"}]'
        );
    });
});