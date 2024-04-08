#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=number_guess --tuples-only --no-align --command"
SECRET_NUM=$(( RANDOM % 1000 + 1 ))

echo "Enter your username:"
read USERNAME

PLAYER_DATA="$($PSQL "SELECT games_played, best_game FROM players_data WHERE player='$USERNAME'")"

if [[ -z $PLAYER_DATA ]]
then
   echo "Welcome, $USERNAME! It looks like this is your first time here."
else
   PREV_IFS=$IFS
   IFS='|'

   read GAMES_PLAYED BEST_GAME <<< "$PLAYER_DATA"

   IFS=$PREV_IFS

   echo "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
fi

TRIES=0

echo "Guess the secret number between 1 and 1000:"

while read GUESS
do
   (( ++TRIES ))

   if [[ ! $GUESS =~ [0-9]+ ]]
   then
      echo "That is not an integer, guess again:"
   elif [[ $GUESS -gt $SECRET_NUM ]]
   then
      echo "It's lower than that, guess again:"
   elif [[ $GUESS -lt $SECRET_NUM ]]
   then
      echo "It's higher than that, guess again:"
   else
      echo "You guessed it in $TRIES tries. The secret number was $SECRET_NUM. Nice job!"
      break
   fi
done

(( ++GAMES_PLAYED ))

if [[ -z $PLAYER_DATA ]]
then
   $PSQL "INSERT INTO players_data(player, games_played, best_game)
   VALUES('$USERNAME', $GAMES_PLAYED, $TRIES)" > /dev/null
elif [[ $TRIES -lt $BEST_GAME ]]
then
   $PSQL "UPDATE players_data
   SET games_played = $GAMES_PLAYED, best_game = $TRIES
   WHERE player = '$USERNAME'" > /dev/null
else
   $PSQL "UPDATE players_data
   SET games_played = $GAMES_PLAYED
   WHERE player = '$USERNAME'" > /dev/null
fi
