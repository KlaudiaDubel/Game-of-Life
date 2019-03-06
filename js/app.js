document.addEventListener("DOMContentLoaded", function()
{
    var boardInnerHTML = "";
    var cellWidth = 10;
    var cellNumber = 0;

    function GameOfLife(boardWidth, boardHeight)
    {
        this.width = boardWidth;
        this.height = boardHeight;
    }

    GameOfLife.prototype.board = document.getElementById("board");
    GameOfLife.prototype.cells = [];
    GameOfLife.prototype.createBoard = function()
    {
        this.board.style.width = this.width * cellWidth + "px";
        this.board.style.height = this.height * cellWidth + "px";
        cellNumber = this.width * this.height;

        for (var i = 0; i < cellNumber; i++)
        {
            boardInnerHTML += "<div></div>";
        }

        console.log(boardInnerHTML);
        this.board.innerHTML = boardInnerHTML;

        this.cells = this.board.getElementsByTagName("div");
        console.log(this.cells);

        for (var i = 0; i < this.cells.length; i++)
        {
            this.cells[i].addEventListener("mouseover", function()
            {
                this.classList.toggle("live");
            });
        }
    };

    GameOfLife.prototype.destroyBoard = function()
    {
        boardInnerHTML = "";
    };

    GameOfLife.prototype.getCell = function(x, y)
    {
        var index = x + y * this.width;
        return this.cells[index];
    };

    GameOfLife.prototype.setCellState = function(x, y, state)
    {
        var cell = this.getCell(x, y);

        if (state === "live")
        {
            cell.classList.add("live");
        }
        else if (state === "dead")
        {
            cell.classList.remove("live");
        }
    };

    GameOfLife.prototype.firstGlider = function()
    {
        this.setCellState(0, 0, "dead");
        this.setCellState(1, 0, "live");
        this.setCellState(2, 0, "dead");
        this.setCellState(0, 1, "dead");
        this.setCellState(1, 1, "dead");
        this.setCellState(2, 1, "live");
        this.setCellState(0, 2, "live");
        this.setCellState(1, 2, "live");
        this.setCellState(2, 2, "live");
    };

    GameOfLife.prototype.computeCellNextState = function(x, y)
    {
       var livingNeighbours = 0;
       var cell = 0;

        for (var i = -1; i <= 1; i++)
        {
            for (var j = -1; j <= 1; j++)
            {
                if (!(i === 0 && j === 0))
                {
                    cell = this.getCell(x + i, y + j);
                    if (cell !== undefined)
                    {
                        if (cell.className === "live")
                        {
                            livingNeighbours ++;
                        }
                    }

                }
            }
        }

        var deadOrAlive = 0;
        if (this.getCell(x, y).className === "live")
        {
            if (livingNeighbours < 2 || livingNeighbours > 3)
            {
                return 0;
            }
            else
            {
                return 1;
            }
        }
        else
        {
            if (livingNeighbours === 3)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
    };

    GameOfLife.prototype.computeNextGeneration = function()
    {
        GameOfLife.prototype.nextBoardstate = [];

        for (var i = 0; i < this.height; i++)
        {
            for (var j = 0; j < this.width; j++)
            {
                this.nextBoardstate.push(this.computeCellNextState(j, i));
            }
        }
    };

    GameOfLife.prototype.printNextGeneration = function()
    {
        game.computeNextGeneration();
        for (var i = 0; i < this.cells.length; i++)
        {
            if (this.nextBoardstate[i] === 1)
            {
                this.cells[i].classList.add("live");
            }
            else
            {
                this.cells[i].classList.remove("live");
            }
        }
    };
    var game = new GameOfLife(50, 50);

    document.getElementById("play").addEventListener("click", function()
    {
        GameOfLife.prototype.intervalHandle = setInterval(function ()
            {
                game.printNextGeneration();
            },
            300
        );
    });

    document.getElementById("pause").addEventListener("click", function()
    {
        clearInterval(game.intervalHandle);
    });

    GameOfLife.prototype.start = function()
    {
        this.destroyBoard();
        this.width = document.getElementById("width").value;
        this.height = document.getElementById("height").value;
        this.createBoard();
        //this.firstGlider();
        clearInterval(this.intervalHandle);
    };

    document.getElementById("start").addEventListener("click", function()
    {
        game.start();
    });

    console.log(game);

});