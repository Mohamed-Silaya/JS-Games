let title = document.querySelector('.title');
let turn = 'x';
let squares = [];

function youDidIt (id1, id2, id3)
{
    document.getElementById('item' + id1).style.background = 'green';
    document.getElementById('item' + id2).style.background = 'green';
    document.getElementById('item' + id3).style.background = 'green';
    title.innerHTML = 'Player ' + document.getElementById('item'+id1).innerHTML + ' wins';

    setInterval(function(){title.innerHTML +='.'},1000);
    setTimeout(function(){location.reload();}, 3000);
   
}

function winning ()
{
    for (let i=1; i<10 ; i++)
    {
        squares[i] = document.getElementById('item'+ i).innerHTML;
    }
    
    if (squares[1] == squares[2] && squares[2] == squares[3] && squares[1] != '')
        {
            youDidIt(1, 2, 3);
        }  
    else if (squares[4] == squares[5] && squares[5] == squares[6] && squares[4] != '')
        {
            youDidIt(4,5,6
     
)        }
    else if (squares[7] == squares[8] && squares[8] == squares[9] && squares[7] != '')
        {
            youDidIt(7,8,9);
        }
    else if (squares[1] == squares[4] && squares[4] == squares[7] && squares[1] != '')
        {
            youDidIt(1,4,7);
        }
    else if (squares[2] == squares[5] && squares[5] == squares[8] && squares[2] != '')
        {
            youDidIt(2,5,8);
        }
    else if (squares[3] == squares[6] && squares[6] == squares[9] && squares[3] != '')
        {
            youDidIt(3,6,9);
        }
    else if (squares[1] == squares[5] && squares[5] == squares[9] && squares[1] != '')
        {
            youDidIt(1,5,9);
        }
    else if (squares[3] == squares[5] && squares[5] == squares[7] && squares[3] != '')
        {
            youDidIt(3,5,7);
        }
    else if (squares[1] != '' && squares[2] != '' && squares[3] != '' && squares[4] != '' && squares[5] != '' && squares[6] != '' && squares[7] != '' && squares[8] != '' && squares[9] != '')
        {
            title.innerHTML = 'It is a draw';
            title.style.color = 'red';
            setTimeout(function(){location.reload();}, 3000);

        }
}

function game (id)
{
 let element = document.getElementById(id);
    if (turn === 'x' && element.innerHTML == '')
    {
        element.innerHTML = 'x';
        turn = 'o';
        title.innerHTML = 'Player O turn';
    }
    else if (turn === 'o' && element.innerHTML == '')

    {
            element.innerHTML = 'o';
            turn = 'x';
            title.innerHTML = 'Player X turn';
    }
    winning();
}