import copy
import random


class Hat:
   def __init__(self, **kwargs):
      self.contents = []

      for key, val in kwargs.items():
         for num in range(val):
            self.contents.append(key)

   def draw(self, num):
      drawn_balls = []
      for n in range(num):
         if len(self.contents) > 0:
            rand_i = random.randint(0, len(self.contents) - 1)
            drawn_balls.append(self.contents.pop(rand_i))
      return drawn_balls


def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
   successes = 0

   for i in range(num_experiments):
      copy_hat = copy.deepcopy(hat)

      drawn_balls = copy_hat.draw(num_balls_drawn)
      expected_colors = [key for key in expected_balls]
      gotten_colors = 0

      for key in expected_colors:
         if drawn_balls.count(key) >= expected_balls[key]:
            gotten_colors += 1
         if gotten_colors == len(expected_colors):
            successes += 1
   print(successes)
   return successes / num_experiments


hat = Hat(red=1)

probability = experiment(hat=hat,
                         expected_balls={"red": 1},
                         num_balls_drawn=2,
                         num_experiments=100)

print(
   hat.contents,
   hat.draw(3),
   hat.draw(3),
   hat.draw(4),
   probability,
   sep='\n'
)
