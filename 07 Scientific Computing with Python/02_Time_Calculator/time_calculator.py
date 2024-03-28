def add_time(start, duration, day=None):
   starting_hour = int(start[:-6])
   starting_min = int(start[-5:-3])

   added_hours = int(duration[:-3])
   added_mins = int(duration[-2:])

   am_pm = start[-2:]

   final_mins = (starting_min + added_mins) % 60

   if final_mins < 10:
      final_mins = f'0{final_mins}'
   elif final_mins == 60:
      final_mins = '00'

   extra_hours = (starting_min + added_mins) // 60
   total_hours = starting_hour + added_hours + extra_hours
   final_hours = (total_hours) % 12

   if final_hours == 0:
      final_hours = 12

   n_am_pm_changes = total_hours // 12
   am_pm_has_changed = False if n_am_pm_changes % 2 == 0 else True

   starting_hour_24 = starting_hour if am_pm == 'AM' else 12 + starting_hour
   days_passed = (starting_hour_24 + added_hours + extra_hours) // 24

   if am_pm_has_changed:
      change = {'AM': 'PM', 'PM': 'AM'}
      am_pm = change[am_pm]

   day_info = ''

   if day is not None:
      day = day.capitalize()

      if days_passed == 0:
         day_info = f', {day}'
      else:
         days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
                 'Thursday', 'Friday', 'Saturday']

         day_info = (days.index(day) + days_passed) % 7
         day_info = f', {days[day_info]}'

   if days_passed == 1:
      day_info += ' (next day)'
   elif days_passed > 1:
      day_info += f' ({days_passed} days later)'

   return f'{final_hours}:{final_mins} {am_pm}{day_info}'


# Originally produced an error:
add_time("8:16 PM", "466:02", "tuesday")

# 2:59 AM
print(add_time("2:59 AM", "24:00"))
# 12:04 AM, Friday (2 days later)
print(add_time("11:59 PM", "24:05", "Wednesday"))

print(add_time("3:00 PM", "3:10"))  # 6:10 PM
print(add_time("11:30 AM", "2:32", "Monday"))  # 2:02 PM, Monday
print(add_time("11:43 AM", "00:20"))  # 12:03 PM
print(add_time("10:10 PM", "3:30"))  # 1:40 AM (next day)
# 12:03 AM, Thursday (2 days later)
print(add_time("11:43 PM", "24:20", "tueSday"))
print(add_time("6:30 PM", "205:12"))  # 7:42 AM (9 days later)
