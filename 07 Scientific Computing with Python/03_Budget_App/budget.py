class Category:
   def __init__(self, name=''):
      self.name = name
      self.ledger = []
      self.totals = {'balance': 0, 'spend': 0}

   def deposit(self, amount, description=''):
      self.ledger.append({'amount': amount, 'description': description})
      self.totals['balance'] += amount

   def withdraw(self, amount, description=''):
      if not self.check_funds(amount):
         return False

      self.ledger.append({'amount': float(f'-{amount}'),
                         'description': description})

      self.totals['balance'] -= amount
      self.totals['spend'] += amount

      return True

   def get_balance(self):
      return self.totals['balance']

   def transfer(self, amount, category):
      done = self.withdraw(amount, description=f'Transfer to {category.name}')
      category.deposit(amount, description=f'Transfer from {self.name}')
      return done

   def check_funds(self, amount):
      return amount <= self.totals['balance']

   def __str__(self):
      stars = 30 - len(self.name)
      side = stars // 2
      summary = f"{'*' * side}{self.name}{'*' * side}{'*' * (stars % 2)}\n"

      for entry in self.ledger:
         desc = entry['description'][:23]
         amount = format(entry['amount'], '.2f')
         spaces = 30 - len(desc) - len(str(amount))
         summary += f"{desc}{' ' * spaces}{amount}\n"

      summary += f"Total: {format(self.get_balance(), '.2f')}"
      return summary


def create_spend_chart(categories):
   print(type(categories), categories)
   spend_ledger = {}
   for category in categories:
      # ! For some reason Python won't throw an error if I replace (=) with (:) below:
      spend_ledger[f'{category.name}'] = category.totals['spend']

   total_spend = 0

   for category in spend_ledger:
      total_spend += spend_ledger[category]

   for category in spend_ledger:
      actual_percent = spend_ledger[category] / total_spend * 100
      spend_ledger[category] = actual_percent - actual_percent % 10

   chart = 'Percentage spent by category\n'

   for num in range(100, -10, - 10):
      left_padding = ' ' * (3 - len(str(num)))
      chart += f"{left_padding}{num}|"

      for category in spend_ledger:
         chart += f"{' o ' if num <= spend_ledger[category] else '   '}"
      chart += ' \n'

   chart += '    ' + ('---' * len(spend_ledger)) + '-\n'
   max_name_len = max([len(category) for category in spend_ledger])
   for i in range(max_name_len):
      chart += '    '
      not_last_line = i < max_name_len - 1

      for name in spend_ledger:
         chart += f" {name[i] if len(name) > i else ' '} "

      if not_last_line:
         chart += ' \n'
      else:
         chart += ' '

   return chart


food = Category('Food')
food.deposit(10, 'deposit')
food.withdraw(4, 'apples')

entertainment = Category('Entertainment')
food.transfer(2, entertainment, )
entertainment.withdraw(2, 'internet')

print(
   create_spend_chart([food, entertainment]),
   sep='\n'


)
