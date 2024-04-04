#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.

# Clean tables:
echo "$($PSQL "TRUNCATE games, teams")"

TEAMS=''

while IFS=',' read YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS
do
   if [[ $YEAR == 'year' ]]
   then
      continue
   fi

   if [[ ! "$TEAMS" =~ "$WINNER" ]]
   then
      TEAMS+="('$WINNER')"
   fi

   if [[ ! "$TEAMS" =~ "$OPPONENT" ]]
   then
      TEAMS+="('$OPPONENT')"
   fi
done < "games.csv"

TEAMS_FORMATTED="$(echo "$TEAMS" | sed 's/)(/),(/g')"

echo "$($PSQL "INSERT INTO teams(name) VALUES$TEAMS_FORMATTED")"

ALL_TEAMS="$($PSQL "SELECT * FROM teams")"

declare -A TEAMS_ID

while IFS='|' read ID TEAM
do
   TEAMS_ID["$TEAM"]="$ID"
done <<< "$ALL_TEAMS"

GAMES=''

while IFS=',' read YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS
do
   if [[ $YEAR == 'year' ]]
   then
      continue
   fi

   GAMES+="($YEAR, '$ROUND', ${TEAMS_ID[$WINNER]}, ${TEAMS_ID[$OPPONENT]}, $WINNER_GOALS, $OPPONENT_GOALS)"
done < "games.csv"

GAMES_FORMATTED="$(echo "$GAMES" | sed 's/)(/),(/g')"

echo "$($PSQL "INSERT INTO games(year, round, winner_id, opponent_id, winner_goals, opponent_goals) VALUES$GAMES_FORMATTED")"