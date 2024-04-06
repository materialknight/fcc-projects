#! /bin/bash

PSQL="psql --username=freecodecamp --dbname=salon --tuples-only -c"

SERVICES="$($PSQL "SELECT * FROM services")"
SERVICES_COUNT="$(echo "$SERVICES" | wc --lines)"

declare -A ID_TO_SERVICE

while IFS=' | ' read ID SERVICE
do
   ID_TO_SERVICE["$ID"]="$SERVICE"
done <<< "$SERVICES"

MAIN_MENU()
{
   if [[ $1 ]]
   then
      echo -e "\n$1"
   fi

   for (( i=1 ; i <= SERVICES_COUNT ; i++))
   do
      echo "$i) ${ID_TO_SERVICE[$i]}"
   done

   read SERVICE_ID_SELECTED

   if [[ $SERVICE_ID_SELECTED =~ ^[1-$SERVICES_COUNT]$ ]]
   then
      SCHEDULE_APPOINTMENT "$SERVICE_ID_SELECTED"
   else
      MAIN_MENU "I could not find that service. What would you like today?"
   fi
}

SCHEDULE_APPOINTMENT()
{
   SERVICE="${ID_TO_SERVICE[$1]}"

   echo -e "\nWhat's your phone number?"
   read CUSTOMER_PHONE

   CUSTOMER_ID_AND_NAME="$($PSQL "SELECT customer_id, name FROM customers WHERE phone = '$CUSTOMER_PHONE'")"

   if [[ $CUSTOMER_ID_AND_NAME ]]
   then
      CUSTOMER_ID="$(echo "$CUSTOMER_ID_AND_NAME" | sed -r 's/([0-9]+).+/\1/')"
      CUSTOMER_NAME="$(echo "$CUSTOMER_ID_AND_NAME" | sed -r 's/ *[0-9]+ \| (.+)/\1/')"

      echo -e "\nWhat time would you like your $SERVICE, $CUSTOMER_NAME?"
      read SERVICE_TIME

      $PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES($CUSTOMER_ID, $1, '$SERVICE_TIME')" > /dev/null

      echo -e "\nI have put you down for a cut at $SERVICE_TIME, $CUSTOMER_NAME."
   else
      echo -e "\nI don't have a record for that phone number, what's your name?"
      read CUSTOMER_NAME

      $PSQL "INSERT INTO customers(phone, name) VALUES('$CUSTOMER_PHONE', '$CUSTOMER_NAME')" > /dev/null

      CUSTOMER_ID="$($PSQL "SELECT customer_id FROM customers WHERE name = '$CUSTOMER_NAME'")"

      echo -e "\nWhat time would you like your $SERVICE, $CUSTOMER_NAME?"
      read SERVICE_TIME

      $PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES($CUSTOMER_ID, $1, '$SERVICE_TIME')" > /dev/null

      echo -e "\nI have put you down for a $SERVICE at $SERVICE_TIME, $CUSTOMER_NAME."
   fi
}

MAIN_MENU "Welcome to My Salon, how can I help you?"
