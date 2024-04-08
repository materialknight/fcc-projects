#!/bin/bash

if [[ -z $1 ]]
then
   echo "Please provide an element as an argument."
   exit
fi

PSQL="psql --username=freecodecamp --dbname=periodic_table --tuples-only --no-align --command"

QUERY="SELECT atomic_number, name, symbol, type, atomic_mass, melting_point_celsius, boiling_point_celsius
FROM elements FULL JOIN properties USING(atomic_number) FULL JOIN types USING(type_id)"

FORMAT_RESULT()
{
   if [[ -z $1 ]]
   then
      echo "I could not find that element in the database."
      return
   fi

   local IFS='|'

   read -r ATOMIC_NUM NAME SYMBOL TYPE ATOMIC_MASS MELTING_POINT BOILING_POINT <<< "$1"

   echo "The element with atomic number $ATOMIC_NUM is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATOMIC_MASS amu. $NAME has a melting point of $MELTING_POINT celsius and a boiling point of $BOILING_POINT celsius."
}

if [[ $1 =~ [0-9]+ ]]
then
   FORMAT_RESULT "$($PSQL "$QUERY WHERE atomic_number=$1")"
else
   FORMAT_RESULT "$($PSQL "$QUERY WHERE symbol ILIKE '$1' OR name ILIKE '$1'")"
fi
