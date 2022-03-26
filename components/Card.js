import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import SharedContext from '../pages/SharedContext';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export default function Card() {
    const {singleID, games, setGames, panel, setPanel, setClicked} = React.useContext(SharedContext);

    let curGame = [];
    curGame = games.filter((game) => game.home_team.id === singleID);

    return (
        <div>
            <Drawer
                anchor={"right"}
                open={panel}
                onClose={() => {
                    setPanel(false);
                    setClicked(false);
                }}
            >
                <div className="flex space-x-60 pl-5 p-2 bg-[#F2F2F2]">
                    <h2 className = "text-black">Team Name</h2>
                    <IconButton
                        className="float-right"
                        onClick={() => {
                            setPanel(false);
                            setClicked(false);
                        }}
                        color="inherit" >
                        <CloseIcon />
                    </IconButton>
                </div>
                <div className="grid grid-cols-2 gap-4 pl-4 mt-2">
                    <div>
                        <p>Team Full Name</p>
                        <p>Total Games in 2021</p>
                    </div>
                    <div>
                        {curGame[0] && <p> {curGame[0].home_team.full_name}</p>}
                        {curGame[0] && <p> {curGame[0].period}</p>}
                    </div>
                </div>
                <h6 className = "pl-3 text-black"> Random Game Details </h6>
                <div className="grid grid-cols-2 gap-4 pl-6 pt-2 font-medium text-black">
                <div>
                    <p>Date</p>
                    <p>Home Team</p>
                    <p>Home Team Score </p>
                    <p>Visitor Team </p>
                    <p>Visitor Team Score</p>
                </div>
                {curGame &&
                <div>
                    {curGame[0] && <p> {curGame[0].date.slice(0,10)}</p>}
                    {curGame[0] && <p> {curGame[0].home_team.name}</p>}
                    {curGame[0] && <p> {curGame[0].home_team_score}</p>}
                    {curGame[0] && <p> {curGame[0].visitor_team.name}</p>}
                    {curGame[0] && <p> {curGame[0].visitor_team_score}</p>}
                </div>}
            </div>
            </Drawer>
        </div>
    );
}