""" def generatePwd(n):
  password = []

  # Combine the character sets into a single set of all possible characters
  all_chars = string.ascii_uppercase + string.ascii_lowercase + string.digits + string.punctuation

  # Generate a random password of length ln by choosing characters from the combined set
  for i in range (n):
    password.append( ''.join(random.choice(all_chars) for _ in range(random.randrange(8, 16))))
  return password

def generateEmail(n):
  pass

def generateName(n):
  pass

def generateUsername(n):
  pass """


import selenium 
