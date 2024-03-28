import re


def arithmetic_arranger(problems: list, show_solutions: bool = False) -> str:
   num_of_problems = len(problems)

   if num_of_problems > 5:
      return 'Error: Too many problems.'

   for problem in problems:
      if not ('+' in problem or '-' in problem):
         return "Error: Operator must be '+' or '-'."

      if re.search('[A-Za-z]', problem) is not None:
         return 'Error: Numbers must only contain digits.'

      if re.search('\d{5}', problem) is not None:
         return 'Error: Numbers cannot be more than four digits.'

   operands: list = []
   operators: list = []
   problem_lengths: list = []

   for problem in problems:
      current_operands = re.findall("\d+", problem)
      problem_lengths.append(max(len(current_operands[0]),
                             len(current_operands[1])) + 2)
      operands += current_operands
      operators += re.search("[+-]", problem)[0]

   upper_operands: list = [operands[i] for i in range(0, len(operands), 2)]
   lower_operands: list = [operands[i] for i in range(1, len(operands), 2)]
   arrangement: str = ''
   last_i = num_of_problems - 1

   for i in range(num_of_problems):
      arrangement += ' ' * \
         (problem_lengths[i] - len(upper_operands[i]))
      arrangement += upper_operands[i]

      if i == last_i:
         arrangement += '\n'
         break

      arrangement += ' ' * 4

   for i in range(num_of_problems):
      arrangement += operators[i]
      arrangement += ' ' * \
          (problem_lengths[i] - len(lower_operands[i]) - 1)
      arrangement += lower_operands[i]

      if i == last_i:
         arrangement += '\n'
         break

      arrangement += ' ' * 4

   for i in range(num_of_problems):
      arrangement += '-' * problem_lengths[i]

      if i == last_i:
         break

      arrangement += ' ' * 4

   if show_solutions == True:
      arrangement += '\n'
      solutions = [str(eval(problem)) for problem in problems]
      solution_lengths = [len(solution) for solution in solutions]

      for i in range(num_of_problems):
         arrangement += ' ' * (problem_lengths[i] - solution_lengths[i])
         arrangement += solutions[i]

         if i == last_i:
            break

         arrangement += ' ' * 4

   return arrangement


print(arithmetic_arranger(
   ['3 + 855', '3801 - 2', '45 + 43', '123 + 49'], True))
