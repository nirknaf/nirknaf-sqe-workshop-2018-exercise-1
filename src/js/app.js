import $ from 'jquery';
import {parseCode} from './code-analyzer';

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        // $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
        var col = ['Line', 'Type', 'Name', 'Condition', 'Value'];
        let table = document.getElementById('table');
        table.innerHTML='';
        let tr = table.insertRow(-1);
        setTableHeader(col, tr);
        var tabCell;
        for(var i = 0; i<parsedCode.length; i++){
            tr = table.insertRow(-1);
            for(var j =0; j<col.length; j++){
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = parsedCode[i][col[j]];    // GET BOOK DETAILS FOR EACH HEADER.
            }
        }
    });
});
function setTableHeader(col, tr) {
    for (var i = 0; i < col.length; i++) {
        var th = document.createElement('th');      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }
}