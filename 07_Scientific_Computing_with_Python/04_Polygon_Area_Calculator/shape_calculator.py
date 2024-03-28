class Rectangle:
   def __init__(self, width, height):
      self.width = width
      self.height = height

   def __str__(self):
      return f'{type(self).__name__}(width={self.width}, height={self.height})'

   def set_width(self, width):
      self.width = width

   def set_height(self, height):
      self.height = height

   def get_area(self):
      return self.width * self.height

   def get_perimeter(self):
      return 2 * self.width + 2 * self.height

   def get_diagonal(self):  # (width ** 2 + height ** 2) ** .5
      return (self.width ** 2 + self.height ** 2) ** 0.5

   def get_picture(self):
      if self.width > 50 or self.height > 50:
         return 'Too big for picture.'

      picture = ''

      for i in range(self.height):
         picture += '*' * self.width
         picture += '\n'

      return picture

   def get_amount_inside(self, shape):
      return self.get_area() // shape.get_area()


class Square(Rectangle):
   def __init__(self, side):
      self.side = side
      Rectangle.__init__(self, self.side, self.side)

   def __str__(self):
      return f'{type(self).__name__}(side={self.side})'

   def set_side(self, side):
      self.__init__(side)

   def set_width(self, width):
      self.__init__(width)

   def set_height(self, height):
      self.__init__(height)


rect = Rectangle(10, 5)
print(rect.get_area())
rect.set_height(3)
print(rect.get_perimeter())
print(rect)
print(rect.get_picture())
sq = Square(9)
print(sq.get_area())
sq.set_side(4)
print(sq.get_diagonal())
print(sq)
print(sq.get_picture())
rect.set_height(8)
rect.set_width(16)
print(rect.get_amount_inside(sq))
# Bug corrected: The print below printed Square(side=2)
# instead of the expected Square(side=4):
sq.set_side(4)
print(sq)

# * EXPECTED:

# 50
# 26
# Rectangle(width=10, height=3)
# **********
# **********
# **********
# 81
# 5.656854249492381
# Square(side=4)
# ****
# ****
# ****
# ****
# 8
# Square(side=4)
